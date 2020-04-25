const routeUtils = require('../../../util/routeUtils');
const mapUtils = require('../../../util/mapUtils');

class RouteDecorations {
  route(url, data, key) {
    routeUtils.fetch(`${url}?key=${key}`).then(function (r) {
      const map = mapUtils.buildMap(r, {
        raw: true
      }).map;

      routeUtils.get(
        '/mhw/decorations',
        'pages/mhw/decoration_list.ejs',
        function (render, req, res) {
          res.render(render, {
            DECORATION_MAP: map,
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

      routeUtils.get(
        '/mhw/decorations/:id',
        'pages/mhw/decoration_info.ejs',
        function (render, req, res) {
          let modifiedParams = req.params.id;

          if (map.has(modifiedParams)) {
            const decoration = map.get(modifiedParams);
            res.render(render, {
              ICON_MAP: data.icons,
              DECORATION_NAME: decoration.name,
              DECORATION_RARITY: decoration.rarity,
              DECORATION_SLOT: decoration.slot,
              DECORATION_SKILLS: decoration.skills,
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

module.exports = new RouteDecorations();
