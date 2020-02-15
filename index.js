const EC = require('./assets/events/ExpressConnect');
EC.Connect(
  {
    main: 'main.ejs',
    listMonster: 'pages/monsters.ejs',
    getMonster: 'pages/monster.ejs'
  },
  'assets',
  8080
);
