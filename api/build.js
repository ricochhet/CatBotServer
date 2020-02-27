module.exports = {
  build: async function(active, advanced) {
    if (!active) return console.log(`Rebuilding is currently disabled!`);
    if (!advanced) {
      if (active) console.log(`Rebuilding databases...`);
      const mhw = require('./mhw');

      mhw.writeData({
        delim: ',',
        input: './api/json/ItemTableFixed - Item.csv',
        output: './api/database/bot/itemids.json'
      });

      mhw.writeData({
        delim: ',',
        input: './api/json/Quest IDs - Sheet1.csv',
        output: './api/database/bot/questids.json'
      });

      mhw.writeItems('./api/database/bot/items.json');
      mhw.writeArmors('./api/database/bot/armors.json');
      mhw.writeDecorations('./api/database/bot/decorations.json');
      mhw.writeSkills('./api/database/bot/skills.json');
      mhw.writeWeapons('./api/database/bot/weapons.json');
    } else {
      if (active) console.log(`Rebuilding advanced databases...`);
      const mhw = require('./mhw');

      mhw.writeData(
        {
          delim: ',',
          input: './api/json/ItemTableFixed - Item.csv',
          output: './api/database/itemids.json'
        },
        true
      );

      mhw.writeData(
        {
          delim: ',',
          input: './api/json/Quest IDs - Sheet1.csv',
          output: './api/database/questids.json'
        },
        true
      );

      mhw.writeItems('./api/database/items.json', true);
      mhw.writeArmors('./api/database/armors.json', true);
      mhw.writeDecorations('./api/database/decorations.json', true);
      mhw.writeSkills('./api/database/skills.json', true);
      mhw.writeWeapons('./api/database/weapons.json', true);
    }
  }
};
