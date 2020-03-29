class WeaponsRoute {
  constructor(manager, utils) {
    this.manager = manager;
    this.utils = utils;
  }

  route(
    mhwIcons,
    weapon_map,
    mhwObjects,
    decorationNames,
    monsterNames,
    weaponNames,
    armorNames,
    skillNames,
    itemNames
  ) {
    const self = this;
    this.manager.addRoute('/mhw/weapons', 'pages/weapon_list.ejs', function(
      render,
      req,
      res
    ) {
      let id = req.query.id;
      if (id == null || (id > 14 && id < 0)) {
        id = 0;
      }

      const weapon_array = [];
      for (let [k, v] of weapon_map) {
        const weapon = weapon_map.get(k);
        weapon_array.push(weapon);
      }

      const filtered_great_sword = self.utils.search(
        weapon_array,
        'type',
        'great-sword'
      );
      const filtered_sword_and_shield = self.utils.search(
        weapon_array,
        'type',
        'sword-and-shield'
      );
      const filtered_dual_blades = self.utils.search(
        weapon_array,
        'type',
        'dual-blades'
      );
      const filtered_long_sword = self.utils.search(
        weapon_array,
        'type',
        'long-sword'
      );
      const filtered_hunting_horn = self.utils.search(
        weapon_array,
        'type',
        'hunting-horn'
      );
      const filtered_gunlance = self.utils.search(
        weapon_array,
        'type',
        'gunlance'
      );
      const filtered_switch_axe = self.utils.search(
        weapon_array,
        'type',
        'switch-axe'
      );
      const filtered_charge_blade = self.utils.search(
        weapon_array,
        'type',
        'charge-blade'
      );
      const filtered_insect_glaive = self.utils.search(
        weapon_array,
        'type',
        'insect-glaive'
      );
      const filtered_heavy_bowgun = self.utils.search(
        weapon_array,
        'type',
        'heavy-bowgun'
      );
      const filtered_light_bowgun = self.utils.search(
        weapon_array,
        'type',
        'light-bowgun'
      );
      const filtered_bow = self.utils.search(weapon_array, 'type', 'bow');
      const filtered_lance = self.utils.search(weapon_array, 'type', 'lance');
      const filtered_hammer = self.utils.search(weapon_array, 'type', 'hammer');
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
        ICON_MAP: mhwIcons,
        WEAPON_MAP: weapon_list[id],
        MHW_OBJECTS: mhwObjects,
        MHW_DECO_ARRAY: decorationNames,
        MHW_MONSTER_ARRAY: monsterNames,
        MHW_WEAPON_ARRAY: weaponNames,
        MHW_ARMOR_ARRAY: armorNames,
        MHW_SKILL_ARRAY: skillNames,
        MHW_ITEM_ARRAY: itemNames
      });
    });

    this.manager.addRoute('/mhw/weapons/:id', 'pages/weapon_info.ejs', function(
      render,
      req,
      res
    ) {
      if (weapon_map.has(req.params.id)) {
        const weapon = weapon_map.get(req.params.id);
        let coatingArray = '-';
        if (Array.isArray(weapon.coatings) && weapon.coatings.length > 0) {
          coatingArray = weapon.coatings.join('<br>');
        } else {
          coatingArray = weapon.coatings;
        }

        res.render(render, {
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
          MHW_OBJECTS: mhwObjects,
          MHW_DECO_ARRAY: decorationNames,
          MHW_MONSTER_ARRAY: monsterNames,
          MHW_WEAPON_ARRAY: weaponNames,
          MHW_ARMOR_ARRAY: armorNames,
          MHW_SKILL_ARRAY: skillNames,
          MHW_ITEM_ARRAY: itemNames
        });
      } else {
        res.render('errors/404.ejs');
      }
    });
  }
}

module.exports = new WeaponsRoute();
