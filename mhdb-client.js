const mhw = require('./mhdb-api');

const input = '';

try {
 const item = mhw.retrieve('item', 'ancient potion', 'item');
 console.log('Rarity ' + item[3] + '\n Max ' + item[4] + '\n Sell ' + item[5]);
} catch (e) {
 console.log(e);
}
