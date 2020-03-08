const App = require('./router/app');
const commandUtils = require('./database/libraries/commandUtils');
const build = require('./database/build');

App.deploy();

commandUtils.command(['--build', '--a'], function() {
  build.genJSON(
    {
      delim: ',',
      input: './database/source_tables/ItemTableFixed - Item.csv',
      output: './database/build/api/itemids.json'
    },
    true
  );

  build.genJSON(
    {
      delim: ',',
      input: './database/source_tables/Quest IDs - Sheet1.csv',
      output: './database/build/api/questids.json'
    },
    true
  );

  build.items('./database/build/api/items.json', true);
  build.armors('./database/build/api/armors.json', true);
  build.armorPieces('./database/build/api/armor_pieces.json', true);
  build.decorations('./database/build/api/decorations.json', true);
  build.skills('./database/build/api/skills.json', true);
  build.db_weapons('./database/build/api/weapons.json', true);
});

commandUtils.command(['--build', '--b'], function() {
  build.genJSON(
    {
      delim: ',',
      input: './database/source_tables/ItemTableFixed - Item.csv',
      output: './database/build/bot/itemids.json'
    },
    false
  );

  build.genJSON(
    {
      delim: ',',
      input: './database/source_tables/Quest IDs - Sheet1.csv',
      output: './database/build/bot/questids.json'
    },
    false
  );

  build.items('./database/build/bot/items.json', false);
  build.armors('./database/build/bot/armors.json', false);
  build.armorPieces('./database/build/bot/armor_pieces.json', false);
  build.decorations('./database/build/bot/decorations.json', false);
  build.skills('./database/build/bot/skills.json', false);
  build.db_weapons('./database/build/bot/weapons.json', false);
});
