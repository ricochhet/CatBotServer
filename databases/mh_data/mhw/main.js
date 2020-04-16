const cmd = require('../../util/commandUtils');
const child_process = require('child_process').spawn;
const utils = require('../../util/mapUtils');
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
  build.armors('./database/mhw/build/armor_info.json');
  build.armorPieces('./database/mhw/build/armor_piece_info.json');
  build.decorations('./database/mhw/build/decoration_info.json');
  build.skills('./database/mhw/build/skill_info.json');
  build.weapons('./database/mhw/build/weapon_info.json', './source/data/json');
});
