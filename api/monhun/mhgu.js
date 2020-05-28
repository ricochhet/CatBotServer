const dataUtils = require('../../tools/utils/dataUtils');
const routeUtils = require('../../tools/utils/routeUtils');
const config = require('../../config.json');

class MHGURouter {
  constructor() {
    this.monster_map = dataUtils.buildMap(
      './databases/mh_data/mhgu/monster_info.json'
    );
    this.weapon_map = dataUtils.buildMap(
      './databases/mh_data/mhgu/weapon_info.json'
    );
  }

  init() {
    const self = this;

    let routes = {
      monsters: function () {
        routeUtils.get('/api/mhgu/monsters', '', function (render, req, res) {
          if (req.query.key == config['api']['token']) {
            res.json(self.monster_map.raw);
          } else {
            res.json({ error: routeUtils.statusCode('403') });
          }
        });
      },
      weapons: function () {
        routeUtils.get('/api/mhgu/weapons', '', function (render, req, res) {
          if (req.query.key == config['api']['token']) {
            res.json(self.weapon_map.raw);
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

module.exports = new MHGURouter();
