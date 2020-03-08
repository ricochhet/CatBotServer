const chunkParser = require("./chunkParser");
const chunkUtil = require("./chunkUtils");
const commandUtil = require("./libraries/commandUtils");

commandUtil.command(["--convert-db"], function() {
	chunkUtil.convert();
});

commandUtil.command(["--build-db", "--step1"], function() {
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

commandUtil.command(["--build-db", "--step2"], function() {
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

commandUtil.command(["--build-db", "--noslash"], function() {
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