const manager = require('./router');
const utils = require('../data/utils');

let monster_map = utils.buildMap(
  './data/build/def/monster_info.json',
  {
    extended: true,
    extraProp: true
  },
  'name',
  'details'
);

let item_map = utils.buildMap('./data/build/api/item_info.json');
let armor_map = utils.buildMap('./data/build/api/armor_info.json');
let weapon_map = utils.buildMap('./data/build/api/weapon_info.json');
let decoration_map = utils.buildMap('./data/build/api/decoration_info.json');
let skill_map = utils.buildMap('./data/build/api/skill_info.json');

let monsterNames = utils.buildArray(monster_map.map, 'title');
let weaponNames = utils.buildArray(weapon_map.map, 'name');
let armorNames = utils.buildArray(armor_map.map, 'name');
let skillNames = utils.buildArray(skill_map.map, 'name');
let itemNames = utils.buildArray(item_map.map, 'name');
let decorationNames = utils.buildArray(decoration_map.map, 'name');

let mhwObjects = [
  ...decorationNames.toString().split(','),
  ...monsterNames.toString().split(','),
  ...weaponNames.toString().split(','),
  ...armorNames.toString().split(','),
  ...skillNames.toString().split(','),
  ...itemNames.toString().split(',')
];

const mhwIcons = new Map([
  ['hammer', '/icons/equipment/ic_equipment_hammer_base.svg'],
  ['great-sword', '/icons/equipment/ic_equipment_greatsword_base.svg'],
  ['hunting-horn', '/icons/equipment/ic_equipment_hunting_horn_base.svg'],
  ['charge-blade', '/icons/equipment/ic_equipment_charge_blade_base.svg'],
  ['switch-axe', '/icons/equipment/ic_equipment_switch_axe_base.svg'],
  ['long-sword', '/icons/equipment/ic_equipment_longsword_base.svg'],
  ['insect-glaive', '/icons/equipment/ic_equipment_insect_glaive_base.svg'],
  ['lance', '/icons/equipment/ic_equipment_lance_base.svg'],
  ['gunlance', '/icons/equipment/ic_equipment_gunlance_base.svg'],
  ['heavy-bowgun', '/icons/equipment/ic_equipment_heavy_bowgun_base.svg'],
  [
    'sword-and-shield',
    '/icons/equipment/ic_equipment_sword_and_shield_base.svg'
  ],
  ['dual-blades', '/icons/equipment/ic_equipment_dual_blades_base.svg'],
  ['light-bowgun', '/icons/equipment/ic_equipment_light_bowgun_base.svg'],
  ['bow', '/icons/equipment/ic_equipment_bow_base.svg'],
  ['whetstone', '/icons/ui/ic_ui_whetstone.svg'],
  ['element', '/icons/ui/ic_ui_element.svg'],
  ['ammo', '/icons/items/ic_items_ammo_base.svg'],
  ['crafting', '/icons/ui/ic_ui_crafting_base.svg'],
  ['attack', '/icons/ui/ic_ui_attack.svg'],
  ['affinity', '/icons/ui/ic_ui_affinity.svg'],
  ['defense', '/icons/ui/ic_ui_defense.svg'],
  ['elderseal', '/icons/ui/ic_ui_elderseal.svg'],
  ['shelling', '/icons/ui/ic_ui_shelling.svg'],
  ['specialAmmo', '/icons/ui/ic_ui_special_ammo.svg'],
  ['deviation', '/icons/ui/ic_ui_deviation.svg'],
  ['head', '/icons/equipment/ic_equipment_head_base.svg'],
  ['skills', '/icons/ui/ic_ui_armor_skill_base.svg'],
  ['setBonus', '/icons/ui/ic_ui_set_bonus_base.svg'],
  ['slots', '/icons/ui/ic_ui_slots.svg'],
  ['rank', '/icons/ui/ic_ui_hunter_rank.svg'],
  ['itembox', '/icons/ui/ic_ui_item_box.svg'],
  ['bookmark', '/icons/ui/ic_ui_bookmark.svg']
]);

const api = require('./routes/mhw/api');
const config = require('./config.json');
const mhw_data = {
  icons: mhwIcons,
  objects: mhwObjects,
  decoration_names: decorationNames,
  monster_names: monsterNames,
  weapon_names: weaponNames,
  armor_names: armorNames,
  skill_names: skillNames,
  item_names: itemNames
};

const monsters = require('./routes/mhw/monsters');
const items = require('./routes/mhw/items');
const armors = require('./routes/mhw/armors');
const weapons = require('./routes/mhw/weapons');
const decorations = require('./routes/mhw/decorations');
const skills = require('./routes/mhw/skills');

class Server {
  run(port, opts = { handleErrors: true, }) {
    manager.makeRouter(port, 'public');

    manager.addRoute('/', 'main.ejs', function(render, req, res) {
      res.render(render, {
        MHW_OBJECTS: mhwObjects,
        MHW_DECO_ARRAY: decorationNames,
        MHW_MONSTER_ARRAY: monsterNames,
        MHW_WEAPON_ARRAY: weaponNames,
        MHW_ARMOR_ARRAY: armorNames,
        MHW_SKILL_ARRAY: skillNames,
        MHW_ITEM_ARRAY: itemNames
      });
    });

    api.manager = manager;
    api.config = config;
    api.armorRoute();
    api.decorationRoute();
    api.itemRoute();
    api.monsterRoute();
    api.skillRoute();
    api.weaponRoute();

    //armors.route(mhw_data);
    //decorations.route(mhw_data);
    //items.route(mhw_data);
    //monsters.route(mhw_data);
    //skills.route(mhw_data);
    weapons.route(mhw_data);

    if (opts.handleErrors) {
      manager.handleErrors();
    }
  }
}

module.exports = Server;