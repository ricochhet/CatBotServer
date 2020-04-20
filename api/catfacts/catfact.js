class Router {
  constructor(routeUtils, config) {
    this.routeUtils = routeUtils;
    this.config = config;
  }

  setup(mapUtils) {
    this.mapUtils = mapUtils;
    this.catfact = mapUtils.buildMap('./databases/catfact_data/catfacts.json');
  }

  catfacts() {
    const self = this;
    this.routeUtils.addRoute('/api/catfacts', '', function (render, req, res) {
      if (req.query.key == self.config['api']['token']) {
        res.json(self.catfact.raw);
      } else {
        res.json({ error: '403 Unauthorized' });
      }
    });
  }
}

module.exports = new Router();
