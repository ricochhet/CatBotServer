const mhw = require('./mhapi');

/*try {
    let e = mhw.res('potion', 'item', 'item');
    console.log(e);
} catch (e) {
    console.log(e);
}*/

//mhw.parse_items('../databases/parser/items.json');
//mhw.parse_armors('../databases/parser/armors.json');

mhw.rewrite_armors();