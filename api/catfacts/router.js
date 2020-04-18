const data = require('./data');

class API {
  constructor(routeUtils, config) {
    this.routeUtils = routeUtils;
    this.config = config;
  }

  catfacts() {
    const self = this;
    this.routeUtils.addRoute('/api/catfacts', '', function (render, req, res) {
      if (req.query.key == self.config['api']['token']) {
        res.json(data.catfacts.raw);
      } else {
        res.json({ error: '403 Unauthorized' });
      }
    });
  }
}

module.exports = new API();
