const fs = require('fs');
const routeUtils = require('../utils/routeUtils');
const config = require('../../config.json');

class DatabaseClient {
  post(url, functionObject) {
    const queries = [];

    routeUtils.post(url, function (req, res) {
      if (req.query.key == config['api']['token']) {
        const data = req.body;
        queries.push(data);

        functionObject(queries);
        res.send(`Added data to queries successfully`);
      } else {
        res.send(
          `An incorrect API key was provided: ${req.query.key} (403 Unauthorized)`
        );
      }
    });
  }

  delete(url, functionObject) {
    const queries = [];

    routeUtils.delete(url, function (req, res) {
      if (req.query.key == config['api']['token']) {
        const data = req.body;
        queries.push(data);

        functionObject(queries);
        res.send(`Removed data from queries successfully`);
      } else {
        res.send(
          `An incorrect API key was provided: ${req.query.key} (403 Unauthorized)`
        );
      }
    });
  }

  all(url, database_file) {
    routeUtils.all(url, '', function (render, req, res) {
      if (req.query.key == config['api']['token']) {
        const json = JSON.parse(fs.readFileSync(database_file, 'utf8'));
        res.json(json);
      } else {
        res.json({ error: routeUtils.statusCode('403') });
      }
    });
  }

  get(url, database_file) {
    routeUtils.get(url, '', function (render, req, res) {
      if (req.query.key == config['api']['token']) {
        const json = JSON.parse(fs.readFileSync(database_file, 'utf8'));
        res.json(json);
      } else {
        res.json({ error: routeUtils.statusCode('403') });
      }
    });
  }
}

module.exports = new DatabaseClient();
