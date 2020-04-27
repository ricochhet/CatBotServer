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

const mhwRouter = require('./api/monhun/mhw');
const mhguRouter = require('./api/monhun/mhgu');
const catfactRouter = require('./api/catfacts/catfact');

const cli = require('./client/managers/clientManager');
cli.setup(routeUtils);

logger.config({
  autoNewLine: true,
  systemIdentifier: pjson.name
});

logger.log(`Running on v${pjson.version}`);

mhwRouter.setup(mapUtils, routeUtils, config);
mhguRouter.setup(mapUtils, routeUtils, config);
catfactRouter.setup(mapUtils, routeUtils, config);

routeUtils.start(
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

if (config['api']['client']) {
  logger.log('Running in client mode.');
  cli.render('/', 'index.ejs', {});

  routeUtils.errors({
    type: 'html'
  });
} else {
  logger.log('Running in clientless mode.');
  routeUtils.get('/', '');

  routeUtils.errors({
    type: 'json'
  });
}

if (config['api']['api_database']) {
  logger.log('Running database queries.');
  queries.initialize();
}

mhwRouter.armors();
mhwRouter.decorations();
mhwRouter.items();
mhwRouter.monsters();
mhwRouter.skills();
mhwRouter.weapons();

mhguRouter.monsters();
mhguRouter.weapons();

catfactRouter.catfacts();
