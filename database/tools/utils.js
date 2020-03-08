const fs = require("fs");
const csv = require("./libraries/csvToJson");

class ChunkUtil {
	search(array, prop, value) {
		let filtered = array.filter(function(item) {
			return item[prop] == value;
		});

		return filtered;
	}
	advancedSearch(array, prop, newProp, value, newValue) {
		let filtered = array.filter(function(item) {
			return item[prop] == value && item[newProp] == newValue;
		});

		return filtered;
	}
	convert() {
		const datatypes = {
			armors: "./source_data/armors",
			charms: "./source_data/charms",
			decorations: "./source_data/decorations",
			items: "./source_data/items",
			locations: "./source_data/locations",
			monsters: "./source_data/monsters",
			quests: "./source_data/quests",
			skills: "./source_data/skills",
			weapons: "./source_data/weapons"
		};

		fs.readdir(datatypes.armors, (err, files) => {
			if (err) return console.error(err);
			files.forEach(file => {
				const name = file.split(".")[0];
				if (!file.endsWith(".csv")) return;

				this.write({
					delim: ",",
					input: `${datatypes.armors}/${file}`,
					output: `./source_json/armors/${name}.json`
				});
			});
		});

		fs.readdir(datatypes.charms, (err, files) => {
			if (err) return console.error(err);
			files.forEach(file => {
				const name = file.split(".")[0];
				if (!file.endsWith(".csv")) return;

				this.write({
					delim: ",",
					input: `${datatypes.charms}/${file}`,
					output: `./source_json/charms/${name}.json`
				});
			});
		});

		fs.readdir(datatypes.decorations, (err, files) => {
			if (err) return console.error(err);
			files.forEach(file => {
				const name = file.split(".")[0];
				if (!file.endsWith(".csv")) return;

				this.write({
					delim: ",",
					input: `${datatypes.decorations}/${file}`,
					output: `./source_json/decorations/${name}.json`
				});
			});
		});

		fs.readdir(datatypes.items, (err, files) => {
			if (err) return console.error(err);
			files.forEach(file => {
				const name = file.split(".")[0];
				if (!file.endsWith(".csv")) return;

				this.write({
					delim: ",",
					input: `${datatypes.items}/${file}`,
					output: `./source_json/items/${name}.json`
				});
			});
		});

		fs.readdir(datatypes.locations, (err, files) => {
			if (err) return console.error(err);
			files.forEach(file => {
				const name = file.split(".")[0];
				if (!file.endsWith(".csv")) return;

				this.write({
					delim: ",",
					input: `${datatypes.locations}/${file}`,
					output: `./source_json/locations/${name}.json`
				});
			});
		});

		fs.readdir(datatypes.monsters, (err, files) => {
			if (err) return console.error(err);
			files.forEach(file => {
				const name = file.split(".")[0];
				if (!file.endsWith(".csv")) return;

				this.write({
					delim: ",",
					input: `${datatypes.monsters}/${file}`,
					output: `./source_json/monsters/${name}.json`
				});
			});
		});

		fs.readdir(datatypes.quests, (err, files) => {
			if (err) return console.error(err);
			files.forEach(file => {
				const name = file.split(".")[0];
				if (!file.endsWith(".csv")) return;

				this.write({
					delim: ",",
					input: `${datatypes.quests}/${file}`,
					output: `./source_json/quests/${name}.json`
				});
			});
		});

		fs.readdir(datatypes.skills, (err, files) => {
			if (err) return console.error(err);
			files.forEach(file => {
				const name = file.split(".")[0];
				if (!file.endsWith(".csv")) return;

				this.write({
					delim: ",",
					input: `${datatypes.skills}/${file}`,
					output: `./source_json/skills/${name}.json`
				});
			});
		});

		fs.readdir(datatypes.weapons, (err, files) => {
			if (err) return console.error(err);
			files.forEach(file => {
				const name = file.split(".")[0];
				if (!file.endsWith(".csv")) return;

				this.write({
					delim: ",",
					input: `${datatypes.weapons}/${file}`,
					output: `./source_json/weapons/${name}.json`
				});
			});
		});
	}
	write(data = { delim: `,`, input: "file.csv", output: "file.json" }) {
		csv.fieldDelimiter(data.delim).getJsonFromCsv(data.input);
		csv.formatValueByType().getJsonFromCsv(data.input);
		csv.generateJsonFileFromCsv(data.input, data.output);
	}
}

module.exports = new ChunkUtil();
