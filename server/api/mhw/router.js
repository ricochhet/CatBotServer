const data = require('./data');

class API {
  constructor(manager, config) {
    this.manager = manager;
    this.config = config;
  }

  armors() {
    const self = this;
    this.manager.addRoute('/api/mhw/armors', '', function (render, req, res) {
      if (req.query.key == self.config['api']['token']) {
        res.json(data.armor_map.raw);
      } else {
        res.json({ error: '403 Unauthorized' });
      }
    });
  }

  decorations() {
    const self = this;
    this.manager.addRoute('/api/mhw/decorations', '', function (
      render,
      req,
      res
    ) {
      if (req.query.key == self.config['api']['token']) {
        res.json(data.decoration_map.raw);
      } else {
        res.json({ error: '403 Unauthorized' });
      }
    });
  }

  items() {
    const self = this;
    this.manager.addRoute('/api/mhw/items', '', function (render, req, res) {
      if (req.query.key == self.config['api']['token']) {
        res.json(data.item_map.raw);
      } else {
        res.json({ error: '403 Unauthorized' });
      }
    });
  }

  monsters() {
    const self = this;
    this.manager.addRoute('/api/mhw/monsters', '', function (render, req, res) {
      if (req.query.key == self.config['api']['token']) {
        let array = [];
        for (const i in data.monster_map.raw) {
          if (
            !data.monster_hitzone_map.map.has(
              data.monster_map.raw[i]['name']
            )
          )
            throw console.log('Data could not be found for this monster!');

          if (
            !data.monster_enrage_map.map.has(
              data.monster_map.raw[i]['name']
            )
          )
            throw console.log('Data could not be found for this monster!');

          let object = {
            name: data.monster_map.raw[i]['name']
              .toLowerCase()
              .replace(/ /g, ''),
            details: {
              aliases: data.monster_map.raw[i]['details']['aliases'],
              title: data.monster_map.raw[i]['details']['title'],
              url: data.monster_map.raw[i]['details']['url'],
              description: data.monster_map.raw[i]['details']['description'],
              thumbnail: data.monster_map.raw[i]['details']['thumbnail'],
              elements: data.monster_map.raw[i]['details']['elements'],
              ailments: data.monster_map.raw[i]['details']['ailments'],
              blights: data.monster_map.raw[i]['details']['blights'],
              locations: data.monster_map.raw[i]['details']['locations'],
              info: data.monster_map.raw[i]['details']['info'],
              hzv: data.monster_map.raw[i]['details']['hzv'],
              hitzones: data.monster_hitzone_map.map.get(
                data.monster_map.raw[i]['name']
              ),
              enrage: data.monster_enrage_map.map.get(
                data.monster_map.raw[i]['name']
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

  skills() {
    const self = this;
    this.manager.addRoute('/api/mhw/skills', '', function (render, req, res) {
      if (req.query.key == self.config['api']['token']) {
        res.json(data.skill_map.raw);
      } else {
        res.json({ error: '403 Unauthorized' });
      }
    });
  }

  weapons() {
    const self = this;
    this.manager.addRoute('/api/mhw/weapons', '', function (render, req, res) {
      if (req.query.key == self.config['api']['token']) {
        res.json(data.weapon_map.raw);
      } else {
        res.json({ error: '403 Unauthorized' });
      }
    });
  }
}

module.exports = new API();
