const http = require('http');
const fs = require('fs');

class API {
  constructor(url, key) {
    this.url = url;
    this.key = key;
    this.types = ['mhw', 'mhgu'];
    this.mhw_categories = [
      'armors',
      'decorations',
      'items',
      'monsters',
      'skills',
      'weapons'
    ];
    this.mhgu_categories = ['monsters', 'weapons'];
  }

  config(url, key) {
    this.url = url;
    this.key = key;
  }

  req(
    json,
    options = {
      hostname: 'localhost',
      port: 8080,
      path: '/api',
      method: 'POST'
    }
  ) {
    const data = JSON.stringify(json);

    options.headers = {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    };

    const req = http.request(options, res => {
      console.log(`statusCode: ${res.statusCode}`);

      res.on('data', d => {
        process.stdout.write(d);
      });
    });

    req.on('error', error => {
      console.error(error);
    });

    req.write(data);
    req.end();
  }

  fetch_url(type = 'none', category = 'none') {
    if (this.types.includes(type) && type == 'mhw') {
      if (this.mhw_categories.includes(category)) {
        return `${this.url}${type}/${category}?key=${this.key}`;
      }
    }

    if (this.types.includes(type) && type == 'mhgu') {
      if (this.mhgu_categories.includes(category)) {
        return `${this.url}${type}/${category}?key=${this.key}`;
      }
    }
  }

  get_request(url) {
    return new Promise(function (resolve, reject) {
      http
        .get(url, function (res) {
          let body = '';
          res.on('data', chunk => {
            body += chunk;
          });

          res.on('end', () => {
            try {
              resolve(body);
            } catch (error) {
              console.error(error);
            }
          });
        })
        .on('error', error => {
          console.error(error.message);
        });
    });
  }

  to_map(
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
}

module.exports = new API();
