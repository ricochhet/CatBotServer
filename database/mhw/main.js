const cmd = require('../libraries/commandUtils');
const child_process = require('child_process').spawn;
const utils = require('../../util/mapUtil');
const build = require('./build');
cmd.command(['--convert'], function () {
  utils.bulkConvertCSVs([
    {
      input: './database/mhw/source/data/csv/weapons',
      output: './database/mhw/source/data/json/weapons'
    }
  ]);
});
cmd.command(['--build'], function () {
  child_process('python', ['./database/mhw/main.py']);
  build.items('./database/mhw/build/item_info.json');
  build.armors('./database/mhw/build/armor_info.json', true);
  build.armorPieces('./database/mhw/build/armor_piece_info.json', true);
  build.decorations('./database/mhw/build/decoration_info.json', true);
  build.skills('./database/mhw/build/skill_info.json', true);
  build.weapons(
    './database/mhw/build/weapon_info.json',
    true,
    './source/data/json'
  );
});
