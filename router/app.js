const rm = require('./RouteManager');

let monsterDB = require('../database/build/def/monsters.json');
let monsterMap = new Map();
let monsterHZVDB = require('../database/build/def/monsterhzvs.json');
let monsterHZVMap = new Map();

for (const i of Object.keys(monsterDB)) {
  monsterMap.set(monsterDB[i].name, monsterDB[i].details);
}

for (const i of Object.keys(monsterHZVDB)) {
  monsterHZVMap.set(i, monsterHZVDB[i]);
}

let itemDB = require('../database/build/api/items.json');
let itemMap = new Map();

for (const i of Object.keys(itemDB)) {
  itemMap.set(i, itemDB[i]);
}

let itemIDDB = require('../database/build/api/itemids.json');
let itemIDMap = new Map();

for (const i of Object.keys(itemIDDB)) {
  itemIDMap.set(itemIDDB[i].Name, itemIDDB[i]);
}

let armorDB = require('../database/build/api/armors.json');
let armorMap = new Map();

for (const i of Object.keys(armorDB)) {
  armorMap.set(i, armorDB[i]);
}

let weaponDB = require('../database/build/api/weapons.json');
let weaponMap = new Map();

for (const i of Object.keys(weaponDB)) {
  weaponMap.set(i, weaponDB[i]);
}

let decorationDB = require('../database/build/api/decorations.json');
let decorationMap = new Map();

for (const i of Object.keys(decorationDB)) {
  decorationMap.set(i, decorationDB[i]);
}

let skillDB = require('../database/build/api/skills.json');
let skillMap = new Map();

for (const i of Object.keys(skillDB)) {
  skillMap.set(i, skillDB[i]);
}

let questIDDB = require('../database/build/api/questids.json');

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

let mhwObjects = [
  ...decorationArray.toString().split(','),
  ...monsterArray.toString().split(','),
  ...weaponArray.toString().split(','),
  ...armorArray.toString().split(','),
  ...skillArray.toString().split(','),
  ...itemArray.toString().split(',')
];

const userAccounts = require('../auth/accounts.json');
const accounts = new Map();
for (const i of Object.keys(userAccounts)) {
  accounts.set(i, userAccounts[i]);
}

const mhwIcons = new Map([
  ['hammer', '../icons/equipment/ic_equipment_hammer_base.svg'],
  ['great-sword', '../icons/equipment/ic_equipment_greatsword_base.svg'],
  ['hunting-horn', '../icons/equipment/ic_equipment_hunting_horn_base.svg'],
  ['charge-blade', '../icons/equipment/ic_equipment_charge_blade_base.svg'],
  ['switch-axe', '../icons/equipment/ic_equipment_switch_axe_base.svg'],
  ['long-sword', '../icons/equipment/ic_equipment_longsword_base.svg'],
  ['insect-glaive', '../icons/equipment/ic_equipment_insect_glaive_base.svg'],
  ['lance', '../icons/equipment/ic_equipment_lance_base.svg'],
  ['gunlance', '../icons/equipment/ic_equipment_gunlance_base.svg'],
  ['heavy-bowgun', '../icons/equipment/ic_equipment_heavy_bowgun_base.svg'],
  [
    'sword-and-shield',
    '../icons/equipment/ic_equipment_sword_and_shield_base.svg'
  ],
  ['dual-blades', '../icons/equipment/ic_equipment_dual_blades_base.svg'],
  ['light-bowgun', '../icons/equipment/ic_equipment_light_bowgun_base.svg'],
  ['bow', '../icons/equipment/ic_equipment_bow_base.svg'],

  ['whetstone', '../icons/ui/ic_ui_whetstone.svg'],
  ['element', '../icons/ui/ic_ui_element.svg'],
  ['ammo', '../icons/items/ic_items_ammo_base.svg'],
  ['crafting', '../icons/ui/ic_ui_crafting_base.svg'],
  ['attack', '../icons/ui/ic_ui_attack.svg'],
  ['affinity', '../icons/ui/ic_ui_affinity.svg'],
  ['defense', '../icons/ui/ic_ui_defense.svg'],
  ['elderseal', '../icons/ui/ic_ui_elderseal.svg'],
  ['shelling', '../icons/ui/ic_ui_shelling.svg'],
  ['specialAmmo', '../icons/ui/ic_ui_special_ammo.svg'],
  ['deviation', '../icons/ui/ic_ui_deviation.svg'],

  ['head', '../icons/equipment/ic_equipment_head_base.svg'],
  ['skills', '../icons/ui/ic_ui_armor_skill_base.svg'],
  ['setBonus', '../icons/ui/ic_ui_set_bonus_base.svg'],
  ['slots', '../icons/ui/ic_ui_slots.svg'],
  ['rank', '../icons/ui/ic_ui_hunter_rank.svg'],
  ['itembox', '../icons/ui/ic_ui_item_box.svg'],
  ['bookmark', '../icons/ui/ic_ui_bookmark.svg']
]);

