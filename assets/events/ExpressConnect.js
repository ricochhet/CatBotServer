const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const router = express.Router();

/* API MAPS */
let monsterDB = require('../databases/monsters.json');
let monsterMap = new Map();
let monsterHZVDB = require('../databases/MHW-HZV/MHW-HZV.json');
let monsterHZVMap = new Map();

for (const i of Object.keys(monsterDB)) {
  monsterMap.set(monsterDB[i].name, monsterDB[i].details);
}

for (const i of Object.keys(monsterHZVDB)) {
  monsterHZVMap.set(i, monsterHZVDB[i]);
}

module.exports = {
  express,
  app,
  http,
  bodyParser,
  Connect: function(
    renders = { main: 'main.ejs', listMonster: 'pages/monsters.ejs', getMonster: 'pages/monster.ejs', },
    staticName,
    port
  ) {
    const server = http.listen(`${port}`, function() {
      console.log('Listening on *:' + port);
    });

    router.get(`/`, (res, req, next) => {
      req.render(renders.main);
    });

    router.get(`/monsters`, (res, req, next) => {
      req.render(renders.listMonster, {
        MONSTER_MAP: monsterMap
      });
    });

    router.get(`/monsters/:id`, (res, req, next) => {
      if (monsterMap.has(res.params.id)) {
        let hzv = ['no data provided'];
        if(monsterHZVMap.has(res.params.id)) {
          hzv = monsterHZVMap.get(res.params.id);
        }
        const monster = monsterMap.get(res.params.id);
        const monsterElements = monster.elements.split(':x:').join('❌');
        const monsterAilments = monster.ailments.split(':x:').join('❌');
        const monsterBlights = monster.blights.split(':x:').join('❌');
        const monsterLocations = monster.locations.split(':x:').join('❌');

        req.render(renders.getMonster, {
          MONSTER_NAME: monster.title,
          MONSTER_DESCRIPTION: monster.description,
          MONSTER_ICON: monster.thumbnail,
          MONSTER_ELEMENTS: monsterElements,
          MONSTER_AILMENTS: monsterAilments,
          MONSTER_BLIGHTS: monsterBlights,
          MONSTER_LOCATIONS: monsterLocations,
          MONSTER_INFO: monster.info,
          MONSTER_HZV_SLASH: monster.hzv.slash,
          MONSTER_HZV_BLUNT: monster.hzv.blunt,
          MONSTER_HZV_SHOT: monster.hzv.shot,
          MONSTER_HZV_FIRE: monster.hzv.fire,
          MONSTER_HZV_WATER: monster.hzv.water,
          MONSTER_HZV_THUNDER: monster.hzv.thunder,
          MONSTER_HZV_ICE: monster.hzv.ice,
          MONSTER_HZV_DRAGON: monster.hzv.dragon,
          MONSTER_HZV_DATA: hzv
        });
      }
    });

    app.use('/', router);
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(staticName));
  }
};
