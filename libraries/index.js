const api = require('./db-api');
const mhw_parser = require('./utils/parsers/mhw-parser');

api.req(
  { message: 'CHANNEL_ID' },
  {
    hostname: 'localhost',
    port: 8080,
    path: '/api/database/none/lfg?key=h5Nyec8tR3gehAcDW4dyJ',
    method: 'POST'
  }
);

mhw_parser.config(api);
api.config('http://localhost:8080/api/', 'h5Nyec8tR3gehAcDW4dyJ');

api.get_request(api.fetch_url('mhw', 'weapons')).then(function (data) {
  const output = mhw_parser.parse_as_weapons(data);
  console.log(output)
});
