const database = require('./api/database/router');
const mapUtils = require('./util/mapUtils');
const config = require('./config.json');

class Queries {
  initialize() {
    /**
     * Function naming scheme: manage_[category]_[database]
     */

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

    database.post_db(pathname, function (queries) {
      let object = {
        subscribe: mapUtils.readFile(filename).subscribe
      };

      object = mapUtils.latestQuery(queries).message;
      mapUtils.writeFile(filename, object);
    });

    database.get_db(pathname, filename);
  }

  manage_lfg_posts() {
    const pathname = `/api/database/${config['api']['client_id']}/lfg/posts`;
    const filename = `./databases/api_data/${config['api']['client_id']}/lfg/lfg.json`;

    database.post_db(pathname, function (queries) {
      let object = {};
      try {
        object = mapUtils.readFile(filename);
      } catch (e) {
        object = {};
      }

      //let object = mapUtils.readFile(filename);

      object = mapUtils.latestQuery(queries).message;
      mapUtils.writeFile(filename, object);
    });

    database.get_db(pathname, filename);
  }

  manage_server_disabledCommands() {
    const pathname = `/api/database/${config['api']['client_id']}/server/disabledCommands`;
    const filename = `./databases/api_data/${config['api']['client_id']}/server/disabledCommands.json`;

    database.post_db(pathname, function (queries) {
      let object = {};
      try {
        object = mapUtils.readFile(filename);
      } catch (e) {
        object = {};
      }

      //let object = mapUtils.readFile(filename);

      object = mapUtils.latestQuery(queries).message;
      mapUtils.writeFile(filename, object);
    });

    database.get_db(pathname, filename);
  }

  manage_server_ignoredChannels() {
    const pathname = `/api/database/${config['api']['client_id']}/server/ignoredChannels`;
    const filename = `./databases/api_data/${config['api']['client_id']}/server/ignoredChannels.json`;

    database.post_db(pathname, function (queries) {
      let object = {
        channels: mapUtils.readFile(filename).channels
      };

      object = mapUtils.latestQuery(queries).message;
      mapUtils.writeFile(filename, object);
    });

    database.get_db(pathname, filename);
  }
}

module.exports = new Queries();
