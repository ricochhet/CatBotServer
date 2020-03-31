class MHWStruct {
  setup(utils) {
    this.monster_map = utils.buildMap(
      './data/build/def/monster_info.json',
      {
        extended: true,
        extraProp: true
      },
      'name',
      'details'
    );

    this.item_map = utils.buildMap('./data/build/api/item_info.json');
    this.armor_map = utils.buildMap('./data/build/api/armor_info.json');
    this.weapon_map = utils.buildMap('./data/build/api/weapon_info.json');
    this.decoration_map = utils.buildMap(
      './data/build/api/decoration_info.json'
    );
    this.skill_map = utils.buildMap('./data/build/api/skill_info.json');

    this.monster_names = utils.buildArray(this.monster_map.map, 'title');
    this.weapon_names = utils.buildArray(this.weapon_map.map, 'name');
    this.armor_names = utils.buildArray(this.armor_map.map, 'name');
    this.skill_names = utils.buildArray(this.skill_map.map, 'name');
    this.item_names = utils.buildArray(this.item_map.map, 'name');
    this.decoration_names = utils.buildArray(this.decoration_map.map, 'name');

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
}

module.exports = new MHWStruct();
