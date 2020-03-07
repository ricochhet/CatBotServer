const Routes = require('./router/routes');
const commandUtils = require('./database/libraries/commandUtils');
const dbBuilder = require('./database/dbBuilder');

Routes.deploy();
/*commandUtils.command(['start'], function() {
  Routes.deploy();
});*/

commandUtils.command(['--build-api', '--i'], function() {
  dbBuilder.genJSON(
    {
      delim: ',',
      input: './database/source_tables/ItemTableFixed - Item.csv',
      output: './database/build_api/itemids.json'
    },
    true
  );

  dbBuilder.genJSON(
    {
      delim: ',',
      input: './database/source_tables/Quest IDs - Sheet1.csv',
      output: './database/build_api/questids.json'
    },
    true
  );

  dbBuilder.items('./database/build_api/items.json', true);
  dbBuilder.armors('./database/build_api/armors.json', true);
  dbBuilder.armorPieces('./database/build_api/armor_pieces.json', true);
  dbBuilder.decorations('./database/build_api/decorations.json', true);
  dbBuilder.skills('./database/build_api/skills.json', true);
  dbBuilder.weapons('./database/build_api/weapons.json', true);
});

commandUtils.command(['--build-api', '--a'], function() {
  dbBuilder.genJSON(
    {
      delim: ',',
      input: './database/source_tables/ItemTableFixed - Item.csv',
      output: './database/build_bot/itemids.json'
    },
    false
  );

  dbBuilder.genJSON(
    {
      delim: ',',
      input: './database/source_tables/Quest IDs - Sheet1.csv',
      output: './database/build_bot/questids.json'
    },
    false
  );

  dbBuilder.items('./database/build_bot/items.json', false);
  dbBuilder.armors('./database/build_bot/armors.json', false);
  dbBuilder.armorPieces('./database/build_bot/armor_pieces.json', false);
  dbBuilder.decorations('./database/build_bot/decorations.json', false);
  dbBuilder.skills('./database/build_bot/skills.json', false);
  dbBuilder.weapons('./database/build_bot/weapons.json', false);
});
