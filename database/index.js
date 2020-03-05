const chunkParser = require("./chunkParser");
const chunkUtil = require("./chunkUtils");
const commandUtil = require("./libraries/commandUtils");
const dbParser = require("./dbParser");

commandUtil.command(["--convert-db"], function() {
	chunkUtil.convert();
});

commandUtil.command(["--build-db", "--pieces"], function() {
	chunkParser.armorpieces();
	chunkParser.charms();
	chunkParser.decorations();
	chunkParser.items();
	chunkParser.monsters();
	chunkParser.quests();
	chunkParser.skills();
	chunkParser.kinsects();
	chunkParser.weapons();
});

commandUtil.command(["--build-db", "--armors"], function() {
	chunkParser.armors();
	chunkParser.charms();
	chunkParser.decorations();
	chunkParser.items();
	chunkParser.monsters();
	chunkParser.quests();
	chunkParser.skills();
	chunkParser.kinsects();
	chunkParser.weapons();
});

commandUtil.command(["--build-db", "--web"], function() {
	chunkParser.armors();
	chunkParser.charms();
	chunkParser.decorations(true);
	chunkParser.items();
	chunkParser.monsters();
	chunkParser.quests();
	chunkParser.skills();
	chunkParser.kinsects();
	chunkParser.weapons();
});

commandUtil.command(["--build-api", "--i"], function() {
	dbParser.genJSON(
		{
			delim: ",",
			input: "./source_tables/ItemTableFixed - Item.csv",
			output: "./build_api/itemids.json"
		},
		true
	);

	dbParser.genJSON(
		{
			delim: ",",
			input: "./source_tables/Quest IDs - Sheet1.csv",
			output: "./build_api/questids.json"
		},
		true
	);

	dbParser.items("./build_api/items.json", true);
	dbParser.armors("./build_api/armors.json", true);
	dbParser.armorPieces("./build_api/armor_pieces.json", true);
	dbParser.decorations("./build_api/decorations.json", true);
	dbParser.skills("./build_api/skills.json", true);
	dbParser.weapons("./build_api/weapons.json", true);
});

commandUtil.command(["--build-api", "--a"], function() {
	dbParser.genJSON(
		{
			delim: ",",
			input: "./source_tables/ItemTableFixed - Item.csv",
			output: "./build_bot/itemids.json"
		},
		false
	);

	dbParser.genJSON(
		{
			delim: ",",
			input: "./source_tables/Quest IDs - Sheet1.csv",
			output: "./build_bot/questids.json"
		},
		false
	);

	dbParser.items("./build_bot/items.json", false);
	dbParser.armors("./build_bot/armors.json", false);
	dbParser.armorPieces("./build_bot/armor_pieces.json", false);
	dbParser.decorations("./build_bot/decorations.json", false);
	dbParser.skills("./build_bot/skills.json", false);
	dbParser.weapons("./build_bot/weapons.json", false);
});
