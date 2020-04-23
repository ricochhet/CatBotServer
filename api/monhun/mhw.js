class Router {
  constructor(routeUtils, config) {
    this.routeUtils = routeUtils;
    this.config = config;
  }

  setup(mapUtils) {
    this.mapUtils = mapUtils;
    this.monster_map = mapUtils.buildMap(
      './databases/mh_data/mhw/build/monster_info.json',
      {
        extended: true,
        extraProp: true
      },
      'name',
      'details'
    );
    this.monster_hitzone_map = mapUtils.buildMap(
      './databases/mh_data/mhw/build/hitzone_data.json'
    );

    this.monster_enrage_map = mapUtils.buildMap(
      './databases/mh_data/mhw/build/enrage_data.json'
    );

    this.item_map = mapUtils.buildMap(
      './databases/mh_data/mhw/build/item_info.json'
    );
    this.armor_map = mapUtils.buildMap(
      './databases/mh_data/mhw/build/armor_info.json'
    );
    this.weapon_map = mapUtils.buildMap(
      './databases/mh_data/mhw/build/weapon_info.json'
    );
    this.decoration_map = mapUtils.buildMap(
      './databases/mh_data/mhw/build/decoration_info.json'
    );
    this.skill_map = mapUtils.buildMap(
      './databases/mh_data/mhw/build/skill_info.json'
    );

    this.monster_names = mapUtils.buildArray(this.monster_map.map, 'title');
    this.weapon_names = mapUtils.buildArray(this.weapon_map.map, 'name');
    this.armor_names = mapUtils.buildArray(this.armor_map.map, 'name');
    this.skill_names = mapUtils.buildArray(this.skill_map.map, 'name');
    this.item_names = mapUtils.buildArray(this.item_map.map, 'name');
    this.decoration_names = mapUtils.buildArray(
      this.decoration_map.map,
      'name'
    );

    this.objects = [
      ...this.decoration_names.toString().split(','),
      ...this.monster_names.toString().split(','),
      ...this.weapon_names.toString().split(','),
      ...this.armor_names.toString().split(','),
      ...this.skill_names.toString().split(','),
      ...this.item_names.toString().split(',')
    ];

    this.icons = new Map([
      ['hammer', '/icons/equipment/ic_equipment_hammer_base.svg'],
      ['great-sword', '/icons/equipment/ic_equipment_greatsword_base.svg'],
      ['hunting-horn', '/icons/equipment/ic_equipment_hunting_horn_base.svg'],
      ['charge-blade', '/icons/equipment/ic_equipment_charge_blade_base.svg'],
      ['switch-axe', '/icons/equipment/ic_equipment_switch_axe_base.svg'],
      ['long-sword', '/icons/equipment/ic_equipment_longsword_base.svg'],
      ['insect-glaive', '/icons/equipment/ic_equipment_insect_glaive_base.svg'],
      ['lance', '/icons/equipment/ic_equipment_lance_base.svg'],
      ['gunlance', '/icons/equipment/ic_equipment_gunlance_base.svg'],
      ['heavy-bowgun', '/icons/equipment/ic_equipment_heavy_bowgun_base.svg'],
      [
        'sword-and-shield',
        '/icons/equipment/ic_equipment_sword_and_shield_base.svg'
      ],
      ['dual-blades', '/icons/equipment/ic_equipment_dual_blades_base.svg'],
      ['light-bowgun', '/icons/equipment/ic_equipment_light_bowgun_base.svg'],
      ['bow', '/icons/equipment/ic_equipment_bow_base.svg'],
      ['whetstone', '/icons/ui/ic_ui_whetstone.svg'],
      ['element', '/icons/ui/ic_ui_element.svg'],
      ['ammo', '/icons/items/ic_items_ammo_base.svg'],
      ['crafting', '/icons/ui/ic_ui_crafting_base.svg'],
      ['attack', '/icons/ui/ic_ui_attack.svg'],
      ['affinity', '/icons/ui/ic_ui_affinity.svg'],
      ['defense', '/icons/ui/ic_ui_defense.svg'],
      ['elderseal', '/icons/ui/ic_ui_elderseal.svg'],
      ['shelling', '/icons/ui/ic_ui_shelling.svg'],
      ['specialAmmo', '/icons/ui/ic_ui_special_ammo.svg'],
      ['deviation', '/icons/ui/ic_ui_deviation.svg'],
      ['head', '/icons/equipment/ic_equipment_head_base.svg'],
      ['skills', '/icons/ui/ic_ui_armor_skill_base.svg'],
      ['setBonus', '/icons/ui/ic_ui_set_bonus_base.svg'],
      ['slots', '/icons/ui/ic_ui_slots.svg'],
      ['rank', '/icons/ui/ic_ui_hunter_rank.svg'],
      ['itembox', '/icons/ui/ic_ui_item_box.svg'],
      ['bookmark', '/icons/ui/ic_ui_bookmark.svg']
    ]);

    this.data = {
      icons: this.icons,
      objects: this.objects,
      decoration_names: this.decoration_names,
      monster_names: this.monster_names,
      weapon_names: this.weapon_names,
      armor_names: this.armor_names,
      skill_names: this.skill_names,
      item_names: this.item_names
    };
  }

  armors() {
    const self = this;
    this.routeUtils.addRoute('/api/mhw/armors', '', function (
      render,
      req,
      res
    ) {
      if (req.query.key == self.config['api']['token']) {
        res.json(self.armor_map.raw);
      } else {
        res.json({ error: self.routeUtils.statusCode('403') });
      }
    });
  }

  decorations() {
    const self = this;
    this.routeUtils.addRoute('/api/mhw/decorations', '', function (
      render,
      req,
      res
    ) {
      if (req.query.key == self.config['api']['token']) {
        res.json(self.decoration_map.raw);
      } else {
        res.json({ error: self.routeUtils.statusCode('403') });
      }
    });
  }

  items() {
    const self = this;
    this.routeUtils.addRoute('/api/mhw/items', '', function (render, req, res) {
      if (req.query.key == self.config['api']['token']) {
        res.json(self.item_map.raw);
      } else {
        res.json({ error: self.routeUtils.statusCode('403') });
      }
    });
  }

  monsters() {
    const self = this;
    this.routeUtils.addRoute('/api/mhw/monsters', '', function (
      render,
      req,
      res
    ) {
      if (req.query.key == self.config['api']['token']) {
        let array = [];
        for (const i in self.monster_map.raw) {
          if (
            !self.monster_hitzone_map.map.has(self.monster_map.raw[i]['name'])
          )
            throw console.log('Data could not be found for this monster!');

          if (!self.monster_enrage_map.map.has(self.monster_map.raw[i]['name']))
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
      } else {
        res.json({ error: self.routeUtils.statusCode('403') });
      }
    });
  }

  skills() {
    const self = this;
    this.routeUtils.addRoute('/api/mhw/skills', '', function (
      render,
      req,
      res
    ) {
      if (req.query.key == self.config['api']['token']) {
        res.json(self.skill_map.raw);
      } else {
        res.json({ error: self.routeUtils.statusCode('403') });
      }
    });
  }

  weapons() {
    const self = this;
    this.routeUtils.addRoute('/api/mhw/weapons', '', function (
      render,
      req,
      res
    ) {
      if (req.query.key == self.config['api']['token']) {
        res.json(self.weapon_map.raw);
      } else {
        res.json({ error: self.routeUtils.statusCode('403') });
      }
    });
  }
}

module.exports = new Router();