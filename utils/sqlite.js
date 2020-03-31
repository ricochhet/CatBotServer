const sqlite = require('sqlite3').verbose();

class SQLiteManager {
  setup(db) {
    this.db = new sqlite.Database(db);
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
}

module.exports = new SQLiteManager();
