module.exports = {
    structure: function (funcObj) {
        if (funcObj == undefined || funcObj == null || funcObj == '' || funcObj == ' ') throw `funcObj is not properly defined`;
        for (let k in funcObj) {
            funcObj[k]();
        }
    },
    sharder: function () {
        this.start = function (vars = {}) {
            const Discord = require('discord.js');
            if (vars.dir == '' || vars.dir == ' ' || vars.dir == null || vars.dir == undefined) throw `Start directory is not properly defined`;
            if (vars.token == '' || vars.token == ' ' || vars.token == null || vars.token == undefined) throw `Token is not properly defined`;

            const manager = new Discord.ShardingManager(vars.dir, { token: vars.token, autoSpawn: vars.auto });

            if (vars.auto) {
                console.log('Spawning recommended amount of shards.');
                manager.spawn();
            } else {
                console.log(`Spawning ${vars.shards} shard(s)`);
                manager.spawn(vars.shards);
            }

            manager.on('launch', shard => console.log(`[SHARD] Shard ${shard.id} / ${manager.totalShards}`));
            console.log(`Launched ${vars.shards} shard(s)`);
        }

        this.log = function (vars = {}) {
            if (vars.client == '' || vars.client == ' ' || vars.client == null || vars.client == undefined) throw `Client is not properly defined`;
            if (vars.moment == '' || vars.moment == ' ' || vars.moment == null || vars.moment == undefined) throw `Moment is not properly defined`;

            if (vars.client.shard.id == 0) {
                console.log(`-- ${vars.moment().utc().format('MMMM Do')}, ${vars.moment().utc().format('hh:mm a')} --`);
                console.log(`Shard ${vars.client.shard.id} ready!`);
            }
        }

        this.data = function (vars = {}) {
            if (vars.client == '' || vars.client == ' ' || vars.client == null || vars.client == undefined) throw `Client is not properly defined`;

            const promises = [
                vars.client.shard.fetchClientValues('guilds.size'),
                vars.client.shard.broadcastEval('this.guilds.reduce((prev, guild) => prev + guild.memberCount, 0)')
            ];

            return Promise.all(promises).then(results => {
                const totalGuilds = results[0].reduce((prev, guildCount) => prev + guildCount, 0);
                const totalMembers = results[1].reduce((prev, memberCount) => prev + memberCount, 0);

                return [totalGuilds, totalMembers];
            }).catch(console.error);
        }

        this.mem = function (vars = {}) {
            let memory = process.memoryUsage().heapUsed / 1024 / 1024;

            setInterval(() => {
                console.log(`[CONTAINER] System using approx. ${Math.round(memory * 100) / 100} MB`);
            }, vars.interval);
        }

        this.handle = function (vars = {}) {
            vars.fs.readdir(vars.dir, (err, files) => {
                if (err) return console.error(err);
                files.forEach(file => {
                    if (!file.endsWith(vars.ending)) return;
                    const props = require(`.${vars.dir}${file}`);
                    const commandName = file.split('.')[0];

                    if (vars.func == null || vars.func == undefined || vars.func == '' || vars.func == ' ') return;
                    vars.func(commandName, props);
                });
            });
        }
    },
    tags: function () {
        this.parseTagDesc = function (string, funcObj) {
            string2 = string;

            brackets = { '{': [], '}': [] };
            for (bracket in brackets) {
                for (charIndex in string) {
                    if (string[charIndex] == bracket) brackets[bracket].push(charIndex);
                }
            }

            if (brackets['{'].length != brackets['}'].length) return 'Parsing Error: not closing brackets properly';

            for (let i = 0; i < brackets['{'].length; i++) {
                start = parseInt(brackets['{'][i]) + 1;
                end = parseInt(brackets['}'][i]);
                innerBrackets = string.substring(start, end);

                if (!(innerBrackets.includes(':'))) {
                    if ((innerBrackets in funcObj) && (typeof funcObj[innerBrackets] != 'function')) string2 = string2.replace(`{${innerBrackets}}`, funcObj[innerBrackets]);
                } else {
                    let [funcName, args] = innerBrackets.split(':');

                    if (args.split('|').includes('')) return `Parse Error: too many '|' in ${innerBrackets}`;
                    args = args.split('|');

                    if (!(funcName in funcObj)) return `Function Error: Invalid function name ${funcName} in ${innerBrackets}`;

                    funcValue = funcObj[funcName](args);
                    if (funcValue == undefined) return `Function Error: ${funcName} has no return value`;

                    string2 = string2.replace(`{${innerBrackets}}`, funcValue);
                }
            }
            return string2;
        }

        this.add = function (server, name, standardDescription) {
            let description = standardDescription.join(' ');
            let converted = name.toLowerCase().replace(' ', '');
            if (converted == null || converted == '') return;
            const tags = require('../databases/tags.json');

            if (!(server in tags)) {
                tags[server] = {
                    id: server,
                    tags: {}
                };
            }

            if (!(converted in tags[server]['tags'])) {
                tags[server]['tags'][converted] = {
                    "name": converted,
                    "description": description
                };
            } else {
                return `Sorry but the tag ${converted} already exists.`;
            }

            fs.writeFile('./databases/tags.json', JSON.stringify(tags, null, 2), (err) => {
                if (err) console.log(err);
            });

            return `Tag ${converted} was created!`;

        }

        this.update = function (server, name, standardDescription) {
            let description = standardDescription.toString();
            let converted = name.toLowerCase().replace(' ', '');
            if (converted == null || converted == '') return;
            const tags = require('../databases/tags.json');

            if (!(server in tags)) {
                tags[server] = {
                    id: server,
                    tags: {}
                }
            }

            if ((converted in tags[server]['tags'])) {
                tags[server]['tags'][converted]['description'] = description;
            } else {
                return `Sorry but ${converted} tag doesn't exist!`;
            }

            fs.writeFile('./databases/tags.json', JSON.stringify(tags, null, 2), (err) => {
                if (err) console.log(err);
            });

            return `Updated tag ${converted}`;
        }

        this.remove = function (server, name) {
            let converted = name.toLowerCase().replace(' ', '');
            if (converted == null || converted == '') return;
            const tags = require('../databases/tags.json');

            if (!(server in tags)) {
                tags[server] = {
                    id: server,
                    tags: {}
                };
            }

            if (converted in tags[server]['tags']) {
                delete tags[server]['tags'][converted];
            } else {
                return `Sorry but the tag ${converted} doesn't exists.`;
            }

            fs.writeFile('./databases/tags.json', JSON.stringify(tags, null, 2), (err) => {
                if (err) console.log(err);
            });

            return `Removed tag ${converted}`;
        }

        this.use = function (server, name) {
            let converted = name.toLowerCase().replace(' ', '');
            if (converted == null || converted == '') return;
            const tags = require('../databases/tags.json');

            if (!(server in tags)) {
                tags[server] = {
                    id: server,
                    tags: {}
                };
            }

            if (!(converted in tags[server]['tags'])) {
                return `Sorry but ${converted} doesnt exist`;
            }

            return `${converted}: ${tags[server]['tags'][converted]['description']}`;
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
                } else if(key.includes(parsedInput)) {
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
                        if(similarity(key, parsedInput) >= 0.5) {
                            similarItems.push(value[nameType['key']]);
                        }
                        //console.log(value[nameType['key']]);
                    }
                }

                /*
                for (const key of map.keys()) {
                    if (similarity(key, parsedInput) >= 0.5) {
                        similarItems.push(key);
                    }
                }*/

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