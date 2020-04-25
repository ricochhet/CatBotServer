const routeUtils = require('../../../util/routeUtils');
const mapUtils = require('../../../util/mapUtils');

class RouteArmors {
  route(url, data, key) {
    routeUtils.fetch(`${url}?key=${key}`).then(function (r) {
      const map = mapUtils.buildMap(r, {
        raw: true
      }).map;

      routeUtils.get('/mhw/armors', 'pages/mhw/armor_list.ejs', function (
        render,
        req,
        res
      ) {
        res.render(render, {
          ARMOR_MAP: map,
          MHW_OBJECTS: data.objects,
          MHW_DECO_ARRAY: data.decoration_names,
          MHW_MONSTER_ARRAY: data.monster_names,
          MHW_WEAPON_ARRAY: data.weapon_names,
          MHW_ARMOR_ARRAY: data.armor_names,
          MHW_SKILL_ARRAY: data.skill_names,
          MHW_ITEM_ARRAY: data.item_names
        });
      });

      routeUtils.get('/mhw/armors/:id', 'pages/mhw/armor_info.ejs', function (
        render,
        req,
        res
      ) {
        if (map.has(req.params.id)) {
          const armor = map.get(req.params.id);
          res.render(render, {
            ICON_MAP: data.icons,
            ARMOR_NAME: armor.name,
            ARMOR_RANK: armor.rank,
            ARMOR_SETBONUS: armor.setBonus,
            ARMOR_DEFENSES: armor.defenses,
            ARMOR_RESISTANCES: armor.resistances,
            ARMOR_PIECES: armor.pieces,
            ARMOR_SKILLS: armor.skills,
            ARMOR_SLOTS: armor.slots,
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

module.exports = new RouteArmors();
