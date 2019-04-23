import loadScript from '../utils/script';
import Database from './firebase/Database';
import config from '@@/env/cert/firebase.settings.json';

const serviceUrlPattern = 'https://www.gstatic.com/firebasejs/5.8.6/firebase-${service}.js';
const services = new Map();
const databases = new Map();
let authorization = null;

// TODO: Check authorize flow. eventually we will get a race condition or the null return will make problems
export function authorize (token) {
  if (token) {
    authorization = getFirebaseService('auth').then((auth) => {
      return auth().signInWithCustomToken(token)
        .catch((error) => {
          console.log('ERROR', error);
        });
    });
  }
  return authorization;
}

export function getDatabase (name) {
  if (!databases.has(name)) {
    databases.set(name, new Database(authorize()
      .then((auth) => {
        return getFirebaseService('database')
          .then((database) => {
            return [database().ref(name), auth];
          });
      })));
  }
  return databases.get(name);
}

export function getFirebaseService (service) {
  return getService('app').then(() => {
    return getService(service);
  });
}

function getService (service) {
  if (!services.has(service)) {
    services.set(service, loadService(service).then(() => {
      if (!global.firebase.apps.length) {
        global.firebase.initializeApp(config);
      }
      return global.firebase[service];
    }));
  }
  return services.get(service);
}

function loadService (service) {
  return loadScript(new Function('service', 'return `' + serviceUrlPattern + '`;')(service));
}
