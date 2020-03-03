const rm = require('./router/RouteManager');

let monsterDB = require('./database/prebuilt/monsters.json');
let monsterMap = new Map();
let monsterHZVDB = require('./database/prebuilt/monsterhzvs.json');
let monsterHZVMap = new Map();

for (const i of Object.keys(monsterDB)) {
  monsterMap.set(monsterDB[i].name, monsterDB[i].details);
}

for (const i of Object.keys(monsterHZVDB)) {
  monsterHZVMap.set(i, monsterHZVDB[i]);
}

let itemDB = require('./database/build/items.json');
let itemMap = new Map();

for (const i of Object.keys(itemDB)) {
  itemMap.set(i, itemDB[i]);
}

let itemIDDB = require('./database/build/itemids.json');
let itemIDMap = new Map();

for (const i of Object.keys(itemIDDB)) {
  itemIDMap.set(itemIDDB[i].Name, itemIDDB[i]);
}

let armorDB = require('./database/build/armors.json');
let armorMap = new Map();

for (const i of Object.keys(armorDB)) {
  armorMap.set(i, armorDB[i]);
}

let weaponDB = require('./database/build/weapons.json');
let weaponMap = new Map();

for (const i of Object.keys(weaponDB)) {
  weaponMap.set(i, weaponDB[i]);
}

let decorationDB = require('./database/build/decorations.json');
let decorationMap = new Map();

for (const i of Object.keys(decorationDB)) {
  decorationMap.set(i, decorationDB[i]);
}

let skillDB = require('./database/build/skills.json');
let skillMap = new Map();

for (const i of Object.keys(skillDB)) {
  skillMap.set(i, skillDB[i]);
}

let questIDDB = require('./database/build/questids.json');

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

const userAccounts = require('./auth/accounts.json');
const accounts = new Map();
for (const i of Object.keys(userAccounts)) {
  accounts.set(i, userAccounts[i]);
}

class App {
  deploy() {
    // Create a new router with a port of 8080 and the static assets folder to "public"
    rm.makeRouter(8080, 'public');

    /* ## USER DEFINED ## */
    // Adding the main homepage router
    rm.addRoute('/', 'main.ejs', function(render, res, req) {
      req.render(render, {
        monsterArray: monsterArray,
        weaponArray: weaponArray,
        armorArray: armorArray,
        skillArray: skillArray,
        itemArray: itemArray,
        decorationArray: decorationArray
      });
    });

    // List all monsters on /monsters
    rm.addRoute('/monsters', 'pages/monsters.ejs', function(render, res, req) {
      req.render(render, {
        MONSTER_MAP: monsterMap,
        monsterArray: monsterArray,
        weaponArray: weaponArray,
        armorArray: armorArray,
        skillArray: skillArray,
        itemArray: itemArray,
        decorationArray: decorationArray
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
          monsterArray: monsterArray,
          weaponArray: weaponArray,
          armorArray: armorArray,
          skillArray: skillArray,
          itemArray: itemArray,
          decorationArray: decorationArray
        });
      }
    });

    rm.addRoute('/items', 'pages/items.ejs', function(render, res, req) {
      req.render(render, {
        ITEM_MAP: itemMap,
        monsterArray: monsterArray,
        weaponArray: weaponArray,
        armorArray: armorArray,
        skillArray: skillArray,
        itemArray: itemArray,
        decorationArray: decorationArray
      });
    });

    rm.addRoute('/items/:id', 'pages/item.ejs', function(render, res, req) {
      if (itemMap.has(res.params.id)) {
        const item = itemMap.get(res.params.id);
        let itemID = ['no data provided'];
        if (itemIDMap.has(item.name)) {
          itemID = itemIDMap.get(item.name);
        }

        req.render(render, {
          ITEM_NAME: item.name,
          ITEM_DESCRIPTION: item.description,
          ITEM_RARITY: item.rarity,
          ITEM_CARRYLIMIT: item.carryLimit,
          ITEM_VALUE: item.value,
          ITEM_ID: itemID,
          monsterArray: monsterArray,
          weaponArray: weaponArray,
          armorArray: armorArray,
          skillArray: skillArray,
          itemArray: itemArray,
          decorationArray: decorationArray
        });
      }
    });

