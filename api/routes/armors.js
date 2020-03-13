class ArmorsRoute {
  constructor(manager) {
    this.manager = manager;
  }

  route(
    mhwIcons,
    armor_map,
    mhwObjects,
    decorationNames,
    monsterNames,
    weaponNames,
    armorNames,
    skillNames,
    itemNames
  ) {
    this.manager.addRoute('/armors', 'pages/armors.ejs', function(
      render,
      req,
      res
    ) {
      res.render(render, {
        ARMOR_MAP: armor_map,
        MHW_OBJECTS: mhwObjects,
        MHW_DECO_ARRAY: decorationNames,
        MHW_MONSTER_ARRAY: monsterNames,
        MHW_WEAPON_ARRAY: weaponNames,
        MHW_ARMOR_ARRAY: armorNames,
        MHW_SKILL_ARRAY: skillNames,
        MHW_ITEM_ARRAY: itemNames
      });
    });

    this.manager.addRoute('/armors/:id', 'pages/armor.ejs', function(
      render,
      req,
      res
    ) {
      if (armor_map.has(req.params.id)) {
        const armor = armor_map.get(req.params.id);
        res.render(render, {
          ICON_MAP: mhwIcons,
          ARMOR_NAME: armor.name,
          ARMOR_RANK: armor.rank,
          ARMOR_SETBONUS: armor.setBonus,
          ARMOR_DEFENSES: armor.defenses,
          ARMOR_RESISTANCES: armor.resistances,
          ARMOR_PIECES: armor.pieces,
          ARMOR_SKILLS: armor.skills,
          ARMOR_SLOTS: armor.slots,
          MHW_OBJECTS: mhwObjects,
          MHW_DECO_ARRAY: decorationNames,
          MHW_MONSTER_ARRAY: monsterNames,
          MHW_WEAPON_ARRAY: weaponNames,
          MHW_ARMOR_ARRAY: armorNames,
          MHW_SKILL_ARRAY: skillNames,
          MHW_ITEM_ARRAY: itemNames
        });
      }
    });
  }
}

module.exports = new ArmorsRoute();
