const database = require('./api/database/router');
const mapUtils = require('./util/mapUtils');
const config = require('./config.json');

class Queries {
  initialize() {
    /* LFG Features */
    this.manage_lfg_subscribe();
    this.manage_lfg_posts();

    /* SERVER / GUILD Features */
    this.manage_server_ignoredChannels();
    this.manage_server_disabledCommands();
  }

  manage_lfg_subscribe() {
    const pathname = `/api/database/${config['api']['client_id']}/lfg/subscribe`;
    const filename = `./databases/api_data/${config['api']['client_id']}/lfg/subscribe.json`;

    database.get_db(pathname, filename);

    database.post_db(pathname, function (queries) {
      let object = {
        subscribe: mapUtils.readFile(filename).subscribe
      };

      object = mapUtils.latestQuery(queries).message;
      mapUtils.writeFile(filename, object);
    });
  }

  manage_lfg_posts() {
    const pathname = `/api/database/${config['api']['client_id']}/lfg/posts`;
    const filename = `./databases/api_data/${config['api']['client_id']}/lfg/lfg.json`;

    database.get_db(pathname, filename);

    database.post_db(pathname, function (queries) {
      let object = {};
      try {
        object = mapUtils.readFile(filename);
      } catch (e) {
        object = {};
      }

      object = mapUtils.latestQuery(queries).message;
      mapUtils.writeFile(filename, object);
    });
  }

  manage_server_disabledCommands() {
    const pathname = `/api/database/${config['api']['client_id']}/server/disabledCommands`;
    const filename = `./databases/api_data/${config['api']['client_id']}/server/disabledCommands.json`;

    database.get_db(pathname, filename);

    database.post_db(pathname, function (queries) {
      let object = {};
      try {
        object = mapUtils.readFile(filename);
      } catch (e) {
        object = {};
      }

      object = mapUtils.latestQuery(queries).message;
      mapUtils.writeFile(filename, object);
    });
  }

  manage_server_ignoredChannels() {
    const pathname = `/api/database/${config['api']['client_id']}/server/ignoredChannels`;
    const filename = `./databases/api_data/${config['api']['client_id']}/server/ignoredChannels.json`;

    database.get_db(pathname, filename);
    
    database.post_db(pathname, function (queries) {
      console.log(queries);
      let object = {
        channels: mapUtils.readFile(filename).channels
      };

      object = mapUtils.latestQuery(queries).message;
      mapUtils.writeFile(filename, object);
    });
  }
}

module.exports = new Queries();
