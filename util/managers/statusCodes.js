class StatusCodes {
  constructor() {
    this.codes = new Map([
      ['404', '404 Not found'],
      ['403', '403 Unauthorized']
    ]);
  }

  get_code(str = '') {
    const code = str.toString();

    if (this.codes.has(code)) {
      return this.codes.get(code);
    } else {
      throw `Code not found ${code}`;
    }
  }
}

module.exports = new StatusCodes();
