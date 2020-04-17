const database = require('./api/database/router');
const mapUtils = require('./util/mapUtils');
const config = require('./config.json');

class Queries {
  initialize() {
    this.manage_lfg();
  }

  manage_lfg() {
    const pathname = `/api/database/${config['api']['client_id']}/lfg`;
    const filename = `./databases/api_data/lfg.json`;

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
}

module.exports = new Queries();
