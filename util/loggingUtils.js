const stringUtils = require('./stringUtils');

class LoggingUtils {
  constructor() {
    this.options = {
      autoNewLine: true,
      systemIdentifier: null
    };
  }

  config(options = { autoNewLine: true, systemIdentifier: null }) {
    this.options = options;
  }

  log(string) {
    let str = string.toString();
    let id = this.options.systemIdentifier;

    if (!stringUtils.isBlank(id)) {
      str = `[${id.toString().toUpperCase()}] ${str}`;
    }

    if (this.options.autoNewLine) {
      process.stdout.write(str + '\n');
    } else {
      process.stdout.write(str);
    }
  }
}

module.exports = new LoggingUtils();
