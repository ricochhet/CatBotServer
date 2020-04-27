class ClientManager {
  setup(routeUtils) {
    this.routeUtils = routeUtils;
  }

  render(path = '/', render = 'index.ejs', data = {}) {
    this.routeUtils.get(path, render, function (render, req, res) {
      res.render(render, data);
    });
  }
}

module.exports = new ClientManager();
