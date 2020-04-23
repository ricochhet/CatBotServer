const routeUtils = require('../../../util/routeUtils');
const mapUtils = require('../../../util/mapUtils');

class RouteMonsters {
  route(url, data, key) {
    routeUtils.fetch(`${url}?key=${key}`).then(function (a) {
      const map = mapUtils.buildMap(
        a,
        {
          extended: true,
          extraProp: true,
          raw: true
        },
        'name',
        'details'
      ).map;

      routeUtils.addRoute(
        '/mhw/monsters',
        'pages/mhw/monster_list.ejs',
        function (render, req, res) {
          res.render(render, {
            MONSTER_MAP: map,
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

      routeUtils.addRoute(
        '/mhw/monsters/:id',
        'pages/mhw/monster_info.ejs',
        function (render, req, res) {
          if (map.has(req.params.id)) {
            const monster = map.get(req.params.id);
            const monster_elements = monster.elements.split(':x:').join('❌');
            const monster_ailments = monster.ailments.split(':x:').join('❌');
            const monster_blights = monster.blights.split(':x:').join('❌');
            const monster_locations = monster.locations.split(':x:').join('❌');

            res.render(render, {
              MONSTER_NAME: monster.title,
              MONSTER_DESCRIPTION: monster.description,
              MONSTER_ICON: monster.thumbnail,
              MONSTER_ELEMENTS: monster_elements.split('\n').join('<br>'),
              MONSTER_AILMENTS: monster_ailments.split('\n').join('<br>'),
              MONSTER_BLIGHTS: monster_blights.split('\n').join('<br>'),
              MONSTER_LOCATIONS: monster_locations.split('\n').join('<br>'),
              MONSTER_INFO: monster.info,
              MONSTER_HZV_INFO: monster.hzv,
              MONSTER_HZV_DATA: monster.hitzones,
              MONSTER_ENRAGE_DATA: monster.enrage,
              MHW_OBJECTS: data.objects,
              MHW_DECO_ARRAY: data.decoration_names,
              MHW_MONSTER_ARRAY: data.monster_names,
              MHW_WEAPON_ARRAY: data.weapon_names,
              MHW_ARMOR_ARRAY: data.armor_names,
              MHW_SKILL_ARRAY: data.skill_names,
              MHW_ITEM_ARRAY: data.item_names
            });
          } else {
            res.render(routeUtils.statusCodeRenders.get(404));
          }
        }
      );
    });
  }
}

module.exports = new RouteMonsters();
