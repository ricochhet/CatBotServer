const dataUtils = require('../../tools/utils/dataUtils');
const routeUtils = require('../../tools/utils/routeUtils');
const config = require('../../config.json');

class MHWRouter {
  constructor() {
    this.monster_map = dataUtils.buildMap(
      './databases/mh_data/mhw/build/monster_info.json',
      {
        extended: true,
        extraProp: true
      },
      'name',
      'details'
    );
    this.monster_hitzone_map = dataUtils.buildMap(
      './databases/mh_data/mhw/build/hitzone_data.json'
    );

    this.monster_enrage_map = dataUtils.buildMap(
      './databases/mh_data/mhw/build/enrage_data.json'
    );

    this.item_map = dataUtils.buildMap(
      './databases/mh_data/mhw/build/item_info.json'
    );
    this.armor_map = dataUtils.buildMap(
      './databases/mh_data/mhw/build/armor_info.json'
    );
    this.weapon_map = dataUtils.buildMap(
      './databases/mh_data/mhw/build/weapon_info.json'
    );
    this.decoration_map = dataUtils.buildMap(
      './databases/mh_data/mhw/build/decoration_info.json'
    );
    this.skill_map = dataUtils.buildMap(
      './databases/mh_data/mhw/build/skill_info.json'
    );
  }

  init() {
    const self = this;

    let routes = {
      armors: function () {
        routeUtils.get('/api/mhw/armors', '', function (render, req, res) {
          res.json(self.armor_map.raw);
        });
      },
      decorations: function () {
        routeUtils.get('/api/mhw/decorations', '', function (render, req, res) {
          res.json(self.decoration_map.raw);
        });
      },
      items: function () {
        routeUtils.get('/api/mhw/items', '', function (render, req, res) {
          res.json(self.item_map.raw);
        });
      },
      monsters: function () {
        routeUtils.get('/api/mhw/monsters', '', function (render, req, res) {
          let array = [];
          for (const i in self.monster_map.raw) {
            if (
              !self.monster_hitzone_map.map.has(self.monster_map.raw[i]['name'])
            )
              throw console.log('Data could not be found for this monster!');

            if (
              !self.monster_enrage_map.map.has(self.monster_map.raw[i]['name'])
            )
              throw console.log('Data could not be found for this monster!');

            let object = {
              name: self.monster_map.raw[i]['name']
                .toLowerCase()
                .replace(/ /g, ''),
              details: {
                aliases: self.monster_map.raw[i]['details']['aliases'],
                title: self.monster_map.raw[i]['details']['title'],
                url: self.monster_map.raw[i]['details']['url'],
                description: self.monster_map.raw[i]['details']['description'],
                thumbnail: self.monster_map.raw[i]['details']['thumbnail'],
                elements: self.monster_map.raw[i]['details']['elements'],
                ailments: self.monster_map.raw[i]['details']['ailments'],
                blights: self.monster_map.raw[i]['details']['blights'],
                locations: self.monster_map.raw[i]['details']['locations'],
                info: self.monster_map.raw[i]['details']['info'],
                hzv: self.monster_map.raw[i]['details']['hzv'],
                hitzones: self.monster_hitzone_map.map.get(
                  self.monster_map.raw[i]['name']
                ),
                enrage: self.monster_enrage_map.map.get(
                  self.monster_map.raw[i]['name']
                )
              }
            };

            array.push(object);
          }

          res.json(array);
        });
      },
      skills: function () {
        routeUtils.get('/api/mhw/skills', '', function (render, req, res) {
          res.json(self.skill_map.raw);
        });
      },
      weapons: function () {
        routeUtils.get('/api/mhw/weapons', '', function (render, req, res) {
          res.json(self.weapon_map.raw);
        });
      }
    };

    for (const i in routes) {
      routes[i]();
    }
  }
}

module.exports = new MHWRouter();