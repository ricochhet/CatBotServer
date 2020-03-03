const App = require('./app');
const dbUtils = require('./database/dbUtils');
const commandUtils = require('./database/libraries/commandUtils');

commandUtils.command(['--build', '--a'], function() {
  return dbUtils.build(true, true);
});

commandUtils.command(['--build', '--b'], function() {
  return dbUtils.build(true, false);
});

commandUtils.command(['start'], function() {
  App.deploy();
});
