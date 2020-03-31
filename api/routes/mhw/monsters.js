const manager = require('../../router');
const utils = require('../../../data/utils');

class MonstersRoute {
  route(data) {
    manager
      .fetch(
        'http://localhost:8080/api/mhw/monsters?key=h5Nyec}!8tR3gehAc!;DW4dyJ:'
      )
      .then(function(a) {
        const monster_map = utils.buildMap(
          a,
          {
            extended: true,
            extraProp: true,
            raw: true
          },
          'name',
          'details'
        ).map;

        manager
          .fetch(
            'http://localhost:8080/api/mhw/monster_hitzones?key=h5Nyec}!8tR3gehAc!;DW4dyJ:'
          )
          .then(function(b) {
            const monster_hitzones = utils.buildMap(b, {
              raw: true
            }).map;

            manager
              .fetch(
                'http://localhost:8080/api/mhw/monster_enrage?key=h5Nyec}!8tR3gehAc!;DW4dyJ:'
              )
              .then(function(c) {
                const monster_enrage = utils.buildMap(c, {
                  raw: true
                }).map;

                manager.addRoute(
                  '/mhw/monsters',
                  'pages/mhw/monster_list.ejs',
                  function(render, req, res) {
                    res.render(render, {
                      MONSTER_MAP: monster_map,
                      MHW_OBJECTS: data.objects,
                      MHW_DECO_ARRAY: data.decoration_names,
                      MHW_MONSTER_ARRAY: data.monster_names,
                      MHW_WEAPON_ARRAY: data.weapon_names,
                      MHW_ARMOR_ARRAY: data.armor_names,
                      MHW_SKILL_ARRAY: data.skill_names,
                      MHW_ITEM_ARRAY: data.item_names
                    });
                  }
                );

                manager.addRoute(
                  '/mhw/monsters/:id',
                  'pages/mhw/monster_info.ejs',
                  function(render, req, res) {
                    if (monster_map.has(req.params.id)) {
                      let hzv = ['no data provided'];
                      let enrg = ['no data provided'];

                      if (monster_hitzones.has(req.params.id)) {
                        hzv = monster_hitzones.get(req.params.id);
                      }

                      if (monster_enrage.has(req.params.id)) {
                        enrg = monster_enrage.get(req.params.id);
                      }

                      const monster = monster_map.get(req.params.id);
                      const monsterElements = monster.elements
                        .split(':x:')
                        .join('❌');
                      const monsterAilments = monster.ailments
                        .split(':x:')
                        .join('❌');
                      const monsterBlights = monster.blights
                        .split(':x:')
                        .join('❌');
                      const monsterLocations = monster.locations
                        .split(':x:')
                        .join('❌');
                      res.render(render, {
                        MONSTER_NAME: monster.title,
                        MONSTER_DESCRIPTION: monster.description,
                        MONSTER_ICON: monster.thumbnail,
                        MONSTER_ELEMENTS: monsterElements
                          .split('\n')
                          .join('<br>'),
                        MONSTER_AILMENTS: monsterAilments
                          .split('\n')
                          .join('<br>'),
                        MONSTER_BLIGHTS: monsterBlights
                          .split('\n')
                          .join('<br>'),
                        MONSTER_LOCATIONS: monsterLocations
                          .split('\n')
                          .join('<br>'),
                        MONSTER_INFO: monster.info,
                        MONSTER_HZV_INFO: monster.hzv,
                        MONSTER_HZV_DATA: hzv,
                        MONSTER_ENRAGE_DATA: enrg,
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
          });
      });
  }
}

module.exports = new MonstersRoute();
