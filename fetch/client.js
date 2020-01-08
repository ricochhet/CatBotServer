const fetch = require('./fetch');
const fs = require('fs');

const monsterdb = JSON.parse(fs.readFileSync('./monsters.json', 'utf8'));

let input = 'black diabos';

const map = new fetch.map();
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