const dataUtils = require('../../tools/utils/dataUtils');
const routeUtils = require('../../tools/utils/routeUtils');
const config = require('../../config.json');

class CatFactRouter {
  constructor() {
    this.catfact = dataUtils.buildMap('./databases/catfact_data/catfacts.json');
  }

  init() {
    const self = this;

    let routes = {
      catfacts: function () {
        routeUtils.get('/api/catfacts', '', function (render, req, res) {
          if (req.query.key == config['api']['token']) {
            res.json(self.catfact.raw);
          } else {
            res.json({ error: routeUtils.statusCode('403') });
          }
        });
      }
    };

    for (const i in routes) {
      routes[i]();
    }
  }
}

module.exports = new CatFactRouter();
