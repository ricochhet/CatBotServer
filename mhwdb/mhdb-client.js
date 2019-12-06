const mhw = require('./mhdb-api');
//const item = mhw.retrieve('item', 'qerw');

try {
 const item = mhw.retrieve('item', 'herb', 'item');
 console.log(' Rarity' + item[3] + ' Max' + item[4] + ' Sell' + item[5]);
} catch (e) {
 console.log(e);
}
