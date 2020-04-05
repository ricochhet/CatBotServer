const struct = require('./struct');

class API {
  constructor(manager, config) {
    this.manager = manager;
    this.config = config;
  }

  route_armors() {
    const self = this;

    this.manager.addRoute('/api/mhw/armors', '', function (render, req, res) {
      if (req.query.key == self.config['api_key']) {
        res.json(struct.armor_map.raw);
      } else {
        res.json({ error: '403 Unauthorized' });
      }
    });
  }

  route_decorations() {
    const self = this;

    this.manager.addRoute('/api/mhw/decorations', '', function (
      render,
      req,
      res
    ) {
      if (req.query.key == self.config['api_key']) {
        res.json(struct.decoration_map.raw);
      } else {
        res.json({ error: '403 Unauthorized' });
      }
    });
  }

  route_items() {
    const self = this;

    this.manager.addRoute('/api/mhw/items', '', function (render, req, res) {
      if (req.query.key == self.config['api_key']) {
        res.json(struct.item_map.raw);
      } else {
        res.json({ error: '403 Unauthorized' });
      }
    });
  }

  route_monsters() {
    const self = this;

    this.manager.addRoute('/api/mhw/monsters', '', function (render, req, res) {
      if (req.query.key == self.config['api_key']) {
        let array = [];
        for (const i in struct.monster_map.raw) {
          if (
            !struct.monster_hitzone_map.map.has(
              struct.monster_map.raw[i]['name']
            )
          )
            throw console.log('Data could not be found for this monster!');

          if (
            !struct.monster_enrage_map.map.has(
              struct.monster_map.raw[i]['name']
            )
          )
            throw console.log('Data could not be found for this monster!');

          let object = {
            name: struct.monster_map.raw[i]['name']
              .toLowerCase()
              .replace(/ /g, ''),
            details: {
              aliases: struct.monster_map.raw[i]['details']['aliases'],
              title: struct.monster_map.raw[i]['details']['title'],
              url: struct.monster_map.raw[i]['details']['url'],
              description: struct.monster_map.raw[i]['details']['description'],
              thumbnail: struct.monster_map.raw[i]['details']['thumbnail'],
              elements: struct.monster_map.raw[i]['details']['elements'],
              ailments: struct.monster_map.raw[i]['details']['ailments'],
              blights: struct.monster_map.raw[i]['details']['blights'],
              locations: struct.monster_map.raw[i]['details']['locations'],
              info: struct.monster_map.raw[i]['details']['info'],
              hzv: struct.monster_map.raw[i]['details']['hzv'],
              hitzones: struct.monster_hitzone_map.map.get(
                struct.monster_map.raw[i]['name']
              ),
              enrage: struct.monster_enrage_map.map.get(
                struct.monster_map.raw[i]['name']
              )
            }
          };

          array.push(object);
        }

        res.json(array);
      } else {
        res.json({ error: '403 Unauthorized' });
      }
    });
  }

  route_skills() {
    const self = this;

    this.manager.addRoute('/api/mhw/skills', '', function (render, req, res) {
      if (req.query.key == self.config['api_key']) {
        res.json(struct.skill_map.raw);
      } else {
        res.json({ error: '403 Unauthorized' });
      }
    });
  }

  route_weapons() {
    const self = this;
    this.manager.addRoute('/api/mhw/weapons', '', function (render, req, res) {
      if (req.query.key == self.config['api_key']) {
        res.json(struct.weapon_map.raw);
      } else {
        res.json({ error: '403 Unauthorized' });
      }
    });
  }
}

module.exports = new API();
