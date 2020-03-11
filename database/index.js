const cmd = require('./libraries/commandUtils');
const parser = require('./parser');
const utils = require('./utils');
const build = require('./build');

class Database {
  async convertCSVs() {
    return new Promise(function(resolve, reject) {
      utils.convert();
    });
  }

  async initializeDatabaseBuild() {
    return new Promise(function(resolve, reject) {
      parser.armorpieces();
      parser.charms();
      parser.decorations();
      parser.items();
      parser.monsters();
      parser.quests();
      parser.skills();
      parser.kinsects();
      parser.weapons();
    });
  }

  async finalizeDatabaseBuild(opts = { useNoP: false }) {
    return new Promise(function(resolve, reject) {
      parser.armorpieces();
      parser.decorations(opts.useNoP);
    });
  }

  async buildAPIDatabase() {
		return new Promise(function(resolve, reject) {
			build.genJSON(
				{
					delim: ',',
					input: './database/source_tables/ItemTableFixed - Item.csv',
					output: './database/build/api/itemids.json'
				},
				true
			);

			build.genJSON(
				{
					delim: ',',
					input: './database/source_tables/Quest IDs - Sheet1.csv',
					output: './database/build/api/questids.json'
				},
				true
			);

			build.items('./database/build/api/items.json', true);
			build.armors('./database/build/api/armors.json', true);
			build.armorPieces('./database/build/api/armor_pieces.json', true);
			build.decorations('./database/build/api/decorations.json', true);
			build.skills('./database/build/api/skills.json', true);
			build.db_weapons('./database/build/api/weapons.json', true);
		});
	}
	
	async buildBotDatabase() {
    return new Promise(function(resolve, reject) {
			build.genJSON(
				{
					delim: ',',
					input: './database/source_tables/ItemTableFixed - Item.csv',
					output: './database/build/bot/itemids.json'
				},
				false
			);
		
			build.genJSON(
				{
					delim: ',',
					input: './database/source_tables/Quest IDs - Sheet1.csv',
					output: './database/build/bot/questids.json'
				},
				false
			);
		
			build.items('./database/build/bot/items.json', false);
			build.armors('./database/build/bot/armors.json', false);
			build.armorPieces('./database/build/bot/armor_pieces.json', false);
			build.decorations('./database/build/bot/decorations.json', false);
			build.skills('./database/build/bot/skills.json', false);
			build.db_weapons('./database/build/bot/weapons.json', false);
    });
  }

  async run(fn) {
		await this.convertCSVs();
		console.log('Converted CSVs');

		await this.initializeDatabaseBuild();
		console.log('Initializing Initial Database Build');

		await this.finalizeDatabaseBuild();
		console.log('Finalizing Initial Database Build');

		await this.buildAPIDatabase();
		console.log('Building API Database');

		await this.buildBotDatabase();
		console.log('Building Bot Database');
  }
}

const data = new Database();
data.run();