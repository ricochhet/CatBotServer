const manager = require('../../router');
const utils = require('../../../utils/utils');

class RouteItems {
  route(data, key) {
    manager
      .fetch(
        `http://localhost:8080/api/mhw/items?key=${key}`
      )
      .then(function(r) {
        const map = utils.buildMap(r, {
          raw: true
        }).map;

        manager.addRoute('/mhw/items', 'pages/mhw/item_list.ejs', function(
          render,
          req,
          res
        ) {
          res.render(render, {
            ITEM_MAP: map,
            MHW_OBJECTS: data.objects,
            MHW_DECO_ARRAY: data.decoration_names,
            MHW_MONSTER_ARRAY: data.monster_names,
            MHW_WEAPON_ARRAY: data.weapon_names,
            MHW_ARMOR_ARRAY: data.armor_names,
            MHW_SKILL_ARRAY: data.skill_names,
            MHW_ITEM_ARRAY: data.item_names
          });
        });

        manager.addRoute('/mhw/items/:id', 'pages/mhw/item_info.ejs', function(
          render,
          req,
          res
        ) {
          if (map.has(req.params.id)) {
            const item = map.get(req.params.id);
            res.render(render, {
              ICON_MAP: data.icons,
              ITEM_NAME: item.name,
              ITEM_DESCRIPTION: item.description,
              ITEM_RARITY: item.rarity,
              ITEM_CARRYLIMIT: item.carryLimit,
              ITEM_BUY: item.buy,
              ITEM_VALUE: item.value,
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
        });
      });
  }
}

module.exports = new RouteItems();
