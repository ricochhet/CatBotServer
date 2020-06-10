const commandUtils = require('./tools/utils/commandUtils');
const stringUtils = require('./tools/utils/stringUtils');
const routeUtils = require('./tools/utils/routeUtils');
const logger = require('./tools/utils/loggingUtils');

const dataUtils = require('./tools/utils/dataUtils');
const config = require('./config.json');
const pjson = require('./package.json');

const mhwRouter = require('./api/monhun/mhw');
const mhguRouter = require('./api/monhun/mhgu');
const queries = require('./tools/database/queries');
const catfactRouter = require('./api/catfacts/catfact');

logger.config({
  autoNewLine: true,
  systemIdentifier: pjson.name
});

logger.log(`Running on v${pjson.version}`);

routeUtils.start(
  config['server']['port'],
  config['server']['public'],
  config['server']['views']
);

commandUtils.cmd('--db', function () {
  config['api']['api_database'] = true;
});

commandUtils.cmd('--config', function () {
  logger.log(stringUtils.jsonStringify(config));
});

routeUtils.get('/', '');

if (config['api']['api_database']) {
  logger.log('Running database queries.');
  queries.init();
}

mhwRouter.init();
mhguRouter.init();
catfactRouter.init();

routeUtils.errors({
  type: 'json'
});
