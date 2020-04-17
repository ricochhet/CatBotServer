const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const router = express.Router();
const session = require('express-session');
const cors = require('cors');

class RouteManager {
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

  makeRouter(port, assets, views) {
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

  addRoute(path, render, functionObject) {
    router.get(path, (req, res, next) => {
      const thisRender = render;
      functionObject(thisRender, req, res);
    });
  }

  addExtendedRoute(path, render, functionObject, authObject) {
    router.get(path, authObject, function (req, res) {
      const thisRender = render;
      functionObject(thisRender, req, res, authObject);
    });
  }

  addAuthUtil(req, res, next) {
    if (!req.session.user_id) {
      res.render('errors/403.ejs');
    } else {
      next();
    }
  }

  addPost(path, functionObject) {
    app.post(path, (req, res) => {
      functionObject(req, res);
    });
  }

  addDelete(path, functionObject) {
    app.delete(path, (req, res) => {
      functionObject(req, res);
    });
  }

  handleErrors() {
    app.use(function (req, res, next) {
      res.status(404).render('errors/404.ejs');
    });
  }
}

module.exports = new RouteManager();
