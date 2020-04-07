const manager = require('../../router');
const utils = require('../../../database/libraries/util/mapUtils');

class RouteSkills {
  route(data, key) {
    manager
      .fetch(`http://localhost:8080/api/mhw/skills?key=${key}`)
      .then(function(r) {
        const map = utils.buildMap(r, {
          raw: true
        }).map;

        manager.addRoute('/mhw/skills', 'pages/mhw/skill_list.ejs', function(
          render,
          req,
          res
        ) {
          res.render(render, {
            SKILL_MAP: map,
            MHW_OBJECTS: data.objects,
            MHW_DECO_ARRAY: data.decoration_names,
            MHW_MONSTER_ARRAY: data.monster_names,
            MHW_WEAPON_ARRAY: data.weapon_names,
            MHW_ARMOR_ARRAY: data.armor_names,
            MHW_SKILL_ARRAY: data.skill_names,
            MHW_ITEM_ARRAY: data.item_names
          });
        });

        manager.addRoute(
          '/mhw/skills/:id',
          'pages/mhw/skill_info.ejs',
          function(render, req, res) {
            if (map.has(req.params.id)) {
              const skill = map.get(req.params.id);
              res.render(render, {
                ICON_MAP: data.icons,
                SKILL_NAME: skill.name,
                SKILL_DESCRIPTION: skill.description,
                SKILL_RANKS: skill.ranks,
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

module.exports = new RouteSkills();