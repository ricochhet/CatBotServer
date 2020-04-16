const mapUtils = require('./util/mapUtils');
const config = require('./config.json');

const database = require('./api/database/router');

class Queries {
  initialize() {
    database.post_database(
      `/api/database/${config['api']['client_id']}/lfg`,
      function (queries) {
        let object = {
          subscribe: []
        };

        for (const i in queries) {
          object.subscribe.push(queries[i].message);
        }

        mapUtils.writeFile('./databases/api_data/lfg.json', object);
      }
    );

    database.get_database(
      `/api/database/${config['api']['client_id']}/lfg`,
      './databases/api_data/lfg.json'
    );
  }
}

module.exports = new Queries();
