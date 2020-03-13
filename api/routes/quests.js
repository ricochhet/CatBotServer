class QuestsRoute {
  constructor(manager) {
    this.manager = manager;
  }

  route(
    mhwIcons,
    quest_id_database,
    mhwObjects,
    decorationNames,
    monsterNames,
    weaponNames,
    armorNames,
    skillNames,
    itemNames
  ) {
    this.manager.addRoute('/questids', 'pages/questids.ejs', function(
      render,
      req,
      res
    ) {
      res.render(render, {
        ICON_MAP: mhwIcons,
        QUESTID_MAP: quest_id_database,
        MHW_OBJECTS: mhwObjects,
        MHW_DECO_ARRAY: decorationNames,
        MHW_MONSTER_ARRAY: monsterNames,
        MHW_WEAPON_ARRAY: weaponNames,
        MHW_ARMOR_ARRAY: armorNames,
        MHW_SKILL_ARRAY: skillNames,
        MHW_ITEM_ARRAY: itemNames
      });
    });
  }
}

module.exports = new QuestsRoute();
