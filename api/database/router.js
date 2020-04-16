const fs = require('fs');

class API {
  constructor(routeUtils, config) {
    this.routeUtils = routeUtils;
    this.config = config;
  }

  post_database(url, functionObject) {
    const self = this;
    const queries = [];

    this.routeUtils.addPost(url, function (req, res) {
      if (req.query.key == self.config['api']['token']) {
        const data = req.body;
        queries.push(data);
        console.log(data);
        functionObject(queries);
        res.send('Successfully added data to queries');
      } else {
        res.json({ error: '403 Unauthorized' });
      }
    });
  }

  get_database(url, database_file) {
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

  write_to(file, object) {

  }
}

module.exports = new API();
