const sql = require('../../../utils/sqlite');
sql.setup('./mhwdb.sqlite');

class API {
  constructor(manager, config) {
    this.manager = manager;
    this.config = config;
  }

  route_armors() {
    const self = this;

    this.manager.addRoute('/api/mhw/armors', '', function(render, req, res) {
      if (req.query.key == self.config['api_key']) {
        sql
          .execute(
            `SELECT name, rank, setBonus, defenseBase, defenseMax, defenseAugmented, resistanceFire, resistanceWater, resistanceThunder, resistanceIce, resistanceDragon, pieces, skills, slots FROM armors`
          )
          .then(function(r) {
            let object = {};

            for (const i in r) {
              object[r[i]['name'].toLowerCase().replace(/ /g, '')] = {
                name: r[i]['name'],
                rank: r[i]['rank'],
                setBonus: sql.parsestr(r[i]['setBonus']),
                defenses: {
                  base: r[i]['defenseBase'],
                  max: r[i]['defenseMax'],
                  augmented: r[i]['defenseAugmented']
                },
                resistances: {
                  fire: r[i]['resistanceFire'],
                  water: r[i]['resistanceWater'],
                  thunder: r[i]['resistanceThunder'],
                  ice: r[i]['resistanceIce'],
                  dragon: r[i]['resistanceDragon']
                },
                pieces: sql.parsestr(r[i]['pieces']),
                skills: sql.parsestr(r[i]['skills']),
                slots: sql.parsestr(r[i]['slots'])
              };
            }

            res.json(object);
          });
      } else {
        res.json({ error: '403 Unauthorized' });
      }
    });
  }

  route_decorations() {
    const self = this;

    this.manager.addRoute('/api/mhw/decorations', '', function(
      render,
      req,
      res
    ) {
      if (req.query.key == self.config['api_key']) {
        sql
          .execute(`SELECT name, rarity, slot, skills FROM decorations`)
          .then(function(r) {
            let object = {};

            for (const i in r) {
              object[r[i]['name'].toLowerCase().replace(/ /g, '')] = {
                name: r[i]['name'],
                rarity: r[i]['rarity'],
                slot: r[i]['slot'],
                skills: sql.parsestr(r[i]['skills'])
              };
            }

            res.json(object);
          });
      } else {
        res.json({ error: '403 Unauthorized' });
      }
    });
  }

  route_items() {
    const self = this;

    this.manager.addRoute('/api/mhw/items', '', function(render, req, res) {
      if (req.query.key == self.config['api_key']) {
        sql
          .execute(
            `SELECT name, description, rarity, carryLimit, buy, value FROM items`
          )
          .then(function(r) {
            let object = {};

            for (const i in r) {
              object[r[i]['name'].toLowerCase().replace(/ /g, '')] = {
                name: r[i]['name'],
                description: r[i]['description'],
                rarity: r[i]['rarity'],
                carryLimit: r[i]['carryLimit'],
                buy: r[i]['buy'],
                value: r[i]['value']
              };
            }

            res.json(object);
          });
      } else {
        res.json({ error: '403 Unauthorized' });
      }
    });
  }

  route_monsters() {
    const self = this;

    this.manager.addRoute('/api/mhw/monsters', '', function(render, req, res) {
      if (req.query.key == self.config['api_key']) {
        sql
          .execute(
            `SELECT name, aliases, title, url, description, thumbnail, elements, ailments, blights, locations, info, slash, blunt, shot, fire, water, thunder, ice, dragon, hitzones, enrage FROM monsters`
          )
          .then(function(r) {
            let object = {};

            for (const i in r) {
              object = {
                name: r[i]['name'].toLowerCase().replace(/ /g, ''),
                details: {
                  aliases: sql.parsearr(r[i]['aliases']),
                  title: r[i]['title'],
                  url: r[i]['url'],
                  description: r[i]['description'],
                  thumbnail: r[i]['thumbnail'],
                  elements: r[i]['elements'],
                  ailments: r[i]['ailments'],
                  blights: r[i]['blights'],
                  locations: r[i]['info'],
                  hzv: {
                    slash: r[i]['slash'],
                    blunt: r[i]['blunt'],
                    shot: r[i]['shot'],
                    fire: r[i]['fire'],
                    water: r[i]['water'],
                    thunder: r[i]['thunder'],
                    ice: r[i]['ice'],
                    dragon: r[i]['dragon']
                  },
                  hitzones: sql.parsestr(r[i]['hitzones']),
                  enrage: sql.parsestr(r[i]['enrage'])
                }
              };
            }

            res.json(object);
          });
      } else {
        res.json({ error: '403 Unauthorized' });
      }
    });
  }

  route_skills() {
    const self = this;

    this.manager.addRoute('/api/mhw/skills', '', function(render, req, res) {
      if (req.query.key == self.config['api_key']) {
        sql
          .execute(`SELECT name, description, ranks FROM skills`)
          .then(function(r) {
            let object = {};

            for (const i in r) {
              object[r[i]['name'].toLowerCase().replace(/ /g, '')] = {
                name: r[i]['name'],
                description: r[i]['description'],
                ranks: sql.parsestr(r[i]['ranks'])
              };
            }

            res.json(object);
          });
      } else {
        res.json({ error: '403 Unauthorized' });
      }
    });
  }

  route_weapons() {
    const self = this;
    this.manager.addRoute('/api/mhw/weapons', '', function(render, req, res) {
      if (req.query.key == self.config['api_key']) {
        sql
          .execute(
            `SELECT name, type, rarity, displayAttack, rawAttack, damageType, affinity, defense, sharpness, elderseal, shelling, specialAmmo, deviation, ammos, elements, slots, coatings, crafting, upgrade FROM weapons`
          )
          .then(function(r) {
            let object = {};

            for (const i in r) {
              object[r[i]['name'].toLowerCase().replace(/ /g, '')] = {
                name: r[i]['name'],
                type: r[i]['type'],
                rarity: r[i]['rarity'],
                displayAttack: r[i]['displayAttack'],
                rawAttack: r[i]['rawAttack'],
                damageType: r[i]['damageType'],
                affinity: r[i]['affinity'],
                defense: r[i]['defense'],
                sharpness: sql.parsestr(r[i]['sharpness']),
                elderseal: r[i]['elderseal'],
                shelling: sql.parsestr(r[i]['shelling']),
                specialAmmo: r[i]['specialAmmo'],
                deviation: r[i]['deviation'],
                ammos: sql.parsestr(r[i]['ammos']),
                elements: sql.parsestr(r[i]['elements']),
                slots: sql.parsestr(r[i]['slots']),
                coatings: sql.parsearr(r[i]['coatings']),
                crafting: sql.parsestr(r[i]['crafting']),
                upgrade: sql.parsestr(r[i]['upgrade'])
              };
            }

            res.json(object);
          });
      } else {
        res.json({ error: '403 Unauthorized' });
      }
    });
  }
}

module.exports = new API();
