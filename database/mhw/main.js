const cmd = require('../libraries/commandUtils');
const child_process = require('child_process').spawn;

const Merge = require('./merge');
const merge = new Merge('./src/source_json');

const utils = require('../../util/mapUtil');
const build = require('./build');

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

cmd.command(['--build'], function () {
  child_process('python', ['./database/mhw/main.py']);

  build.items(
    './database/mhw/build/item_info.json',
    './src/json/items/items.json'
  );
  build.armors('./database/mhw/build/armor_info.json', true);
  build.armorPieces('./database/mhw/build/armor_piece_info.json', true);
  build.decorations('./database/mhw/build/decoration_info.json', true);
  build.skills('./database/mhw/build/skill_info.json', true);
  build.weapons(
    './database/mhw/build/weapon_info.json',
    true,
    './src/json/weapons/weapons.json'
  );
});
