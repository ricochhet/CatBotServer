class SkillsRoute {
  constructor(manager) {
    this.manager = manager;
  }

  route(
    mhwIcons,
    skill_map,
    mhwObjects,
    decorationNames,
    monsterNames,
    weaponNames,
    armorNames,
    skillNames,
    itemNames
  ) {
    this.manager.addRoute('/mhw/skills', 'pages/skill_list.ejs', function(
      render,
      req,
      res
    ) {
      res.render(render, {
        SKILL_MAP: skill_map,
        MHW_OBJECTS: mhwObjects,
        MHW_DECO_ARRAY: decorationNames,
        MHW_MONSTER_ARRAY: monsterNames,
        MHW_WEAPON_ARRAY: weaponNames,
        MHW_ARMOR_ARRAY: armorNames,
        MHW_SKILL_ARRAY: skillNames,
        MHW_ITEM_ARRAY: itemNames
      });
    });

    this.manager.addRoute('/mhw/skills/:id', 'pages/skill_info.ejs', function(
      render,
      req,
      res
    ) {
      if (skill_map.has(req.params.id)) {
        const skill = skill_map.get(req.params.id);
        res.render(render, {
          ICON_MAP: mhwIcons,
          SKILL_NAME: skill.name,
          SKILL_DESCRIPTION: skill.description,
          SKILL_RANKS: skill.ranks,
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

module.exports = new SkillsRoute();
