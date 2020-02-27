const cmdLineArgs = process.argv.slice(2);

const connect = require('./api/connect');
const build = require('./api/build');

if (
  cmdLineArgs.includes('--rebuild-dbs') &&
  !cmdLineArgs.includes('--advanced')
) {
  return build.build(true, false);
} else if (
  cmdLineArgs.includes('--rebuild-dbs') &&
  cmdLineArgs.includes('--advanced')
) {
  return build.build(true, true);
}

connect.connect(
  {
    main: 'main.ejs',
    listMonster: 'pages/monsters.ejs',
    getMonster: 'pages/monster.ejs',

    listItem: 'pages/items.ejs',
    getItem: 'pages/item.ejs',

    listArmor: 'pages/armors.ejs',
    getArmor: 'pages/armor.ejs',

    listWeapon: 'pages/weapons.ejs',
    getWeapon: 'pages/weapon.ejs',

    listDecorations: 'pages/decorations.ejs',
    getDecorations: 'pages/decoration.ejs',

    listSkills: 'pages/skills.ejs',
    getSkills: 'pages/skill.ejs',

    listQuestIDs: 'pages/questids.ejs'
  },
  'assets',
  8080
);
