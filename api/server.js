const manager = require('./router');
const utils = require('../data/tools/utils');

let monster_map = utils.buildMap(
  './data/build/def/monsters.json',
  {
    extended: true,
    extraProp: true
  },
  'name',
  'details'
);

let monster_hzv_map = utils.buildMap('./data/python/hitzones.json');
let monster_enrage_map = utils.buildMap('./data/python/enrage.json');
let item_map = utils.buildMap('./data/build/api/items.json');
let item_id_map = utils.buildMap(
  './data/build/api/itemids.json',
  {
    extended: true
  },
  'Name'
);

let armor_map = utils.buildMap('./data/build/api/armors.json');
let weapon_map = utils.buildMap('./data/build/api/weapons.json');
let decoration_map = utils.buildMap('./data/build/api/decorations.json');
let skill_map = utils.buildMap('./data/build/api/skills.json');
let quest_id_database = require('../data/build/api/questids.json');
let accounts_map = utils.buildMap('./auth/accounts.json');
let mhwWeaponUsage = utils.buildMap('./data/build/def/weaponusage.json');
let siegeEvents = require('../data/build/def/siegeevents.json');
let monsterNames = utils.buildArray(monster_map, 'title');
let weaponNames = utils.buildArray(weapon_map, 'name');
let armorNames = utils.buildArray(armor_map, 'name');
let skillNames = utils.buildArray(skill_map, 'name');
let itemNames = utils.buildArray(item_map, 'name');
let decorationNames = utils.buildArray(decoration_map, 'name');
let mhwObjects = [
  ...decorationNames.toString().split(','),
  ...monsterNames.toString().split(','),
  ...weaponNames.toString().split(','),
  ...armorNames.toString().split(','),
  ...skillNames.toString().split(','),
  ...itemNames.toString().split(',')
];

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

const admin = require('./routes/admin');
const monsters = require('./routes/monsters');
const items = require('./routes/items');
const armors = require('./routes/armors');
const weapons = require('./routes/weapons');
const decorations = require('./routes/decorations');
const skills = require('./routes/skills');
const quests = require('./routes/quests');

class Server {
  run(port) {
    manager.makeRouter(port, 'public');
    manager.addRoute('/', 'main.ejs', function(render, req, res) {
      const data = mhwWeaponUsage.get('2020');
      res.render(render, {
        MHW_SIEGE_EVENTS: siegeEvents,
        MHW_WEAPON_USAGE: data,
        MHW_OBJECTS: mhwObjects,
        MHW_DECO_ARRAY: decorationNames,
        MHW_MONSTER_ARRAY: monsterNames,
        MHW_WEAPON_ARRAY: weaponNames,
        MHW_ARMOR_ARRAY: armorNames,
        MHW_SKILL_ARRAY: skillNames,
        MHW_ITEM_ARRAY: itemNames
      });
    });

    monsters.manager = manager;
    monsters.route(
      monster_map,
      monster_hzv_map,
      monster_enrage_map,
      mhwObjects,
      decorationNames,
      monsterNames,
      weaponNames,
      armorNames,
      skillNames,
      itemNames
    );

    items.manager = manager;
    items.route(
      mhwIcons,
      item_map,
      item_id_map,
      mhwObjects,
      decorationNames,
      monsterNames,
      weaponNames,
      armorNames,
      skillNames,
      itemNames
    );

    armors.manager = manager;
    armors.route(
      mhwIcons,
      armor_map,
      mhwObjects,
      decorationNames,
      monsterNames,
      weaponNames,
      armorNames,
      skillNames,
      itemNames
    );

    weapons.manager = manager;
    weapons.utils = utils;
    weapons.route(
      mhwIcons,
      weapon_map,
      mhwObjects,
      decorationNames,
      monsterNames,
      weaponNames,
      armorNames,
      skillNames,
      itemNames
    );

    decorations.manager = manager;
    decorations.route(
      mhwIcons,
      decoration_map,
      mhwObjects,
      decorationNames,
      monsterNames,
      weaponNames,
      armorNames,
      skillNames,
      itemNames
    );

    skills.manager = manager;
    skills.route(
      mhwIcons,
      skill_map,
      mhwObjects,
      decorationNames,
      monsterNames,
      weaponNames,
      armorNames,
      skillNames,
      itemNames
    );

    quests.manager = manager;
    quests.route(
      mhwIcons,
      quest_id_database,
      mhwObjects,
      decorationNames,
      monsterNames,
      weaponNames,
      armorNames,
      skillNames,
      itemNames
    );

    admin.manager = manager;
    admin.route(accounts_map);
    manager.handleErrors();
  }
}

module.exports = Server;