class MonstersRoute {
  constructor(manager) {
    this.manager = manager;
  }

  route(
    monster_map,
    monster_hzv_map,
    mhwObjects,
    decorationNames,
    monsterNames,
    weaponNames,
    armorNames,
    skillNames,
    itemNames
  ) {
    this.manager.addRoute('/monsters', 'pages/monsters.ejs', function(
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
    this.manager.addRoute('/monsters/:id', 'pages/monster.ejs', function(
      render,
      req,
      res
    ) {
      if (monster_map.has(req.params.id)) {
        let hzv = ['no data provided'];
        if (monster_hzv_map.has(req.params.id)) {
          hzv = monster_hzv_map.get(req.params.id);
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
          MONSTER_HZV_SLASH: monster.hzv.slash,
          MONSTER_HZV_BLUNT: monster.hzv.blunt,
          MONSTER_HZV_SHOT: monster.hzv.shot,
          MONSTER_HZV_FIRE: monster.hzv.fire,
          MONSTER_HZV_WATER: monster.hzv.water,
          MONSTER_HZV_THUNDER: monster.hzv.thunder,
          MONSTER_HZV_ICE: monster.hzv.ice,
          MONSTER_HZV_DRAGON: monster.hzv.dragon,
          MONSTER_HZV_DATA: hzv,
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

module.exports = new MonstersRoute();
