const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const router = express.Router();
const session = require('express-session');
const cors = require('cors');
const statusCodes = require('./managers/statusCodes');

class RouteUtils {
  constructor() {
    this.statusCodeRenders = new Map([
      [404, 'errors/404.ejs'],
      [403, 'errors/403.ejs']
    ]);
  }

  fetch(url) {
    return new Promise(function (resolve, reject) {
      http
        .get(url, function (res) {
          let body = '';
          res.on('data', chunk => {
            body += chunk;
          });

          res.on('end', () => {
            try {
              resolve(body);
            } catch (error) {
              resolve(error);
            }
          });
        })
        .on('error', error => {
          console.error(error.message);
        });
    });
  }

  statusCode(str = '') {
    const code = str.toString();
    return statusCodes.get_code(code);
  }

  start(port, assets, views) {
    http.Server(app).listen(`${port}`, function () {
      console.log('Listening on *:' + port);
      console.log('Type CTRL + C to kill the app');
    });

    app.use('/', router);
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(express.static(assets));
    app.use(cors());
    app.set('views', views);

    router.use(
      session({
        secret:
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15),
        saveUninitialized: true,
        resave: false
      })
    );
  }

  get(path, render = '', functionObject) {
    router.get(path, (req, res, next) => {
      if (typeof functionObject == 'function') {
        functionObject(render, req, res);
      } else {
        res.send('Server');
      }
    });
  }

  addAuthGet(path, render, functionObject, authObject) {
    router.get(path, authObject, function (req, res) {
      if (typeof functionObject == 'function') {
        functionObject(render, req, res, authObject);
      } else {
        res.send('Server');
      }
    });
  }

  next(req, res, next) {
    if (!req.session.user_id) {
      res.render(this.statusCodeRenders.get(403));
    } else {
      next();
    }
  }

  post(path, functionObject) {
    app.post(path, (req, res) => {
      if (typeof functionObject == 'function') {
        functionObject(req, res);
      } else {
        res.send('Server');
      }
    });
  }

  delete(path, functionObject) {
    app.delete(path, (req, res) => {
      if (typeof functionObject == 'function') {
        functionObject(req, res);
      } else {
        res.send('Server');
      }
    });
  }

  errors(options = { type: 'html' }) {
    const self = this;

    if (options.type == 'html') {
      app.use(function (req, res, next) {
        res.status(404).render(self.statusCodeRenders.get(404));
      });

      app.use(function (req, res, next) {
        res.status(403).render(self.statusCodeRenders.get(403));
      });
    } else if (options.type == 'json') {
      app.use(function (req, res, next) {
        res.status(404).send('404');
      });

      app.use(function (req, res, next) {
        res.status(403).send('403');
      });
    }
  }
}

module.exports = new RouteUtils();
