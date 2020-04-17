const db_api = require('./db-api');
const mhw_parser = require('./parsers/mhw-parser');

module.exports = {
  api: db_api,
  mhw: mhw_parser
};
