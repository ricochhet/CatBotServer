const api = require('./db-api');
const mhw_parser = require('./utils/parsers/mhw-parser');

mhw_parser.config(api);
api.config('http://localhost:8080/api/', 'h5Nyec8tR3gehAcDW4dyJ');

api.get_request(api.fetch_url('mhw', 'weapons')).then(function (data) {
  const output = mhw_parser.parse_as_weapons(data);
});
