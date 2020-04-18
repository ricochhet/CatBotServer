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
  }

  manage_lfg_subscribe() {
    const pathname = `/api/database/${config['api']['client_id']}/lfg/subscribe`;
    const filename = `./databases/api_data/${config['api']['client_id']}/lfg/subscribe.json`;

    database.post_db(pathname, function (queries) {
      let object = {
        subscribe: mapUtils.readFile(filename).subscribe
      };

      object.subscribe.push(mapUtils.latestQuery(queries).message);
      mapUtils.writeFile(filename, object);
    });

    database.delete_db(pathname, function (queries) {
      let object = {
        subscribe: mapUtils.readFile(filename).subscribe
      };

      object.subscribe = mapUtils.removeFromArray(
        object.subscribe,
        mapUtils.latestQuery(queries).message
      );

      mapUtils.writeFile(filename, object);
    });

    database.get_db(pathname, filename);
  }

  manage_lfg_posts() {
    const pathname = `/api/database/${config['api']['client_id']}/lfg/posts`;
    const filename = `./databases/api_data/${config['api']['client_id']}/lfg/lfg.json`;

    database.post_db(pathname, function (queries) {
      //
    });

    database.delete_db(pathname, function (queries) {
      //
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

      object.channels.push(mapUtils.latestQuery(queries).message);
      mapUtils.writeFile(filename, object);
    });

    database.delete_db(pathname, function (queries) {
      let object = {
        channels: mapUtils.readFile(filename).channels
      };

      object.channels = mapUtils.removeFromArray(
        object.channels,
        mapUtils.latestQuery(queries).message
      );

      mapUtils.writeFile(filename, object);
    });

    database.get_db(pathname, filename);
  }
}

module.exports = new Queries();
