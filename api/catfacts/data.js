class Data {
  setup(mapUtils) {
    this.mapUtils = mapUtils;
    this.catfacts = mapUtils.buildMap('./databases/catfact_data/catfacts.json');
  }
}

module.exports = new Data();
