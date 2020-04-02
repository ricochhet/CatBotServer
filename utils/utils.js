const csv = require('../data/libraries/csvToJson');
const sqlite = require('sqlite3').verbose();
const fs = require('fs');

class Manager {
  constructor() {
    this.logs = {
      success: 'File saved: '
    };
  }

  setup(db) {
    this.db = new sqlite.Database(db);
  }

  buildMap(
    file,
    opts = { extended: false, extraProp: false, raw: false },
    prop = '',
    extraProp = ''
  ) {
    let json = `NULL`;
    if (opts.raw != true) {
      json = JSON.parse(fs.readFileSync(file, 'utf8'));
    } else {
      json = JSON.parse(file);
    }
    let map = new Map();

    if (!opts.extended) {
      for (const i of Object.keys(json)) {
        map.set(i, json[i]);
      }
    }

    if (opts.extended && !opts.extraProp) {
      for (const i of Object.keys(json)) {
        map.set(json[i][prop], json[i]);
      }
    }

    if (opts.extended && opts.extraProp) {
      for (const i of Object.keys(json)) {
        map.set(json[i][prop], json[i][extraProp]);
      }
    }

    return {
      map: map,
      raw: json
    };
  }

  buildArray(map, prop) {
    let array = [];

    for (let [k, v] of map) {
      const item = map.get(k);
      array.push(item[prop]);
    }

    return array;
  }

  execute(sql) {
    const self = this;
    return new Promise(function(res, rej) {
      self.db.all(sql, [], (err, rows) => {
        const data = [];

        if (err) {
          throw err;
        }

        rows.forEach(row => {
          data.push(row);
        });

        res(data);
      });
    });
  }

  objectify(arr, opts = { keyed: true }) {
    let outobj = {};
    for (const i in arr) {
      for (const k of Object.keys(arr[i])) {
        if (opts.keyed) {
          outobj[k.toLowerCase().replace(/ /g, '')] = arr[i][k];
        } else {
          outobj = arr[i];
        }
      }
    }

    return outobj;
  }

  parsestr(str) {
    let parsestr = ``;
    let outstr = [];
    if (str.includes('&&')) {
      parsestr = str.split('&&');
      for (const i in parsestr) {
        try {
          outstr.push(JSON.parse(parsestr[i]));
        } catch (e) {
          try {
            let stringify = JSON.stringify(parsestr[i]);
            outstr.push(JSON.parse(stringify));
          } catch (e) {
            throw console.log(e);
          }
        }
      }
      outstr = outstr.flat(2);
    } else if (str == '-') {
      parsestr = '-';
      outstr = parsestr;
    } else if (!str.includes('&&') && str != '-') {
      try {
        parsestr = JSON.parse(str);
      } catch (e) {
        try {
          let stringify = JSON.stringify(str);
          parsestr = JSON.parse(stringify);
        } catch (err) {
          throw console.log(e);
        }
      }
      outstr = parsestr;
    }

    return outstr;
  }

  parsearr(arr) {
    let parsearr = [];
    if (arr == '' || arr == null) {
      parsearr = [];
    } else if (!arr.includes(',') && (arr != '' || arr != null)) {
      parsearr.push(arr);
    } else if (arr.includes(',')) {
      parsearr = arr.split(',');
    }

    return parsearr;
  }

  writeFile(writeTo, db) {
    fs.writeFile(writeTo, JSON.stringify(db, null, 2), err => {
      if (err) {
        console.log(err);
      } else {
        console.log(`${this.logs.success}${writeTo}`);
      }
    });
  }

  search(array, prop, value) {
    let filtered = array.filter(function(item) {
      return item[prop] == value;
    });

    return filtered;
  }

  advancedSearch(array, prop, newProp, value, newValue) {
    let filtered = array.filter(function(item) {
      return item[prop] == value && item[newProp] == newValue;
    });

    return filtered;
  }

  bulkConvertCSVs(bulkData = [{ input: '', output: '' }]) {
    for (const i in bulkData) {
      fs.readdir(bulkData[i].input, (err, files) => {
        if (err) return console.error(err);
        files.forEach(file => {
          const name = file.split('.')[0];
          if (!file.endsWith('.csv')) return;

          this.write({
            delim: ',',
            input: `${bulkData[i].input}/${file}`,
            output: `${bulkData[i].output}/${name}.json`
          });
        });
      });
    }
  }

  write(data = { delim: `,`, input: 'file.csv', output: 'file.json' }) {
    csv.fieldDelimiter(data.delim).getJsonFromCsv(data.input);
    csv.formatValueByType().getJsonFromCsv(data.input);
    csv.generateJsonFileFromCsv(data.input, data.output);
  }
}

module.exports = new Manager();
