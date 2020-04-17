const fs = require('fs');

class API {
  constructor(routeUtils, config) {
    this.routeUtils = routeUtils;
    this.config = config;
  }

  post_db(url, functionObject) {
    const self = this;
    const queries = [];

    this.routeUtils.addPost(url, function (req, res) {
      if (req.query.key == self.config['api']['token']) {
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

  delete_db(url, functionObject) {
    const self = this;
    const queries = [];

    this.routeUtils.addDelete(url, function (req, res) {
      if (req.query.key == self.config['api']['token']) {
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

  get_db(url, database_file) {
    const self = this;

    this.routeUtils.addRoute(url, '', function (render, req, res) {
      if (req.query.key == self.config['api']['token']) {
        const json = JSON.parse(fs.readFileSync(database_file, 'utf8'));
        res.json(json);
      } else {
        res.json({ error: '403 Unauthorized' });
      }
    });
  }
}

module.exports = new API();
