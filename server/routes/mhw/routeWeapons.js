const manager = require('../../router');
const utils = require('../../../utils/utils');

class RouteWeapons {
  route(data, key) {
    manager
      .fetch(
        `http://localhost:8080/api/mhw/weapons?key=${key}`
      )
      .then(function(r) {
        const map = utils.buildMap(r, {
          raw: true
        }).map;

        manager.addRoute('/mhw/weapons', 'pages/mhw/weapon_list.ejs', function(
          render,
          req,
          res
        ) {
          let id = req.query.id;
          if (id == null || (id > 14 && id < 0)) {
            id = 0;
          }

          const weapon_array = [];
          for (let [k, v] of map) {
            const weapon = map.get(k);
            weapon_array.push(weapon);
          }

          const filtered_great_sword = utils.search(
            weapon_array,
            'type',
            'great-sword'
          );
          const filtered_sword_and_shield = utils.search(
            weapon_array,
            'type',
            'sword-and-shield'
          );
          const filtered_dual_blades = utils.search(
            weapon_array,
            'type',
            'dual-blades'
          );
          const filtered_long_sword = utils.search(
            weapon_array,
            'type',
            'long-sword'
          );
          const filtered_hunting_horn = utils.search(
            weapon_array,
            'type',
            'hunting-horn'
          );
          const filtered_gunlance = utils.search(
            weapon_array,
            'type',
            'gunlance'
          );
          const filtered_switch_axe = utils.search(
            weapon_array,
            'type',
            'switch-axe'
          );
          const filtered_charge_blade = utils.search(
            weapon_array,
            'type',
            'charge-blade'
          );
          const filtered_insect_glaive = utils.search(
            weapon_array,
            'type',
            'insect-glaive'
          );
          const filtered_heavy_bowgun = utils.search(
            weapon_array,
            'type',
            'heavy-bowgun'
          );
          const filtered_light_bowgun = utils.search(
            weapon_array,
            'type',
            'light-bowgun'
          );
          const filtered_bow = utils.search(weapon_array, 'type', 'bow');
          const filtered_lance = utils.search(weapon_array, 'type', 'lance');
          const filtered_hammer = utils.search(weapon_array, 'type', 'hammer');
          const weapon_list = [
            filtered_great_sword,
            filtered_sword_and_shield,
            filtered_dual_blades,
            filtered_long_sword,
            filtered_hunting_horn,
            filtered_gunlance,
            filtered_switch_axe,
            filtered_charge_blade,
            filtered_insect_glaive,
            filtered_heavy_bowgun,
            filtered_light_bowgun,
            filtered_bow,
            filtered_lance,
            filtered_hammer
          ];

          res.render(render, {
            ICON_MAP: data.icons,
            WEAPON_MAP: weapon_list[id],
            MHW_OBJECTS: data.objects,
            MHW_DECO_ARRAY: data.decoration_names,
            MHW_MONSTER_ARRAY: data.monster_names,
            MHW_WEAPON_ARRAY: data.weapon_names,
            MHW_ARMOR_ARRAY: data.armor_names,
            MHW_SKILL_ARRAY: data.skill_names,
            MHW_ITEM_ARRAY: data.item_names
          });
        });

        manager.addRoute(
          '/mhw/weapons/:id',
          'pages/mhw/weapon_info.ejs',
          function(render, req, res) {
            if (map.has(req.params.id)) {
              const weapon = map.get(req.params.id);
              let coatingArray = '-';
              if (
                Array.isArray(weapon.coatings) &&
                weapon.coatings.length > 0
              ) {
                coatingArray = weapon.coatings.join('<br>');
              } else {
                coatingArray = weapon.coatings;
              }

              let slotsArray = '-';
              if (Array.isArray(weapon.slots) && weapon.slots.length > 0) {
                let arr = [];

                for (const i in weapon.slots) {
                  arr.push(`Rank: ${weapon.slots[i].slots}`);
                }
                slotsArray = arr.join('<br>');
              } else {
                slotsArray = weapon.slots;
              }

              res.render(render, {
                ICON_MAP: data.icons,
                ICON: data.icons.get(weapon.type),
                WEAPON_NAME: weapon.name,
                WEAPON_TYPE: weapon.type,
                WEAPON_RARITY: weapon.rarity,
                WEAPON_DISPLAYATTACK: weapon.displayAttack,
                WEAPON_RAWATTACK: weapon.rawAttack,
                WEAPON_DMGTYPE: weapon.damageType,
                WEAPON_AFFINITY: weapon.affinity,
                WEAPON_DEFENSE: weapon.defense,
                WEAPON_SHARPNESS: weapon.sharpness[0],
                WEAPON_ELDERSEAL: weapon.elderseal,
                WEAPON_SHELLING: weapon.shelling[0],
                WEAPON_SPECIALAMMO: weapon.specialAmmo,
                WEAPON_DEVIATION: weapon.deviation,
                WEAPON_AMMOS: weapon.ammos,
                WEAPON_ELEMENTS: weapon.elements,
                WEAPON_SLOTS: slotsArray,
                WEAPON_COATINGS: coatingArray,
                WEAPON_CRAFTING: weapon.crafting,
                WEAPON_UPGRADE: weapon.upgrade,
                MHW_OBJECTS: data.objects,
                MHW_DECO_ARRAY: data.decoration_names,
                MHW_MONSTER_ARRAY: data.monster_names,
                MHW_WEAPON_ARRAY: data.weapon_names,
                MHW_ARMOR_ARRAY: data.armor_names,
                MHW_SKILL_ARRAY: data.skill_names,
                MHW_ITEM_ARRAY: data.item_names
              });
            } else {
              res.render('errors/404.ejs');
            }
          }
        );
      });
  }
}

module.exports = new RouteWeapons();
