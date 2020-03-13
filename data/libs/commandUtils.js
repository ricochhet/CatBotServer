"use strict";

class CommandUtils {
	command(props = [], functionObject) {
		const params = process.argv.slice(2);
		if (!Array.isArray(props) || !props.length)
			throw `props param is not of type array!`;
		if (this.checkArraySimilarities(params, props)) {
			if (typeof functionObject !== "function")
				throw `functionObject param is not of type function!`;
			functionObject(params, props);
		}
	}
	checkArraySimilarities(array, target) {
		return target.every(v => array.includes(v));
	}
}
module.exports = new CommandUtils();
