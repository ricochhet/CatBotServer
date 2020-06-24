const cmd = require('./utils/commandUtils');
const child_process = require('child_process').spawn;
const dataUtils = require('./utils/dataUtils');
const build = require('./build');

cmd.command(['--convert'], function () {
  dataUtils.bulkConvertCSVs([
    {
      input: './update-mh/source/data/csv/weapons',
      output: './update-mh/source/data/json/weapons'
    }
  ]);
});

cmd.command(['--build'], function () {
  child_process('python', ['./update-mh/main.py']);
  build.items('./databases/mh_data/mhw/item_info.json');
  build.armors('./databases/mh_data/mhw/armor_info.json');
  build.armorPieces('./databases/mh_data/mhw/armor_piece_info.json');
  build.decorations('./databases/mh_data/mhw/decoration_info.json');
  build.skills('./databases/mh_data/mhw/skill_info.json');
  build.weapons('./databases/mh_data/mhw/weapon_info.json', './source/data/json');
});
