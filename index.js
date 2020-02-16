const EC = require('./assets/events/ExpressConnect');
EC.Connect(
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
    getSkills: 'pages/skill.ejs'
  },
  'assets',
  8080
);
