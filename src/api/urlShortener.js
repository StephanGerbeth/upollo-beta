import tinyUrl from 'tinyurl';
import qr from 'qr-image';

export default function (req, res) {
  return new Promise((resolve, reject) => {
    if (req.query.url) {
      tinyUrl.shorten(req.query.url, function (url) {
        /*eslint-disable no-extra-boolean-cast*/
        if (!!url) {
          resolve(url);
        } else {
          reject('url can\'t be shorten');
        }
        /* eslint-enable no-extra-boolean-cast */
      });
    } else {
      reject('no url');
    }
  })
    .then((shortUrl) => {
      res.status(200).send({
        data: {
          url: req.query.url,
          shortUrl: shortUrl,
          svg: qr.svgObject(shortUrl, {
            ec_level: 'L'
          })
        }
      });
    })
    .catch((e) => res.status(500).send({ error: { msg: e } }));
}
