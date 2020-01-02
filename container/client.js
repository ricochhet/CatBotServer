const container = require('./container');
const fs = require('fs');

const monsterdb = JSON.parse(fs.readFileSync('./monsters.json', 'utf8'));
const itemdb = JSON.parse(fs.readFileSync('./items.json', 'utf8'));

container.structure({
    monster: function () {
        const map = new container.map();
        let input = 'black diabos';

        const monsters = map.collection(monsterdb, { key: 'name', value: 'details' });
        if (map.alias(input, monsters, { key: 'aliases' })) {
            input = map.alias(input, monsters, { key: 'aliases' });
        }

        const get = map.get(input, monsters, 'monster', { key: 'title' });
        if (get[1]) {
            console.log(get[0]);
        } else {
            console.log(get[0]);
        }
    },
    items: function () {
        /*const map = new container.map();
        let input = 'potion';

        const items = map.collection(itemdb);
        const get = map.get(input, items, 'item');

        if (get[1]) {
            console.log(get[0]);
        } else {
            console.log(get[0]);
        }*/
    }
});