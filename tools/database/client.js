const fs = require('fs');
const routeUtils = require('../utils/routeUtils');
const config = require('../../config.json');

class DatabaseClient {
  post(url, functionObject) {
    const queries = [];

    routeUtils.post(url, function (req, res) {
      const data = req.body;
      queries.push(data);

      functionObject(queries);
      res.send(`Added data to queries successfully`);
    });
  }

  delete(url, functionObject) {
    const queries = [];

    routeUtils.delete(url, function (req, res) {
      const data = req.body;
      queries.push(data);

      functionObject(queries);
      res.send(`Removed data from queries successfully`);
    });
  }

  all(url, database_file) {
    routeUtils.all(url, '', function (render, req, res) {
      const json = JSON.parse(fs.readFileSync(database_file, 'utf8'));
      res.json(json);
    });
  }

  get(url, database_file) {
    routeUtils.get(url, '', function (render, req, res) {
      const json = JSON.parse(fs.readFileSync(database_file, 'utf8'));
      res.json(json);
    });
  }
}

module.exports = new DatabaseClient();
