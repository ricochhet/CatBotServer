class ClientManager {
  setup(mapUtils, routeUtils, config) {
    this.mapUtils = mapUtils;
    this.routeUtils = routeUtils;
    this.config = config;
  }

  init_mhw(route) {
    const mhw_armors = require('../routes/mhw/armors');
    const mhw_decorations = require('../routes/mhw/decorations');
    const mhw_items = require('../routes/mhw/items');
    const mhw_monsters = require('../routes/mhw/monsters');
    const mhw_skills = require('../routes/mhw/skills');
    const mhw_weapons = require('../routes/mhw/weapons');

    this.routeUtils.get('/', 'main.ejs', function (render, req, res) {
      res.render(render, {
        MHW_OBJECTS: route.objects,
        MHW_DECO_ARRAY: route.decoration_names,
        MHW_MONSTER_ARRAY: route.monster_names,
        MHW_WEAPON_ARRAY: route.weapon_names,
        MHW_ARMOR_ARRAY: route.armor_names,
        MHW_SKILL_ARRAY: route.skill_names,
        MHW_ITEM_ARRAY: route.item_names
      });
    });

    mhw_armors.route(
      'http://localhost:8080/api/mhw/armors',
      route.data,
      this.config['api']['token']
    );

    mhw_decorations.route(
      'http://localhost:8080/api/mhw/decorations',
      route.data,
      this.config['api']['token']
    );

    mhw_items.route(
      'http://localhost:8080/api/mhw/items',
      route.data,
      this.config['api']['token']
    );

    mhw_monsters.route(
      'http://localhost:8080/api/mhw/monsters',
      route.data,
      this.config['api']['token']
    );

    mhw_skills.route(
      'http://localhost:8080/api/mhw/skills',
      route.data,
      this.config['api']['token']
    );

    mhw_weapons.route(
      'http://localhost:8080/api/mhw/weapons',
      route.data,
      this.config['api']['token']
    );
  }
}

module.exports = new ClientManager();
