const routeUtils = require('../../../util/routeUtils');
const mapUtils = require('../../../util/mapUtils');

class RouteSkills {
  route(url, data, key) {
    routeUtils.fetch(`${url}?key=${key}`).then(function (r) {
      const map = mapUtils.buildMap(r, {
        raw: true
      }).map;

      routeUtils.get('/mhw/skills', 'pages/mhw/skill_list.ejs', function (
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

      routeUtils.get('/mhw/skills/:id', 'pages/mhw/skill_info.ejs', function (
        render,
        req,
        res
      ) {
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
          res.render(routeUtils.statusCodeRenders.get(404));
        }
      });
    });
  }
}

module.exports = new RouteSkills();
