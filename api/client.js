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

/*mhw.writeData({
    delim: ',',
    input: './api/spreadsheets/ItemTableFixed - Item.csv',
    output: './api/databases/itemids.json'
});

mhw.writeData({
    delim: ',',
    input: './api/spreadsheets/Quest IDs - Sheet1.csv',
    output: './api/databases/questids.json'
});

mhw.writeItems("./api/databases/items.json");
mhw.writeArmors("./api/databases/armors.json");
mhw.writeDecorations("./api/databases/decorations.json");
mhw.writeSkills("./api/databases/skills.json");*/
mhw.writeWeapons("./api/databases/weapons.json");