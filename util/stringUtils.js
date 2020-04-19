'use strict';

class StringUtils {
  trimPropertyName(value) {
    return value.replace(/\s/g, '');
  }

  getValueFormatByType(value) {
    let isNumber = !isNaN(value);
    if (isNumber) {
      return Number(value);
    }
    return String(value);
  }

  hasContent(values) {
    if (values.length > 0) {
      for (let i = 0; i < values.length; i++) {
        if (values[i]) {
          return true;
        }
      }
    }
    return false;
  }

  space(str, to) {
    let res = str;
    let sw = 1;
    for (let i = 0; i < 100; i++) {
      if (sw === 1) res = res + ' ';
      else res = ' ' + res;

      if (res.length >= to) break;

      sw = sw * -1;
    }
    return res;
  }

  isBlank(s) {
    if (s != null && s != undefined && s != '') {
      return false;
    } else {
      return true;
    }
  }
}
module.exports = new StringUtils();
