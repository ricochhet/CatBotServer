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
  build.items('./databases/Game/MHW/Items.json');
  build.armors('./databases/Game/MHW/Armors.json');
  build.armorPieces('./databases/Game/MHW/ArmorPieces.json');
  build.decorations('./databases/Game/MHW/Decorations.json');
  build.skills('./databases/Game/MHW/Skills.json');
  build.weapons('./databases/Game/MHW/Weapons.json', './source/data/json');
});
