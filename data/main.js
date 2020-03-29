const cmd = require('./libraries/commandUtils');

const Merge = require('./merge');
const merge = new Merge('./src/source_json')

const utils = require('./utils');
const build = require('./build');

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
cmd.command(['--merge'], function() {
  merge.armorPieces('./data/src/json/armors/armor_pieces.json');
  merge.charms('./data/src/json/charms/charms.json');
  merge.decorations('./data/src/json/decorations/decorations.json');
  merge.items('./data/src/json/items/items.json');
  merge.monsters('./data/src/json/monsters/monsters.json');
  merge.quests('./data/src/json/quests/quests.json');
  merge.skills('./data/src/json/skills/skills.json');
  merge.kinsects('./data/src/json/weapons/kinsects.json');
  merge.weapons('./data/src/json/weapons/weapons.json');
});

// Updates certain jsons that rely on others
cmd.command(['--merge-fix'], function() {
  merge.armors('./data/src/json/armors/armor_sets.json', './src/json/armors/armor_pieces.json');
  merge.decorations('./data/src/json/decorations/decorations.json', false);
});

// Creates the full version of the JSONs
cmd.command(['--build-api'], function() {
  build.items('./data/build/api/item_info.json', './src/json/items/items.json');
  build.armors('./data/build/api/armor_info.json', true);
  build.armorPieces('./data/build/api/armor_piece_info.json', true);
  build.decorations('./data/build/api/decoration_info.json', true);
  build.skills('./data/build/api/skill_info.json', true);
  build.weapons(
    './data/build/api/weapon_info.json',
    true,
    './src/json/weapons/weapons.json'
  );
});

// Creates a minified, minimal use JSONs
cmd.command(['--build-bot'], function() {
  build.items('./data/build/bot/item_info.json', './src/json/items/items.json');
  build.armors('./data/build/bot/armor_info.json', false);
  build.armorPieces('./data/build/bot/armor_piece_info.json', false);
  build.decorations('./data/build/bot/decoration_info.json', false);
  build.skills('./data/build/bot/skill_info.json', false);
  build.weapons(
    './data/build/bot/weapon_info.json',
    false,
    './src/json/weapons/weapons.json'
  );
});
