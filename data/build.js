const cmd = require('./libs/commandUtils');
const parser = require('./tools/parser');
const utils = require('./tools/utils');
const builder = require('./tools/builder');

// Input --convert as an arg into the cmd line to bulk convert all supplied csvs
cmd.command(['--convert'], function() {
  utils.bulkConvertCSVs([
    {
      input: './data/src/source_data/armors',
      output: './data/src/source_json/armors'
    },
    {
      input: './data/src/source_data/charms',
      output: './data/src/source_json/charms'
    },
    {
      input: './data/src/source_data/decorations',
      output: './data/src/source_json/decorations'
    },
    {
      input: './data/src/source_data/items',
      output: './data/src/source_json/items'
    },
    {
      input: './data/src/source_data/locations',
      output: './data/src/source_json/locations'
    },
    {
      input: './data/src/source_data/monsters',
      output: './data/src/source_json/monsters'
    },
    {
      input: './data/src/source_data/quests',
      output: './data/src/source_json/quests'
    },
    {
      input: './data/src/source_data/skills',
      output: './data/src/source_json/skills'
    },
    {
      input: './data/src/source_data/weapons',
      output: './data/src/source_json/weapons'
    }
  ]);
});

// Build the inital data and write to supplied path
cmd.command(['--build'], function() {
  parser.parseArmorPieces('./data/src/json/armors/armor_pieces.json');
  parser.parseCharms('./data/src/json/charms/charms.json');
  parser.parseDecorations('./data/src/json/decorations/decorations.json');
  parser.parseItems('./data/src/json/items/items.json');
  parser.parseMonsters('./data/src/json/monsters/monsters.json');
  parser.parseQuests('./data/src/json/quests/quests.json');
  parser.parseSkills('./data/src/json/skills/skills.json');
  parser.parseKinsects('./data/src/json/weapons/kinsects.json');
  parser.parseWeapons('./data/src/json/weapons/weapons.json');
});

// Updates certain jsons that rely on others
cmd.command(['--update'], function() {
  parser.parseArmors('./data/src/json/armors/armor_sets.json');
  parser.parseDecorations(
    './data/src/json/decorations/decorations.json',
    false
  );
});

// Creates the full version of the JSONs
cmd.command(['--api'], function() {
  builder.buildJSON(
    {
      delim: ',',
      input: './data/src/source_tables/ItemTableFixed - Item.csv',
      output: './data/build/api/itemids.json'
    },
    true
  );

  builder.buildJSON(
    {
      delim: ',',
      input: './data/src/source_tables/Quest IDs - Sheet1.csv',
      output: './data/build/api/questids.json'
    },
    true
  );

  builder.buildItems('./data/build/api/items.json', true);
  builder.buildArmors('./data/build/api/armors.json', true);
  builder.buildArmorPieces('./data/build/api/armor_pieces.json', true);
  builder.buildDecorations('./data/build/api/decorations.json', true);
  builder.buildSkills('./data/build/api/skills.json', true);
  builder.buildWeapons('./data/build/api/weapons.json', true);
});

// Creates a minified, minimal use JSONs
cmd.command(['--bot'], function() {
  builder.buildJSON(
    {
      delim: ',',
      input: './data/src/source_tables/ItemTableFixed - Item.csv',
      output: './data/build/bot/itemids.json'
    },
    false
  );

  builder.buildJSON(
    {
      delim: ',',
      input: './data/src/source_tables/Quest IDs - Sheet1.csv',
      output: './data/build/bot/questids.json'
    },
    false
  );

  builder.buildItems('./data/build/bot/items.json', false);
  builder.buildArmors('./data/build/bot/armors.json', false);
  builder.buildArmorPieces('./data/build/bot/armor_pieces.json', false);
  builder.buildDecorations('./data/build/bot/decorations.json', false);
  builder.buildSkills('./data/build/bot/skills.json', false);
  builder.buildWeapons('./data/build/bot/weapons.json', false);
});
