const mhw = require("./mhw");

/*
*********************************
const fetch = require('./fetch');
const map = new fetch.map();
const fs = require('fs');

let input = 'anjanath';

const monsterdb = map.json('./monsters.json', 'utf8');
const monsters = map.collection(monsterdb, { key: 'name', value: 'details' });

if (map.alias(input, monsters, { key: 'aliases' })) {
    input = map.alias(input, monsters, { key: 'aliases' });
}

const data = map.get(input, monsters, 'monster', { key: 'title' });

if (data[1]) {
    console.log(data[0]);
} else {
    console.log(data[0]);
}
*********************************
*/

mhw.writeItems("./databases/formatted/items.json");
mhw.writeArmors("./databases/formatted/armors.json");
mhw.writeDecorations("./databases/formatted/decorations.json");
mhw.writeSkills("./databases/formatted/skills.json");