class App {
  deploy() {
    // Create a new router with a port of 8080 and the static assets folder to "public"
    rm.makeRouter(8080, 'public');

    /* ## USER DEFINED ## */
    // Adding the main homepage router
    rm.addRoute('/', 'main.ejs', function(render, res, req) {
      req.render(render, {
        MHW_OBJECTS: mhwObjects
      });
    });

    // List all monsters on /monsters
    rm.addRoute('/monsters', 'pages/monsters.ejs', function(render, res, req) {
      req.render(render, {
        MONSTER_MAP: monsterMap,
        MHW_OBJECTS: mhwObjects
      });
    });

    // Get specific monster via id
    rm.addRoute('/monsters/:id', 'pages/monster.ejs', function(
      render,
      res,
      req
    ) {
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

        req.render(render, {
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
          MONSTER_HZV_DATA: hzv,
          MHW_OBJECTS: mhwObjects
        });
      }
    });

    rm.addRoute('/items', 'pages/items.ejs', function(render, res, req) {
      req.render(render, {
        ITEM_MAP: itemMap,
        MHW_OBJECTS: mhwObjects
      });
    });

    rm.addRoute('/items/:id', 'pages/item.ejs', function(render, res, req) {
      if (itemMap.has(res.params.id)) {
        const item = itemMap.get(res.params.id);
        let itemID = ['no data provided'];
        if (itemIDMap.has(item.name)) {
          itemID = itemIDMap.get(item.name);
        } else {
          itemID = {
            Id: '-',
            Type: '-'
          };
        }

        req.render(render, {
          ICON_MAP: mhwIcons,
          ITEM_NAME: item.name,
          ITEM_DESCRIPTION: item.description,
          ITEM_RARITY: item.rarity,
          ITEM_CARRYLIMIT: item.carryLimit,
          ITEM_BUY: item.buy,
          ITEM_VALUE: item.value,
          ITEM_ID: itemID,
          MHW_OBJECTS: mhwObjects
        });
      }
    });

    rm.addRoute('/armors', 'pages/armors.ejs', function(render, res, req) {
      req.render(render, {
        ARMOR_MAP: armorMap,
        MHW_OBJECTS: mhwObjects
      });
    });

    rm.addRoute('/armors/:id', 'pages/armor.ejs', function(render, res, req) {
      if (armorMap.has(res.params.id)) {
        const armor = armorMap.get(res.params.id);

        req.render(render, {
          ICON_MAP: mhwIcons,
          ARMOR_NAME: armor.name,
          ARMOR_RANK: armor.rank,
          ARMOR_SETBONUS: armor.setBonus,
          ARMOR_DEFENSES: armor.defenses,
          ARMOR_RESISTANCES: armor.resistances,
          ARMOR_PIECES: armor.pieces,
          ARMOR_SKILLS: armor.skills,
          ARMOR_SLOTS: armor.slots,
          MHW_OBJECTS: mhwObjects
        });
      }
    });

