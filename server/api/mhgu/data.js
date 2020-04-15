class Struct {
  setup(utils) {
    this.utils = utils;
    this.monster_map = utils.buildMap('./database/mhgu/monster_info.json');
    this.weapon_map = utils.buildMap('./database/mhgu/weapon_info.json');
  }
}

module.exports = new Struct();
