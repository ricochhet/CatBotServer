const routeUtils = require('./util/routeUtils');
const mapUtils = require('./util/mapUtils');
const config = require('./config.json');

const mhw_data = require('./api/mhw/data');
const mhw_router = require('./api/mhw/router');

const mhgu_data = require('./api/mhgu/data');
const mhgu_router = require('./api/mhgu/router');

mhw_data.setup(mapUtils);
mhgu_data.setup(mapUtils);

routeUtils.makeRouter(8080, 'client/public', 'client/views');

if (config['api']['client']) {
  const mhw_datafile = require('./api/mhw/data');
  const mhw_armors = require('./client/server/mhw/armors');
  const mhw_decorations = require('./client/server/mhw/decorations');
  const mhw_items = require('./client/server/mhw/items');
  const mhw_monsters = require('./client/server/mhw/monsters');
  const mhw_skills = require('./client/server/mhw/skills');
  const mhw_weapons = require('./client/server/mhw/weapons');

  routeUtils.addRoute('/', 'main.ejs', function (render, req, res) {
    res.render(render, {
      MHW_OBJECTS: mhw_datafile.objects,
      MHW_DECO_ARRAY: mhw_datafile.decoration_names,
      MHW_MONSTER_ARRAY: mhw_datafile.monster_names,
      MHW_WEAPON_ARRAY: mhw_datafile.weapon_names,
      MHW_ARMOR_ARRAY: mhw_datafile.armor_names,
      MHW_SKILL_ARRAY: mhw_datafile.skill_names,
      MHW_ITEM_ARRAY: mhw_datafile.item_names
    });
  });

  mhw_armors.route(
    'http://localhost:8080/api/mhw/armors',
    mhw_datafile.data,
    config['api']['token']
  );

  mhw_decorations.route(
    'http://localhost:8080/api/mhw/decorations',
    mhw_datafile.data,
    config['api']['token']
  );

  mhw_items.route(
    'http://localhost:8080/api/mhw/items',
    mhw_datafile.data,
    config['api']['token']
  );

  mhw_monsters.route(
    'http://localhost:8080/api/mhw/monsters',
    mhw_datafile.data,
    config['api']['token']
  );

  mhw_skills.route(
    'http://localhost:8080/api/mhw/skills',
    mhw_datafile.data,
    config['api']['token']
  );

  mhw_weapons.route(
    'http://localhost:8080/api/mhw/weapons',
    mhw_datafile.data,
    config['api']['token']
  );

  routeUtils.handleErrors();
} else {
  routeUtils.addRoute('/', '');
}

mhw_router.manager = routeUtils;
mhgu_router.manager = routeUtils;

mhw_router.config = config;
mhgu_router.config = config;

mhw_router.armors();
mhw_router.decorations();
mhw_router.items();
mhw_router.monsters();
mhw_router.skills();
mhw_router.weapons();

mhgu_router.monsters();
mhgu_router.weapons();
