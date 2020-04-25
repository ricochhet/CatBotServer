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

  get(path, render, functionObject) {
    router.get(path, (req, res, next) => {
      const thisRender = render;
      functionObject(thisRender, req, res);
    });
  }

  addAuthGet(path, render, functionObject, authObject) {
    router.get(path, authObject, function (req, res) {
      const thisRender = render;
      functionObject(thisRender, req, res, authObject);
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
      functionObject(req, res);
    });
  }

  delete(path, functionObject) {
    app.delete(path, (req, res) => {
      functionObject(req, res);
    });
  }

  errors() {
    const self = this;

    app.use(function (req, res, next) {
      res.status(404).render(self.statusCodeRenders.get(404));
    });
  }
}

module.exports = new RouteUtils();
