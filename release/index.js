const a = require('./mhdb-api');
a.setup('http://localhost:8080/api/', 'h5Nyec8tR3gehAcDW4dyJ');

a.request(a.fetch('mhw', 'weapons')).then(function (data) {
  const parser = require('./utils/mhw-parser');
  const output = parser.parse_as_weapons(data);
  // do whatever
});
