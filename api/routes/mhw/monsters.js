class MonstersRoute {
  constructor(manager) {
    this.manager = manager;
  }

  route(
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
  ) {
    this.manager.addRoute('/mhw/monsters', 'pages/monster_list.ejs', function(
      render,
      req,
      res
    ) {
      res.render(render, {
        MONSTER_MAP: monster_map,
        MHW_OBJECTS: mhwObjects,
        MHW_DECO_ARRAY: decorationNames,
        MHW_MONSTER_ARRAY: monsterNames,
        MHW_WEAPON_ARRAY: weaponNames,
        MHW_ARMOR_ARRAY: armorNames,
        MHW_SKILL_ARRAY: skillNames,
        MHW_ITEM_ARRAY: itemNames
      });
    });

    // Get specific monster via id
    this.manager.addRoute('/mhw/monsters/:id', 'pages/monster_info.ejs', function(
      render,
      req,
      res
    ) {
      if (monster_map.has(req.params.id)) {
        let hzv = ['no data provided'];
        let enrg = ['no data provided'];
        
        if (monster_hzv_map.has(req.params.id)) {
          hzv = monster_hzv_map.get(req.params.id);
        }

        if (monster_enrage_map.has(req.params.id)) {
          enrg = monster_enrage_map.get(req.params.id);
        }

        const monster = monster_map.get(req.params.id);
        const monsterElements = monster.elements.split(':x:').join('❌');
        const monsterAilments = monster.ailments.split(':x:').join('❌');
        const monsterBlights = monster.blights.split(':x:').join('❌');
        const monsterLocations = monster.locations.split(':x:').join('❌');
        res.render(render, {
          MONSTER_NAME: monster.title,
          MONSTER_DESCRIPTION: monster.description,
          MONSTER_ICON: monster.thumbnail,
          MONSTER_ELEMENTS: monsterElements.split('\n').join('<br>'),
          MONSTER_AILMENTS: monsterAilments.split('\n').join('<br>'),
          MONSTER_BLIGHTS: monsterBlights.split('\n').join('<br>'),
          MONSTER_LOCATIONS: monsterLocations.split('\n').join('<br>'),
          MONSTER_INFO: monster.info,
          MONSTER_HZV_INFO: monster.hzv,
          MONSTER_HZV_DATA: hzv,
          MONSTER_ENRAGE_DATA: enrg,
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

module.exports = new MonstersRoute();