    rm.addRoute('/weapons', 'pages/weapons.ejs', function(render, res, req) {
      req.render(render, {
        ICON_MAP: mhwIcons,
        WEAPON_MAP: weaponMap,
        MHW_OBJECTS: mhwObjects
      });
    });

    rm.addRoute('/weapons/:id', 'pages/weapon.ejs', function(render, res, req) {
      if (weaponMap.has(res.params.id)) {
        const weapon = weaponMap.get(res.params.id);

        let coatingArray = '-';
        if (Array.isArray(weapon.coatings) && weapon.coatings.length > 0) {
          coatingArray = weapon.coatings.join('<br>');
        } else {
          coatingArray = weapon.coatings;
        }

        req.render(render, {
          ICON_MAP: mhwIcons,
          ICON: mhwIcons.get(weapon.type),
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
          WEAPON_COATINGS: coatingArray,
          WEAPON_CRAFTING: weapon.crafting,
          WEAPON_UPGRADE: weapon.upgrade,
          MHW_OBJECTS: mhwObjects
        });
      }
    });

    rm.addRoute('/decorations', 'pages/decorations.ejs', function(
      render,
      res,
      req
    ) {
      req.render(render, {
        DECORATION_MAP: decorationMap,
        MHW_OBJECTS: mhwObjects
      });
    });

    rm.addRoute('/decorations/:id', 'pages/decoration.ejs', function(
      render,
      res,
      req
    ) {
      let modifiedParams = res.params.id;

      if (decorationMap.has(modifiedParams)) {
        const decoration = decorationMap.get(modifiedParams);

        req.render(render, {
          ICON_MAP: mhwIcons,
          DECORATION_NAME: decoration.name,
          DECORATION_RARITY: decoration.rarity,
          DECORATION_SLOT: decoration.slot,
          DECORATION_SKILLS: decoration.skills,
          MHW_OBJECTS: mhwObjects
        });
      }
    });

    rm.addRoute('/skills', 'pages/skills.ejs', function(render, res, req) {
      req.render(render, {
        SKILL_MAP: skillMap,
        MHW_OBJECTS: mhwObjects
      });
    });

    rm.addRoute('/skills/:id', 'pages/skill.ejs', function(render, res, req) {
      if (skillMap.has(res.params.id)) {
        const skill = skillMap.get(res.params.id);

        req.render(render, {
          ICON_MAP: mhwIcons,
          SKILL_NAME: skill.name,
          SKILL_DESCRIPTION: skill.description,
          SKILL_RANKS: skill.ranks,
          MHW_OBJECTS: mhwObjects
        });
      }
    });

    rm.addRoute('/questids', 'pages/questids.ejs', function(render, res, req) {
      req.render(render, {
        ICON_MAP: mhwIcons,
        QUESTID_MAP: questIDDB,
        MHW_OBJECTS: mhwObjects
      });
    });

    // Adds a route for the initial login menu
    rm.addRoute('/admin', 'admin/login.ejs', function(render, res, req) {
      req.render(render);
    });

    // Extended route that takes in the auth utility and controls dashboard content
    rm.addExtendedRoute(
      '/admin/dashboard',
      'admin/dashboard.ejs',
      function(render, req, res, authObject) {
        res.render(render, {
          /* ## DATA ## */
          MONSTERS: JSON.stringify(monsterDB, null, 4)
        });
      },
      rm.addAuthUtil
    );

    // Deletes the current user session when the post request path has been initialized
    rm.addPost('/admin/logout', function(req, res) {
      delete req.session.user_id;
      res.redirect('/');
    });

    // Checks if the username and password is in the json and if it does exist, make a session
    rm.addPost('/admin/login', function(req, res) {
      const username = req.body.username;
      const password = req.body.password;

      for (let [k, v] of accounts) {
        const account = accounts.get(k);

        if (account.username == username && account.password == password) {
          req.session.user_id = username;
          res.redirect('/admin/dashboard');
          break;
        } else {
          res.redirect('/');
        }
      }
    });

    // Handles all errors and returns appropriate pages, must be placed at the bottom
    rm.handleErrors();
  }
}

// Export the app to module.exports
module.exports = new App();