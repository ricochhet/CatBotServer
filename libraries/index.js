const db = require('./utils/db-api');

/*db.request(
  { message: 'channel_id' },
  {
    hostname: 'localhost',
    port: 8080,
    path: '/api/database/none/lfg?key=h5Nyec8tR3gehAcDW4dyJ',
    method: 'POST'
  }
);*/

db.request(
  { message: 'item0' },
  {
    hostname: 'localhost',
    port: 8080,
    path: '/api/database/none/lfg?key=h5Nyec8tR3gehAcDW4dyJ',
    method: 'DELETE'
  }
);

db.config({
  url: 'http://localhost:8080/api/',
  key: 'h5Nyec8tR3gehAcDW4dyJ'
});

db.get(db.query('mhw', 'weapons')).then(function (data) {
  const output = db.parsers.mhw.parse_as_weapons(data);
  // console.log(output);
});
