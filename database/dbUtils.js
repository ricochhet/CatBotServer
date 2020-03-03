class DBUtils {
  build(active, advanced) {
    if (!active) return console.log(`Rebuilding is currently disabled!`);
    if (!advanced) {
      if (active) console.log(`Rebuilding databases...`);
      const db = require('./dbBuilder');

      db.genJSON({
        delim: ',',
        input: './database/src/ItemTableFixed - Item.csv',
        output: './database/build_light/itemids.json'
      });

      db.genJSON({
        delim: ',',
        input: './database/src/Quest IDs - Sheet1.csv',
        output: './database/build_light/questids.json'
      });

      db.items('./database/build_light/items.json');
      db.armors('./database/build_light/armors.json');
      db.decorations('./database/build_light/decorations.json');
      db.skills('./database/build_light/skills.json');
      db.weapons('./database/build_light/weapons.json');
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
