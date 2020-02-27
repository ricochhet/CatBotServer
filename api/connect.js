const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const router = express.Router();

/* API MAPS */
let monsterDB = require('./database/monsters.json');
let monsterMap = new Map();
let monsterHZVDB = require('./database/monsterhzvs.json');
let monsterHZVMap = new Map();

for (const i of Object.keys(monsterDB)) {
  monsterMap.set(monsterDB[i].name, monsterDB[i].details);
}

for (const i of Object.keys(monsterHZVDB)) {
  monsterHZVMap.set(i, monsterHZVDB[i]);
}

let itemDB = require('./database/items.json');
let itemMap = new Map();

for (const i of Object.keys(itemDB)) {
  itemMap.set(i, itemDB[i]);
}

let itemIDDB = require('./database/itemids.json');
let itemIDMap = new Map();

for (const i of Object.keys(itemIDDB)) {
  itemIDMap.set(itemIDDB[i].Name, itemIDDB[i]);
}

let armorDB = require('./database/armors.json');
let armorMap = new Map();

for (const i of Object.keys(armorDB)) {
  armorMap.set(i, armorDB[i]);
}

let weaponDB = require('./database/weapons.json');
let weaponMap = new Map();

for (const i of Object.keys(weaponDB)) {
  weaponMap.set(i, weaponDB[i]);
}

let decorationDB = require('./database/decorations.json');
let decorationMap = new Map();

for (const i of Object.keys(decorationDB)) {
  decorationMap.set(i, decorationDB[i]);
}

let skillDB = require('./database/skills.json');
let skillMap = new Map();

for (const i of Object.keys(skillDB)) {
  skillMap.set(i, skillDB[i]);
}

let questIDDB = require('./database/questids.json');

module.exports = {
  express,
  app,
  http,
  bodyParser,
  connect: function(
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
      getSkills: 'pages/skill.ejs',

      listQuestIDs: 'pages/questids.ejs'
    },
    staticName,
    port
  ) {
    http.listen(`${port}`, function() {
      console.log('Listening on *:' + port);
    });

    let monsterArray = [];
    for (let [k, v] of monsterMap) {
      const monster = monsterMap.get(k);
      monsterArray.push(monster.title);
    }

    let weaponArray = [];
    for (let [k, v] of weaponMap) {
      const weapon = weaponMap.get(k);
      weaponArray.push(weapon.name);
    }

    let armorArray = [];
    for (let [k, v] of armorMap) {
      const armor = armorMap.get(k);
      armorArray.push(armor.name);
    }

    let skillArray = [];
    for (let [k, v] of skillMap) {
      const skill = skillMap.get(k);
      skillArray.push(skill.name);
    }

    let itemArray = [];
    for (let [k, v] of itemMap) {
      const item = itemMap.get(k);
      itemArray.push(item.name);
    }

    let decorationArray = [];
    for (let [k, v] of decorationMap) {
      const decoration = decorationMap.get(k);
      decorationArray.push(decoration.name);
    }

    router.get(`/`, (res, req, next) => {
      req.render(renders.main, {
        monsterArray: monsterArray,
        weaponArray: weaponArray,
        armorArray: armorArray,
        skillArray: skillArray,
        itemArray: itemArray,
        decorationArray: decorationArray
      });
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
          MONSTER_ELEMENTS: monsterElements.split('\n').join('<br>'),
          MONSTER_AILMENTS: monsterAilments.split('\n').join('<br>'),
          MONSTER_BLIGHTS: monsterBlights.split('\n').join('<br>'),
          MONSTER_LOCATIONS: monsterLocations.split('\n').join('<br>'),
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
        let itemID = ['no data provided'];
        if (itemIDMap.has(item.name)) {
          itemID = itemIDMap.get(item.name);
        }

        req.render(renders.getItem, {
          ITEM_NAME: item.name,
          ITEM_DESCRIPTION: item.description,
          ITEM_RARITY: item.rarity,
          ITEM_CARRYLIMIT: item.carryLimit,
          ITEM_VALUE: item.value,
          ITEM_ID: itemID
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

        req.render(renders.getArmor, {
          ARMOR_NAME: armor.name,
          ARMOR_SETBONUS: armor.setBonus,
          ARMOR_DEFENSES: armor.defenses,
          ARMOR_RESISTANCES: armor.resistances,
          ARMOR_SKILLS: armor.skills,
          ARMOR_SLOTS: armor.slots
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

        let coatingArray = '-';
        if (Array.isArray(weapon.coatings) && weapon.coatings.length > 0) {
          coatingArray = weapon.coatings.join('<br>');
        } else {
          coatingArray = weapon.coatings;
        }

        req.render(renders.getWeapon, {
          WEAPON_NAME: weapon.name,
          WEAPON_TYPE: weapon.type,
          WEAPON_RARITY: weapon.rarity,
          WEAPON_DISPLAYATTACK: weapon.displayAttack,
          WEAPON_RAWATTACK: weapon.rawAttack,
          WEAPON_DMGTYPE: weapon.damageType,
          WEAPON_AFFINITY: weapon.affinity,
          WEAPON_DEFENSE: weapon.defense,
          WEAPON_SHARPNESS: weapon.sharpness,
          WEAPON_ELDERSEAL: weapon.elderseal,
          WEAPON_SHELLING: weapon.shelling,
          WEAPON_SPECIALAMMO: weapon.specialAmmo,
          WEAPON_DEVIATION: weapon.deviation,
          WEAPON_AMMOS: weapon.ammos,
          WEAPON_ELEMENTS: weapon.elements,
          WEAPON_SLOTS: weapon.slots,
          WEAPON_COATINGS: coatingArray
        });
      }
    });

    router.get('/decorations', (res, req, next) => {
      req.render(renders.listDecorations, {
        DECORATION_MAP: decorationMap
      });
    });

    router.get('/decorations/:id', (res, req, next) => {
      let modifiedParams = res.params.id;

      if (decorationMap.has(modifiedParams)) {
        const decoration = decorationMap.get(modifiedParams);

        req.render(renders.getDecorations, {
          DECORATION_NAME: decoration.name,
          DECORATION_RARITY: decoration.rarity,
          DECORATION_SLOT: decoration.slot,
          DECORATION_SKILLS: decoration.skills
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

        req.render(renders.getSkills, {
          SKILL_NAME: skill.name,
          SKILL_DESCRIPTION: skill.description,
          SKILL_RANKS: skill.ranks
        });
      }
    });

    router.get('/questids', (res, req, next) => {
      req.render(renders.listQuestIDs, {
        QUESTID_MAP: questIDDB
      });
    });

    app.use('/', router);
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(staticName));
  }
};
