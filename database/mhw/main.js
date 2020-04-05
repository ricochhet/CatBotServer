const cmd = require('../libraries/commandUtils');

const Merge = require('./merge');
const merge = new Merge('./src/source_json');

const utils = require('../../util/mapUtil');
const build = require('./build');

// Input --convert as an arg into the cmd line to bulk convert all supplied csvs
cmd.command(['--convert'], function () {
  utils.bulkConvertCSVs([
    {
      input: './database/mhw/src/source_data/armors',
      output: './database/mhw/src/source_json/armors'
    },
    {
      input: './database/mhw/src/source_data/charms',
      output: './database/mhw/src/source_json/charms'
    },
    {
      input: './database/mhw/src/source_data/decorations',
      output: './database/mhw/src/source_json/decorations'
    },
    {
      input: './database/mhw/src/source_data/items',
      output: './database/mhw/src/source_json/items'
    },
    {
      input: './database/mhw/src/source_data/locations',
      output: './database/mhw/src/source_json/locations'
    },
    {
      input: './database/mhw/src/source_data/monsters',
      output: './database/mhw/src/source_json/monsters'
    },
    {
      input: './database/mhw/src/source_data/quests',
      output: './database/mhw/src/source_json/quests'
    },
    {
      input: './database/mhw/src/source_data/skills',
      output: './database/mhw/src/source_json/skills'
    },
    {
      input: './database/mhw/src/source_data/weapons',
      output: './database/mhw/src/source_json/weapons'
    }
  ]);
});

// Build the inital data and write to supplied path
cmd.command(['--merge'], function () {
  merge.armorPieces('./database/mhw/src/json/armors/armor_pieces.json');
  merge.charms('./database/mhw/src/json/charms/charms.json');
  merge.decorations('./database/mhw/src/json/decorations/decorations.json');
  merge.items('./database/mhw/src/json/items/items.json');
  merge.monsters('./database/mhw/src/json/monsters/monsters.json');
  merge.quests('./database/mhw/src/json/quests/quests.json');
  merge.skills('./database/mhw/src/json/skills/skills.json');
  merge.kinsects('./database/mhw/src/json/weapons/kinsects.json');
  merge.weapons('./database/mhw/src/json/weapons/weapons.json');
});

// Updates certain jsons that rely on others
cmd.command(['--merge-fix'], function () {
  merge.armors(
    './database/mhw/src/json/armors/armor_sets.json',
    './src/json/armors/armor_pieces.json'
  );
  merge.decorations(
    './database/mhw/src/json/decorations/decorations.json',
    false
  );
});

// Creates the full version of the JSONs
cmd.command(['--build-api'], function () {
  build.items(
    './database/mhw/build/api/item_info.json',
    './src/json/items/items.json'
  );
  build.armors('./database/mhw/build/api/armor_info.json', true);
  build.armorPieces('./database/mhw/build/api/armor_piece_info.json', true);
  build.decorations('./database/mhw/build/api/decoration_info.json', true);
  build.skills('./database/mhw/build/api/skill_info.json', true);
  build.weapons(
    './database/mhw/build/api/weapon_info.json',
    true,
    './src/json/weapons/weapons.json'
  );
});

// Creates a minified, minimal use JSONs
cmd.command(['--build-bot'], function () {
  build.items(
    './database/mhw/build/bot/item_info.json',
    './src/json/items/items.json'
  );
  build.armors('./database/mhw/build/bot/armor_info.json', false);
  build.armorPieces('./database/mhw/build/bot/armor_piece_info.json', false);
  build.decorations('./database/mhw/build/bot/decoration_info.json', false);
  build.skills('./database/mhw/build/bot/skill_info.json', false);
  build.weapons(
    './database/mhw/build/bot/weapon_info.json',
    false,
    './src/json/weapons/weapons.json'
  );
});
