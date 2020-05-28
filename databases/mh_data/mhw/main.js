const cmd = require('../../../tools/utils/commandUtils');
const child_process = require('child_process').spawn;
const dataUtils = require('../../../tools/utils/dataUtils');
const build = require('./build');

cmd.command(['--convert'], function () {
  dataUtils.bulkConvertCSVs([
    {
      input: './databases/mh_data/mhw/source/data/csv/weapons',
      output: './databases/mh_data/mhw/source/data/json/weapons'
    }
  ]);
});

cmd.command(['--build'], function () {
  child_process('python', ['./databases/mh_data/mhw/main.py']);
  build.items('./databases/mh_data/mhw/build/item_info.json');
  build.armors('./databases/mh_data/mhw/build/armor_info.json');
  build.armorPieces('./databases/mh_data/mhw/build/armor_piece_info.json');
  build.decorations('./databases/mh_data/mhw/build/decoration_info.json');
  build.skills('./databases/mh_data/mhw/build/skill_info.json');
  build.weapons('./databases/mh_data/mhw/build/weapon_info.json', './source/data/json');
});
