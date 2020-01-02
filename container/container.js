module.exports = {
    structure: function (funcObj) {
        if (funcObj == undefined || funcObj == null || funcObj == '' || funcObj == ' ') throw `funcObj is not properly defined`;
        for (let k in funcObj) {
            funcObj[k]();
        }
    },
    interval: function (vars = {}) {
        if (vars.interval == null || vars.interval == undefined || vars.interval == '' || vars.interval == ' ') return console.log('Interval hasn\'t been set');

        setInterval(() => {
            if (vars.func == null || vars.func == undefined || vars.func == '' || vars.func == ' ') return;

            vars.func();
        }, vars.interval);
    },
    mem: function () {
        let memory = process.memoryUsage().heapUsed / 1024 / 1024;
        return Math.round(memory * 100) / 100;
    },
    map: function () {
        this.collection = function (database, customMapformat = false, funcObj) {
            const map = new Map;

            if (customMapformat) {
                Object.entries(database).forEach(([key, value]) => {
                    map.set(value[customMapformat['key']], value[customMapformat['value']]);
                });
            } else {
                for (const i of Object.keys(database)) {
                    map.set(i, database[i]);
                }
            }

            return map;
        }

        this.alias = function (input, map, customMapformat = false) {
            let parsedInput = input.toLowerCase().replace(' ', '');

            for (let [key, value] of map.entries()) {
                if (value[customMapformat['key']] && value[customMapformat['key']].includes(parsedInput) && parsedInput.length > 0) {
                    return key;
                } else if (key.includes(parsedInput)) {
                    return key;
                }
            }
        }

        this.get = function (input, map, type, nameType = false) {
            let parsedInput = input.toLowerCase().replace(' ', '');
            if (!map.has(parsedInput)) {
                const similarItems = new Array();

                for (let [key, value] of map.entries()) {
                    if (nameType) {
                        console.log(key)
                        if (similarity(key, parsedInput) >= 0.5) {
                            similarItems.push(value[nameType['key']]);
                        }
                    }
                }

                if (similarItems.length > 0) {
                    return [`\nDid you mean: \`${similarItems.join(', ')}\`?`, false];
                } else {
                    return [`That ${type} doesn\'t seem to exist!`, false];
                }
            } else if (map.has(parsedInput)) {
                const data = map.get(parsedInput);

                return [data, true];
            }
        }
    },
    date: function () {
        this.checkDays = function (date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days == 1 ? " day" : " days") + " ago";
        }
    },
}

function similarity(str1, str2) {
    let longer = str1;
    let shorter = str2;
    if (str1.length < str2.length) {
        longer = str2;
        shorter = str1;
    }
    const longerLength = longer.length;
    if (longerLength == 0) {
        return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(str1, str2) {
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();

    const costs = new Array();
    for (let i = 0; i <= str1.length; i++) {
        let lastValue = i;
        for (let j = 0; j <= str2.length; j++) {
            if (i == 0) {
                costs[j] = j;
            }
            else if (j > 0) {
                let newValue = costs[j - 1];
                if (str1.charAt(i - 1) != str2.charAt(j - 1)) {
                    newValue = Math.min(Math.min(newValue, lastValue),
                        costs[j]) + 1;
                }
                costs[j - 1] = lastValue;
                lastValue = newValue;
            }
        }
        if (i > 0) {
            costs[str2.length] = lastValue;
        }
    }
    return costs[str2.length];
}