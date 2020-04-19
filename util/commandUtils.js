'use strict';
const stringUtils = require('./stringUtils');

class CommandUtils {
  command(props = [], functionObject) {
    const params = process.argv.slice(2);

    if (!Array.isArray(props) || !props.length)
      throw `props param is not of type array!`;

    if (this.checkArraySimilarities(params, props)) {
      if (typeof functionObject !== 'function')
        throw `functionObject param is not of type function!`;

      functionObject(params, props);
    }
  }

  cmd(string = '', functionObject, slice = 2) {
    const params = process.argv.slice(slice);

    if (!stringUtils.isBlank(string)) {
      if (params.includes(string)) {
        if (typeof functionObject !== 'function')
          throw `functionObject param is not of type function!`;

        functionObject(params, string);
      }
    } else {
      throw `string is either null or blank!`;
    }
  }

  checkArraySimilarities(array, target) {
    return target.every(v => array.includes(v));
  }
}
module.exports = new CommandUtils();
