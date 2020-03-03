class DBUtils {
  build(active, advanced) {
    if (!active) return console.log(`Rebuilding is currently disabled!`);
    if (!advanced) {
      if (active) console.log(`Rebuilding databases...`);
      const db = require('./dbBuilder');

      db.genJSON({
        delim: ',',
        input: './database/src/ItemTableFixed - Item.csv',
        output: './database/compiled/itemids.json'
      });

      db.genJSON({
        delim: ',',
        input: './database/src/Quest IDs - Sheet1.csv',
        output: './database/compiled/questids.json'
      });

      db.items('./database/compiled/items.json');
      db.armors('./database/compiled/armors.json');
      db.decorations('./database/compiled/decorations.json');
      db.skills('./database/compiled/skills.json');
      db.weapons('./database/compiled/weapons.json');
    } else {
      if (active) console.log(`Rebuilding advanced databases...`);
      const db = require('./dbBuilder');

      db.genJSON(
        {
          delim: ',',
          input: './database/src/ItemTableFixed - Item.csv',
          output: './database/build/itemids.json'
        },
        true
      );

      db.genJSON(
        {
          delim: ',',
          input: './database/src/Quest IDs - Sheet1.csv',
          output: './database/build/questids.json'
        },
        true
      );

      db.items('./database/build/items.json', true);
      db.armors('./database/build/armors.json', true);
      db.decorations('./database/build/decorations.json', true);
      db.skills('./database/build/skills.json', true);
      db.weapons('./database/build/weapons.json', true);
    }
  }
}

module.exports = new DBUtils();
