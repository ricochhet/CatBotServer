class Data {
  setup(mapUtils) {
    this.mapUtils = mapUtils;
    this.monster_map = mapUtils.buildMap('./databases/mh_data/mhgu/monster_info.json');
    this.weapon_map = mapUtils.buildMap('./databases/mh_data/mhgu/weapon_info.json');
  }
}

module.exports = new Data();
