const manager = require('../util/routeUtils');
const api = require('./api/mhw/router');
const config = require('./config.json');

const mhw_struct = require('./api/mhw/data');
mhw_struct.setup(require('../util/mapUtils'));

const routeDecorations = require('./web/mhw/decorations');
const routeMonsters = require('./web/mhw/monsters');
const routeWeapons = require('./web/mhw/weapons');
const routeSkills = require('./web/mhw/skills');
const routeArmors = require('./web/mhw/armors');
const routeItems = require('./web/mhw/items');

class Webserver {
  run(port, opts = { handleErrors: true }) {
    manager.makeRouter(port, 'public');

    manager.addRoute('/', 'main.ejs', function (render, req, res) {
      res.render(render, {
        MHW_OBJECTS: mhw_struct.objects,
        MHW_DECO_ARRAY: mhw_struct.decoration_names,
        MHW_MONSTER_ARRAY: mhw_struct.monster_names,
        MHW_WEAPON_ARRAY: mhw_struct.weapon_names,
        MHW_ARMOR_ARRAY: mhw_struct.armor_names,
        MHW_SKILL_ARRAY: mhw_struct.skill_names,
        MHW_ITEM_ARRAY: mhw_struct.item_names
      });
    });

    api.manager = manager;
    api.config = config;

    api.route_armors();
    api.route_decorations();
    api.route_items();
    api.route_monsters();
    api.route_skills();
    api.route_weapons();

    routeArmors.route(mhw_struct.data, config.api_key);
    routeDecorations.route(mhw_struct.data, config.api_key);
    routeItems.route(mhw_struct.data, config.api_key);
    routeMonsters.route(mhw_struct.data, config.api_key);
    routeSkills.route(mhw_struct.data, config.api_key);
    routeWeapons.route(mhw_struct.data, config.api_key);

    if (opts.handleErrors) {
      manager.handleErrors();
    }
  }
}

module.exports = Webserver;
