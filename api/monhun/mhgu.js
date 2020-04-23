class Router {
  constructor(routeUtils, config) {
    this.routeUtils = routeUtils;
    this.config = config;
  }

  setup(mapUtils) {
    this.mapUtils = mapUtils;
    this.monster_map = mapUtils.buildMap(
      './databases/mh_data/mhgu/monster_info.json'
    );
    this.weapon_map = mapUtils.buildMap(
      './databases/mh_data/mhgu/weapon_info.json'
    );
  }

  monsters() {
    const self = this;
    this.routeUtils.addRoute('/api/mhgu/monsters', '', function (
      render,
      req,
      res
    ) {
      if (req.query.key == self.config['api']['token']) {
        res.json(self.monster_map.raw);
      } else {
        res.json({ error: self.routeUtils.statusCode('403') });
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
        res.json(self.weapon_map.raw);
      } else {
        res.json({ error: self.routeUtils.statusCode('403') });
      }
    });
  }
}

module.exports = new Router();
