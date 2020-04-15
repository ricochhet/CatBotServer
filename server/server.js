const manager = require('../util/routeUtils');
const mhw_api = require('./api/mhw/router');
const mhgu_api = require('./api/mhgu/router');
const config = require('../config.json');

const mhw_struct = require('./api/mhw/data');
mhw_struct.setup(require('../util/mapUtils'));

const mhgu_struct = require('./api/mhgu/data');
mhgu_struct.setup(require('../util/mapUtils'));

const routeDecorations = require('./web/mhw/decorations');
const routeMonsters = require('./web/mhw/monsters');
const routeWeapons = require('./web/mhw/weapons');
const routeSkills = require('./web/mhw/skills');
const routeArmors = require('./web/mhw/armors');
const routeItems = require('./web/mhw/items');

class Server {
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

    mhw_api.manager = manager;
    mhw_api.config = config;

    mhgu_api.manager = manager;
    mhgu_api.config = config;

    mhw_api.armors();
    mhw_api.decorations();
    mhw_api.items();
    mhw_api.monsters();
    mhw_api.skills();
    mhw_api.weapons();

    mhgu_api.monsters();
    mhgu_api.weapons();

    routeArmors.route(mhw_struct.data, config['api']['token']);
    routeDecorations.route(mhw_struct.data, config['api']['token']);
    routeItems.route(mhw_struct.data, config['api']['token']);
    routeMonsters.route(mhw_struct.data, config['api']['token']);
    routeSkills.route(mhw_struct.data, config['api']['token']);
    routeWeapons.route(mhw_struct.data, config['api']['token']);

    if (opts.handleErrors) {
      manager.handleErrors();
    }
  }
}

const server = new Server();
server.run(config['server']['port'], {
  handleErrors: config['server']['handle_errors']
});
