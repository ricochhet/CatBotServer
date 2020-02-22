module.exports = {
  build: async function(active, advanced) {
    if (!active) return console.log(`Rebuilding is currently disabled!`);
    if (!advanced) {
      if (active) console.log(`Rebuilding databases...`);
      const mhw = require('../mhw');

      mhw.writeData({
        delim: ',',
        input: './api/sheets/ItemTableFixed - Item.csv',
        output: './api/build/bot/itemids.json'
      });

      mhw.writeData({
        delim: ',',
        input: './api/sheets/Quest IDs - Sheet1.csv',
        output: './api/build/bot/databases/questids.json'
      });

      mhw.writeItems('./api/build/bot/databases/items.json');
      mhw.writeArmors('./api/build/bot/databases/armors.json');
      mhw.writeDecorations('./api/build/bot/databases/decorations.json');
      mhw.writeSkills('./api/build/bot/databases/skills.json');
      mhw.writeWeapons('./api/build/bot/databases/weapons.json');
    } else {
      if (active) console.log(`Rebuilding advanced databases...`);
      const mhw = require('../mhw');

      mhw.writeData(
        {
          delim: ',',
          input: './api/sheets/ItemTableFixed - Item.csv',
          output: './api/build/itemids.json'
        },
        true
      );

      mhw.writeData(
        {
          delim: ',',
          input: './api/sheets/Quest IDs - Sheet1.csv',
          output: './api/build/questids.json'
        },
        true
      );

      mhw.writeItems('./api/build/items.json', true);
      mhw.writeArmors('./api/build/armors.json', true);
      mhw.writeDecorations('./api/build/decorations.json', true);
      mhw.writeSkills('./api/build/skills.json', true);
      mhw.writeWeapons('./api/build/weapons.json', true);
    }
  }
};

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
