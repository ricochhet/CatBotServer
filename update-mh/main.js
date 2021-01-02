const cmd = require('./utils/commandUtils');
const child_process = require('child_process').spawn;
const dataUtils = require('./utils/dataUtils');
const build = require('./build');

cmd.command(['--convert'], function () {
  dataUtils.bulkConvertCSVs([
    {
      input: './update-mh/source/csv/weapons',
      output: './update-mh/source/json/weapons'
    }
  ]);
});

cmd.command(['--build'], function () {
  // child_process('python', ['./update-mh/main.py']);

  // This shouldn't be needed again, but it's here just in case
  build.monsters('./databases/Game/MHW/monster_data.json', './source/json');
  build.items('./databases/Game/MHW/item_data.json');
  build.armors('./databases/Game/MHW/armor_data.json');
  build.armorPieces('./databases/Game/MHW/armor_pieces_data.json');
  build.decorations('./databases/Game/MHW/decoration_data.json');
  build.skills('./databases/Game/MHW/skill_data.json');
  build.weapons('./databases/Game/MHW/weapon_data.json', './source/json');
});
