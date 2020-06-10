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
          res.json(self.monster_map.raw);
        });
      },
      weapons: function () {
        routeUtils.get('/api/mhgu/weapons', '', function (render, req, res) {
          res.json(self.weapon_map.raw);
        });
      }
    };

    for (const i in routes) {
      routes[i]();
    }
  }
}

module.exports = new MHGURouter();
