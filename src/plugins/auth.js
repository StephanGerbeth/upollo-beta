import FacebookUser from '@/classes/user/Facebook';
import GoogleUser from '@/classes/user/Google';
import { authorize } from '@/service/firebase';

let admin;
const servicMap = {
  facebook: FacebookUser,
  google: GoogleUser
};

if (process.server) {
  admin = require('firebase-admin');
  const key = require('../../env/cert/upollo-f0bf6-firebase-adminsdk-bg1ve-af4ecbe2ef.json');

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(key),
      databaseURL: `https://${key.project_id}.firebaseio.com`
    });
  }
}

export default function ({ app }) {
  if (!app.$auth.loggedIn) {
    return;
  }
  if (admin) {
    const user = getUserObject(app.$auth.$state);
    const additionalClaims = {
      premiumAccount: true
    };

    admin.auth().createCustomToken(user.getId(), additionalClaims)
      .catch(function (error) {
        console.error('Error creating custom token:', error);
      })
      .then(function (customToken) {
        app.$auth.$storage.setState('token', customToken);
        app.$auth.$storage.setState('user', user.toJSON());
      });
  } else {
    authorize(app.$auth.$state.token);
  }
}

function getUserObject (data) {
  return new (servicMap[data.strategy])(data);
}
