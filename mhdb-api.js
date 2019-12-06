const itemDatabase = require('./mhw-db/items.json');

const items = new Map();
const itemData = [];

for (const i of Object.keys(itemDatabase)) {
  items.set(i, itemDatabase[i]);
}

for(let [name, i] of items.entries()) {
  itemData.push(i.name);
}

module.exports = {
  retrieve: function(type, index, name) {
    let input = index.toLowerCase().replace(' ', '');

    if(type === 'item') {
      return pull(itemData, input, items, name);
    } else {
      return;
    }
  }
}

function pull(names, index, map, type) {
  const array = names.map(toLowerReplace);
  const dictionary = array.indexOf(index);
  const stringify = dictionary.toString();
  const info = map.get(stringify);

  // If the key doesn't exist
  if (dictionary == -1){
    similarKeys = [];

    for (key of array) {
      if (similarity(key,index) >= 0.5) {
        similarKeys.push(key);
      }
    }

    if (similarKeys.length > 0) {
      throw `\nDid you mean: \`${similarKeys.join(', ')}\`?`;;
    } else {
      throw `That ${type} doesn\'t seem to exist!`;
    }
  }

  let data = [];
  for(let key in info) {
    if(info.hasOwnProperty(key)) {
      let values = info[key];
      data.push(values);
    }
  }

  return data;
}

// Compares two strings and return their similarity percentage (0-1)
function similarity(str1, str2) {
  let longer = str1;
  let shorter = str2;
  if (str1.length < str2.length) {
      longer = str2;
      shorter = str1;
  }
  const longerLength = longer.length;
  if (longerLength == 0) {
      return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

// Computes Levenshtein distance between two strings
function editDistance (str1, str2) {
  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();

  const costs = new Array();
  for (let i = 0; i <= str1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= str2.length; j++) {
      if (i == 0) {
        costs[j] = j;
      }
      else if (j > 0) {
        let newValue = costs[j - 1];
        if (str1.charAt(i - 1) != str2.charAt(j - 1)) {
          newValue = Math.min(Math.min(newValue, lastValue),
          costs[j]) + 1;
        }
        costs[j - 1] = lastValue;
        lastValue = newValue;
      }
    }
    if (i > 0) {
      costs[str2.length] = lastValue;
    }
  }
  return costs[str2.length];
}

toUpper = function(x){
  return x.toUpperCase();
};

toLower = function(x) {
  return x.toLowerCase();
};

toLowerReplace = function(x) {
  return x.toLowerCase().replace(' ', '');
};