    rm.addRoute('/armors', 'pages/armors.ejs', function(render, res, req) {
      req.render(render, {
        ARMOR_MAP: armorMap,
        monsterArray: monsterArray,
        weaponArray: weaponArray,
        armorArray: armorArray,
        skillArray: skillArray,
        itemArray: itemArray,
        decorationArray: decorationArray
      });
    });

    rm.addRoute('/armors/:id', 'pages/armor.ejs', function(render, res, req) {
      if (armorMap.has(res.params.id)) {
        const armor = armorMap.get(res.params.id);

        req.render(render, {
          ARMOR_NAME: armor.name,
          ARMOR_SETBONUS: armor.setBonus,
          ARMOR_DEFENSES: armor.defenses,
          ARMOR_RESISTANCES: armor.resistances,
          ARMOR_SKILLS: armor.skills,
          ARMOR_SLOTS: armor.slots,
          monsterArray: monsterArray,
          weaponArray: weaponArray,
          armorArray: armorArray,
          skillArray: skillArray,
          itemArray: itemArray,
          decorationArray: decorationArray
        });
      }
    });

    rm.addRoute('/weapons', 'pages/weapons.ejs', function(render, res, req) {
      req.render(render, {
        WEAPON_MAP: weaponMap,
        monsterArray: monsterArray,
        weaponArray: weaponArray,
        armorArray: armorArray,
        skillArray: skillArray,
        itemArray: itemArray,
        decorationArray: decorationArray
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
          monsterArray: monsterArray,
          weaponArray: weaponArray,
          armorArray: armorArray,
          skillArray: skillArray,
          itemArray: itemArray,
          decorationArray: decorationArray
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
        monsterArray: monsterArray,
        weaponArray: weaponArray,
        armorArray: armorArray,
        skillArray: skillArray,
        itemArray: itemArray,
        decorationArray: decorationArray
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
          DECORATION_NAME: decoration.name,
          DECORATION_RARITY: decoration.rarity,
          DECORATION_SLOT: decoration.slot,
          DECORATION_SKILLS: decoration.skills,
          monsterArray: monsterArray,
          weaponArray: weaponArray,
          armorArray: armorArray,
          skillArray: skillArray,
          itemArray: itemArray,
          decorationArray: decorationArray
        });
      }
    });

    rm.addRoute('/skills', 'pages/skills.ejs', function(render, res, req) {
      req.render(render, {
        SKILL_MAP: skillMap,
        monsterArray: monsterArray,
        weaponArray: weaponArray,
        armorArray: armorArray,
        skillArray: skillArray,
        itemArray: itemArray,
        decorationArray: decorationArray
      });
    });

    rm.addRoute('/skills/:id', 'pages/skill.ejs', function(render, res, req) {
      if (skillMap.has(res.params.id)) {
        const skill = skillMap.get(res.params.id);

        req.render(render, {
          SKILL_NAME: skill.name,
          SKILL_DESCRIPTION: skill.description,
          SKILL_RANKS: skill.ranks,
          monsterArray: monsterArray,
          weaponArray: weaponArray,
          armorArray: armorArray,
          skillArray: skillArray,
          itemArray: itemArray,
          decorationArray: decorationArray
        });
      }
    });

    rm.addRoute('/questids', 'pages/questids.ejs', function(render, res, req) {
      req.render(render, {
        QUESTID_MAP: questIDDB,
        monsterArray: monsterArray,
        weaponArray: weaponArray,
        armorArray: armorArray,
        skillArray: skillArray,
        itemArray: itemArray,
        decorationArray: decorationArray
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