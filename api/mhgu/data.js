class Data {
  setup(utils) {
    this.utils = utils;
    this.monster_map = utils.buildMap('./databases/mh_data/mhgu/monster_info.json');
    this.weapon_map = utils.buildMap('./databases/mh_data/mhgu/weapon_info.json');
  }
}

module.exports = new Data();
