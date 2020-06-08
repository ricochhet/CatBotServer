const databaseClient = require('../database/client');
const dataUtils = require('../utils/dataUtils');
const config = require('../../config.json');

class DatabaseQueries {
  init() {
    const self = this;

    let routes = {
      lfg_subscribe: function () {
        const pathname = `/api/database/${config['api']['client_id']}/lfg/subscribe`;
        const filename = `./databases/api_data/${config['api']['client_id']}/lfg/subscribe.json`;

        databaseClient.get(pathname, filename);

        databaseClient.post(pathname, function (queries) {
          let object = {
            subscribe: dataUtils.readFile(filename).subscribe
          };

          object = dataUtils.latestQuery(queries).message;
          dataUtils.writeFile(filename, object);
        });
      },
      lfg_posts: function () {
        const pathname = `/api/database/${config['api']['client_id']}/lfg/posts`;
        const filename = `./databases/api_data/${config['api']['client_id']}/lfg/lfg.json`;

        databaseClient.get(pathname, filename);

        databaseClient.post(pathname, function (queries) {
          let object = {};
          try {
            object = dataUtils.readFile(filename);
          } catch (e) {
            object = {};
          }

          object = dataUtils.latestQuery(queries).message;
          dataUtils.writeFile(filename, object);
        });
      },
      server_disabled_commands: function () {
        const pathname = `/api/database/${config['api']['client_id']}/server/disabledCommands`;
        const filename = `./databases/api_data/${config['api']['client_id']}/server/disabledCommands.json`;

        databaseClient.get(pathname, filename);

        databaseClient.post(pathname, function (queries) {
          let object = {};
          try {
            object = dataUtils.readFile(filename);
          } catch (e) {
            object = {};
          }

          object = dataUtils.latestQuery(queries).message;
          dataUtils.writeFile(filename, object);
        });
      },
      server_ignored_channels: function () {
        const pathname = `/api/database/${config['api']['client_id']}/server/ignoredChannels`;
        const filename = `./databases/api_data/${config['api']['client_id']}/server/ignoredChannels.json`;

        databaseClient.get(pathname, filename);

        databaseClient.post(pathname, function (queries) {
          let object = {
            channels: dataUtils.readFile(filename).channels
          };

          object = dataUtils.latestQuery(queries).message;
          dataUtils.writeFile(filename, object);
        });
      },
      server_prefixes: function () {
        const pathname = `/api/database/${config['api']['client_id']}/server/serverPrefixes`;
        const filename = `./databases/api_data/${config['api']['client_id']}/server/serverPrefixes.json`;

        databaseClient.get(pathname, filename);

        databaseClient.post(pathname, function (queries) {
          let object = {};
          try {
            object = dataUtils.readFile(filename);
          } catch (e) {
            object = {};
          }

          object = dataUtils.latestQuery(queries).message;
          dataUtils.writeFile(filename, object);
        });
      }
    };

    for (const i in routes) {
      routes[i]();
    }
  }
}

module.exports = new DatabaseQueries();
