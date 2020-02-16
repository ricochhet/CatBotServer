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

let itemDB = require('../databases/items.json');
let itemMap = new Map();

for (const i of Object.keys(itemDB)) {
  itemMap.set(i, itemDB[i]);
}

let armorDB = require('../databases/armors.json');
let armorMap = new Map();

for (const i of Object.keys(armorDB)) {
  armorMap.set(i, armorDB[i]);
}

let weaponDB = require('../databases/weapons.json');
let weaponMap = new Map();

for (const i of Object.keys(weaponDB)) {
  weaponMap.set(i, weaponDB[i]);
}

let decorationDB = require('../databases/decorations.json');
let decorationMap = new Map();

for (const i of Object.keys(decorationDB)) {
  decorationMap.set(i, decorationDB[i]);
}

let skillDB = require('../databases/skills.json');
let skillMap = new Map();

for (const i of Object.keys(skillDB)) {
  skillMap.set(i, skillDB[i]);
}

module.exports = {
  express,
  app,
  http,
  bodyParser,
  Connect: function(
    renders = {
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
        if (monsterHZVMap.has(res.params.id)) {
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

    router.get('/items', (res, req, next) => {
      req.render(renders.listItem, {
        ITEM_MAP: itemMap
      });
    });

    router.get(`/items/:id`, (res, req, next) => {
      if (itemMap.has(res.params.id)) {
        const item = itemMap.get(res.params.id);

        req.render(renders.getItem, {
          ITEM_NAME: item.name,
          ITEM_DESCRIPTION: item.description,
          ITEM_RARITY: item.rarity,
          ITEM_CARRYLIMIT: item.carryLimit,
          ITEM_VALUE: item.value
        });
      }
    });

    router.get('/armors', (res, req, next) => {
      req.render(renders.listArmor, {
        ARMOR_MAP: armorMap
      });
    });

    router.get('/armors/:id', (res, req, next) => {
      if (armorMap.has(res.params.id)) {
        const armor = armorMap.get(res.params.id);
        const armorSkills = armor.skills.join(', ');

        req.render(renders.getArmor, {
          ARMOR_NAME: armor.name,
          ARMOR_SETBONUS: armor.setBonus,
          ARMOR_RESISTANCES: armor.resistances,
          ARMOR_SKILLS: armorSkills
        });
      }
    });

    router.get('/weapons', (res, req, next) => {
      req.render(renders.listWeapon, {
        WEAPON_MAP: weaponMap
      });
    });

    router.get('/weapons/:id', (res, req, next) => {
      if (weaponMap.has(res.params.id)) {
        const weapon = weaponMap.get(res.params.id);

        req.render(renders.getWeapon, {
          WEAPON_NAME: weapon.title,
          WEAPON_TYPE: weapon.type,
          WEAPON_ATTACK: weapon.attack,
          WEAPON_DEFENSE: weapon.defense,
          WEAPON_SHARPNESS: weapon.sharpness,
          WEAPON_AFFINITY: weapon.affinity,
          WEAPON_ELEMENTALATTACK: weapon.elementalattack,
          WEAPON_RARITY: weapon.rarity,
          WEAPON_GEMSLOTS: weapon.gemslots,
          WEAPON_WYVERNHEART: weapon.wyvernheart,
          WEAPON_PHIALS: weapon.phials,
          WEAPON_NOTES: weapon.notes
        });
      }
    });

    router.get('/decorations', (res, req, next) => {
      req.render(renders.listDecorations, {
        DECORATION_MAP: decorationMap
      });
    });

    router.get('/decorations/:id', (res, req, next) => {
      const modifiedParams = res.params.id.split('+').join('/');

      if (decorationMap.has(modifiedParams)) {
        const decoration = decorationMap.get(modifiedParams);
        const decorationSkills = decoration.skills.join(', ');

        req.render(renders.getDecorations, {
          DECORATION_NAME: decoration.name,
          DECORATION_RARITY: decoration.rarity,
          DECORATION_SLOT: decoration.slot,
          DECORATION_SKILLS: decorationSkills
        });
      }
    });

    router.get('/skills', (res, req, next) => {
      req.render(renders.listSkills, {
        SKILL_MAP: skillMap
      });
    });

    router.get('/skills/:id', (res, req, next) => {
      if (skillMap.has(res.params.id)) {
        const skill = skillMap.get(res.params.id);
        const skillRanks = skill.ranks.join(', ');

        req.render(renders.getSkills, {
          SKILL_NAME: skill.name,
          SKILL_DESCRIPTION: skill.description,
          SKILL_RANKS: skillRanks
        });
      }
    });

    app.use('/', router);
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(staticName));
  }
};
