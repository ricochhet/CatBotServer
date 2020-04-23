class Router {
  setup(mapUtils, routeUtils, config) {
    this.mapUtils = mapUtils;
    this.routeUtils = routeUtils;
    this.config = config;

    this.catfact = mapUtils.buildMap('./databases/catfact_data/catfacts.json');
  }

  catfacts() {
    const self = this;
    this.routeUtils.addRoute('/api/catfacts', '', function (render, req, res) {
      if (req.query.key == self.config['api']['token']) {
        res.json(self.catfact.raw);
      } else {
        res.json({ error: self.routeUtils.statusCode('403') });
      }
    });
  }
}

module.exports = new Router();
