class ItemsRoute {
  constructor(manager) {
    this.manager = manager;
  }

  route(
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
  ) {
    this.manager.addRoute('/items', 'pages/items.ejs', function(
      render,
      req,
      res
    ) {
      res.render(render, {
        ITEM_MAP: item_map,
        MHW_OBJECTS: mhwObjects,
        MHW_DECO_ARRAY: decorationNames,
        MHW_MONSTER_ARRAY: monsterNames,
        MHW_WEAPON_ARRAY: weaponNames,
        MHW_ARMOR_ARRAY: armorNames,
        MHW_SKILL_ARRAY: skillNames,
        MHW_ITEM_ARRAY: itemNames
      });
    });

    this.manager.addRoute('/items/:id', 'pages/item.ejs', function(
      render,
      req,
      res
    ) {
      if (item_map.has(req.params.id)) {
        const item = item_map.get(req.params.id);
        let itemID = ['no data provided'];
        if (item_id_map.has(item.name)) {
          itemID = item_id_map.get(item.name);
        } else {
          itemID = {
            Id: '-',
            Type: '-'
          };
        }

        res.render(render, {
          ICON_MAP: mhwIcons,
          ITEM_NAME: item.name,
          ITEM_DESCRIPTION: item.description,
          ITEM_RARITY: item.rarity,
          ITEM_CARRYLIMIT: item.carryLimit,
          ITEM_BUY: item.buy,
          ITEM_VALUE: item.value,
          ITEM_ID: itemID,
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

module.exports = new ItemsRoute();
