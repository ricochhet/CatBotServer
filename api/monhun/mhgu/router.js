const data = require('./data');

class API {
  constructor(routeUtils, config) {
    this.routeUtils = routeUtils;
    this.config = config;
  }

  monsters() {
    const self = this;
    this.routeUtils.addRoute('/api/mhgu/monsters', '', function (render, req, res) {
      if (req.query.key == self.config['api']['token']) {
        res.json(data.monster_map.raw);
      } else {
        res.json({ error: '403 Unauthorized' });
      }
    });
  }

  weapons() {
    const self = this;
    this.routeUtils.addRoute('/api/mhgu/weapons', '', function (
      render,
      req,
      res
    ) {
      if (req.query.key == self.config['api']['token']) {
        res.json(data.weapon_map.raw);
      } else {
        res.json({ error: '403 Unauthorized' });
      }
    });
  }
}

module.exports = new API();
