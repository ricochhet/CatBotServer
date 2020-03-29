class DecorationsRoute {
  constructor(manager) {
    this.manager = manager;
  }

  route(
    mhwIcons,
    decoration_map,
    mhwObjects,
    decorationNames,
    monsterNames,
    weaponNames,
    armorNames,
    skillNames,
    itemNames
  ) {
    this.manager.addRoute('/mhw/decorations', 'pages/decoration_list.ejs', function(
      render,
      req,
      res
    ) {
      res.render(render, {
        DECORATION_MAP: decoration_map,
        MHW_OBJECTS: mhwObjects,
        MHW_DECO_ARRAY: decorationNames,
        MHW_MONSTER_ARRAY: monsterNames,
        MHW_WEAPON_ARRAY: weaponNames,
        MHW_ARMOR_ARRAY: armorNames,
        MHW_SKILL_ARRAY: skillNames,
        MHW_ITEM_ARRAY: itemNames
      });
    });

    this.manager.addRoute('/mhw/decorations/:id', 'pages/decoration_info.ejs', function(
      render,
      req,
      res
    ) {
      let modifiedParams = req.params.id;

      if (decoration_map.has(modifiedParams)) {
        const decoration = decoration_map.get(modifiedParams);
        res.render(render, {
          ICON_MAP: mhwIcons,
          DECORATION_NAME: decoration.name,
          DECORATION_RARITY: decoration.rarity,
          DECORATION_SLOT: decoration.slot,
          DECORATION_SKILLS: decoration.skills,
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

module.exports = new DecorationsRoute();
