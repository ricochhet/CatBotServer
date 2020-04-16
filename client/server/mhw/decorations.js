const manager = require('../../../util/routeUtils');
const utils = require('../../../util/mapUtils');

class RouteDecorations {
  route(url, data, key) {
    manager
      .fetch(`${url}?key=${key}`)
      .then(function(r) {
        const map = utils.buildMap(r, {
          raw: true
        }).map;

        manager.addRoute(
          '/mhw/decorations',
          'pages/mhw/decoration_list.ejs',
          function(render, req, res) {
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

        manager.addRoute(
          '/mhw/decorations/:id',
          'pages/mhw/decoration_info.ejs',
          function(render, req, res) {
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
              res.render('errors/404.ejs');
            }
          }
        );
      });
  }
}

module.exports = new RouteDecorations();
