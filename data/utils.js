const fs = require('fs');
const csv = require('./libraries/csvToJson');

// Slightly useless at this moment in time, though planned to expand upon
const logs = {
  success: 'File saved: '
};

class Utils {
  // Create a map based on a json file, allowing you to specify what exactly goes into the map with a potential for two props
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

  // Make an array based on a map, then push to the array based on the prop provided
  buildArray(map, prop) {
    let array = [];

    for (let [k, v] of map) {
      const item = map.get(k);
      array.push(item[prop]);
    }

    return array;
  }

  // Basic function to write to a file with FS
  writeFile(writeTo, db) {
    fs.writeFile(writeTo, JSON.stringify(db, null, 2), err => {
      if (err) {
        console.log(err);
      } else {
        console.log(`${logs.success}${writeTo}`);
      }
    });
  }

  // Search within array, based on prop and value provided
  search(array, prop, value) {
    let filtered = array.filter(function(item) {
      return item[prop] == value;
    });

    return filtered;
  }

  // A more advanced search to check if multiple props have a specific value
  advancedSearch(array, prop, newProp, value, newValue) {
    let filtered = array.filter(function(item) {
      return item[prop] == value && item[newProp] == newValue;
    });

    return filtered;
  }

  // Bulk convert csv to json, params including an array of objects taking in input and output
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

  // Base write function, which allows us to convert csv to json
  write(data = { delim: `,`, input: 'file.csv', output: 'file.json' }) {
    csv.fieldDelimiter(data.delim).getJsonFromCsv(data.input);
    csv.formatValueByType().getJsonFromCsv(data.input);
    csv.generateJsonFileFromCsv(data.input, data.output);
  }
}

module.exports = new Utils();
