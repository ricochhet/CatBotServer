const commandUtils = require('./util/commandUtils');
const stringUtils = require('./util/stringUtils');
const routeUtils = require('./util/routeUtils');
const logger = require('./util/loggingUtils');

const mapUtils = require('./util/mapUtils');
const config = require('./config.json');
const pjson = require('./package.json');

const database = require('./api/database/router');
database.setup(routeUtils, config);

const queries = require('./queries');

const mhwRoute = require('./api/monhun/mhw');
const mhguRoute = require('./api/monhun/mhgu');
const catfactRoute = require('./api/catfacts/catfact');

logger.config({
  autoNewLine: true,
  systemIdentifier: pjson.name
});

logger.log(`Running on v${pjson.version}`);

mhwRoute.setup(mapUtils, routeUtils, config);
mhguRoute.setup(mapUtils, routeUtils, config);
catfactRoute.setup(mapUtils, routeUtils, config);

routeUtils.makeRouter(
  config['server']['port'],
  config['server']['public'],
  config['server']['views']
);

commandUtils.cmd('--nocli', function () {
  config['api']['client'] = false;
});

commandUtils.cmd('--db', function () {
  config['api']['api_database'] = true;
});

commandUtils.cmd('--config', function () {
  logger.log(stringUtils.jsonStringify(config));
});

commandUtils.cmd('--newtoken', function () {
  const key = stringUtils.generateUUID();
  let json = config;
  json.api.token = key;

  mapUtils.writeFile('./config.json', json);
  logger.log(`Token generated: ${key}`);
});

if (config['api']['api_database']) {
  logger.log('Running database queries.');
  queries.initialize();
}

if (config['api']['client']) {
  const mhw_armors = require('./client/routes/mhw/armors');
  const mhw_decorations = require('./client/routes/mhw/decorations');
  const mhw_items = require('./client/routes/mhw/items');
  const mhw_monsters = require('./client/routes/mhw/monsters');
  const mhw_skills = require('./client/routes/mhw/skills');
  const mhw_weapons = require('./client/routes/mhw/weapons');

  routeUtils.addRoute('/', 'main.ejs', function (render, req, res) {
    res.render(render, {
      MHW_OBJECTS: mhwRoute.objects,
      MHW_DECO_ARRAY: mhwRoute.decoration_names,
      MHW_MONSTER_ARRAY: mhwRoute.monster_names,
      MHW_WEAPON_ARRAY: mhwRoute.weapon_names,
      MHW_ARMOR_ARRAY: mhwRoute.armor_names,
      MHW_SKILL_ARRAY: mhwRoute.skill_names,
      MHW_ITEM_ARRAY: mhwRoute.item_names
    });
  });

  mhw_armors.route(
    'http://localhost:8080/api/mhw/armors',
    mhwRoute.data,
    config['api']['token']
  );

  mhw_decorations.route(
    'http://localhost:8080/api/mhw/decorations',
    mhwRoute.data,
    config['api']['token']
  );

  mhw_items.route(
    'http://localhost:8080/api/mhw/items',
    mhwRoute.data,
    config['api']['token']
  );

  mhw_monsters.route(
    'http://localhost:8080/api/mhw/monsters',
    mhwRoute.data,
    config['api']['token']
  );

  mhw_skills.route(
    'http://localhost:8080/api/mhw/skills',
    mhwRoute.data,
    config['api']['token']
  );

  mhw_weapons.route(
    'http://localhost:8080/api/mhw/weapons',
    mhwRoute.data,
    config['api']['token']
  );

  routeUtils.handleErrors();
} else {
  logger.log('Running in clientless mode.');
  routeUtils.addRoute('/', '');
}

mhwRoute.armors();
mhwRoute.decorations();
mhwRoute.items();
mhwRoute.monsters();
mhwRoute.skills();
mhwRoute.weapons();

mhguRoute.monsters();
mhguRoute.weapons();

catfactRoute.catfacts();
