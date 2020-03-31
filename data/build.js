const fs = require('fs');
const fetch = require('node-fetch');
const utils = require('./utils');
const csv = require('./libraries/csvToJson');

// Base URls used to retrieve data via the API
const itemsURL = `https://mhw-db.com/items`;
const armorsURL = `https://mhw-db.com/armor/sets`;
const decorationsURL = `https://mhw-db.com/decorations`;
const skillsURL = `https://mhw-db.com/skills`;
const weaponsURL = `https://mhw-db.com/weapons`;
const armorPiecesURL = `https://mhw-db.com/armor`;

class Build {
  // Async & await fetching data from the url
  async getData(url) {
    const response = await fetch(url);
    return response.json();
  }

  // TODO: remove, this is redundant and is handled in utils
  async buildJSON(
    data = { delim: `,`, input: 'file.csv', output: 'file.json' },
    advanced
  ) {
    if (!advanced) {
      csv.fieldDelimiter(data.delim).getJsonFromCsv(data.input);
      csv.formatValueByType().getJsonFromCsv(data.input);
      csv.generateJsonFileFromCsv(data.input, data.output);
    } else {
      csv.fieldDelimiter(data.delim).getJsonFromCsv(data.input);
      csv.formatValueByType().getJsonFromCsv(data.input);
      csv.generateJsonFileFromCsv(data.input, data.output);
    }
  }

  // Creates an object and then writes that object to a specified file
  // Current build of weapons, doesn't rely on node-fetch as it takes from the generated json via the parser
  async weapons(
    writeTo,
    advanced,
    extended = './src/json/weapons/weapons.json'
  ) {
    const weaponsDatabase = require(extended);
    const weaponsDatabaseIterator = [];
    for (const i of Object.keys(weaponsDatabase)) {
      weaponsDatabaseIterator.push(weaponsDatabase[i]);
    }
    const db = {};
    for (let key of weaponsDatabaseIterator) {
      let affinity = '-';
      if (key.affinity) {
        if (key.affinity == 0) affinity = '-';
        affinity = key.affinity;
      }

      let defense = '-';
      if (key.defense) {
        if (key.defense == 0) defense = '-';
        defense = key.defense;
      }

      let sharpness = '-';
      if (key.durability) {
        if (key.durability) {
          const s = [
            key.durability.red,
            key.durability.orange,
            key.durability.yellow,
            key.durability.green,
            key.durability.blue,
            key.durability.white,
            key.durability.purple
          ];

          if (!advanced) {
            sharpness = `Red: ${s[0]}\nOrange: ${s[1]}\nYellow: ${s[2]}\nGreen: ${s[3]}\nBlue: ${s[4]}\nWhite: ${s[5]}\nPurple: ${s[6]}`;
          } else {
            sharpness = {
              red: s[0],
              orange: s[1],
              yellow: s[2],
              green: s[3],
              blue: s[4],
              white: s[5],
              purple: s[6]
            };
          }
        }
      }

      let elderseal = '-';
      if (key.elderseal) {
        if (key.elderseal == null) elderseal = '-';
        elderseal = key.elderseal;
      }

      let shelling = '-';
      if (key.shelling) {
        if (!advanced) {
          shelling = `${key.shelling.type} LV${key.shelling.level}`;
        } else {
          shelling = {
            type: key.shelling.type,
            level: key.shelling.level
          };
        }
      }

      let specialAmmo = '-';
      if (key.special_ammo) {
        specialAmmo = key.special_ammo;
      }

      let deviation = '-';
      if (key.deviation) {
        if (key.deviation == 3) {
          deviation = 'high';
        } else if (key.deviation == 2) {
          deviation = 'average';
        } else if (key.deviation == 1) {
          deviation = 'low';
        }
      }

      let ammos = [];
      if (key.ammos) {
        for (const i in key.ammos) {
          let levelOne = 0;
          if (key.ammos[i].capacities[0]) {
            levelOne = key.ammos[i].capacities[0];
          }

          let levelTwo = 0;
          if (key.ammos[i].capacities[1]) {
            levelTwo = key.ammos[i].capacities[1];
          }

          let levelThree = 0;
          if (key.ammos[i].capacities[2]) {
            levelThree = key.ammos[i].capacities[2];
          }

          if (levelOne == 0 && levelTwo == 0 && levelThree) {
            ammos = [];
          }

          if (!advanced) {
            ammos.push(
              `${key.ammos[i].type}\nLV1: ${levelOne}\nLV2: ${levelTwo}\nLV3: ${levelThree}`
            );
          } else {
            let obj = {};
            obj = {
              type: key.ammos[i].type,
              lv1: levelOne,
              lv2: levelTwo,
              lv3: levelThree
            };

            ammos.push(obj);
          }
        }
      }

      let elements = [];
      if (key.elements) {
        for (const i in key.elements) {
          if (!advanced) {
            elements.push(
              `${key.elements[i].type.toLowerCase()}: ${
                key.elements[i].damage
              } damage`
            );
          } else {
            let obj = {};
            obj = {
              type: key.elements[i].type.toLowerCase(),
              damage: key.elements[i].damage
            };

            elements.push(obj);
          }
        }
      }

      let slots = [];
      if (key.slots) {
        for (const i in key.slots) {
          if (!advanced) {
            slots.push(`Rank: ${key.slots[i].rank}`);
          } else {
            let obj = {};
            obj = {
              rank: key.slots[i].rank
            };

            slots.push(obj);
          }
        }
      }

      let coatings = '-';
      if (key.coatings) {
        coatings = key.coatings;
      }

      let damageType = '-';
      if (key.type) {
        if (key.type == 'hammer') {
          damageType = 'blunt';
        } else if (
          key.type == 'light-bowgun' ||
          key.type == 'heavy-bowgun' ||
          key.type == 'bow'
        ) {
          damageType = 'projectile';
        } else if (key.type == null) {
          damageType = '-';
        } else {
          damageType = 'sever';
        }
      }

      let crafting = [];
      let upgrade = [];
      if (key.crafting) {
        if (key.crafting.type != null && key.crafting.type == 'Create') {
          for (const i in key.crafting.materials) {
            if (!advanced) {
              crafting.push(
                `${key.crafting.materials[i].name} (x${key.crafting.materials[i].quantity})`
              );
            } else {
              let obj = {};
              obj = {
                name: key.crafting.materials[i].name,
                quantity: key.crafting.materials[i].quantity
              };

              crafting.push(obj);
            }
          }
        }

        if (key.crafting.type != null && key.crafting.type == 'Upgrade') {
          for (const i in key.crafting.materials) {
            if (!advanced) {
              crafting.push(
                `${key.crafting.materials[i].name} (x${key.crafting.materials[i].quantity})`
              );
            } else {
              let obj = {};
              obj = {
                name: key.crafting.materials[i].name,
                quantity: key.crafting.materials[i].quantity
              };

              upgrade.push(obj);
            }
          }
        }
      }

      if (!Array.isArray(ammos) || !ammos.length) {
        ammos = '-';
      }

      if (!Array.isArray(elements) || !elements.length) {
        elements = '-';
      }

      if (!Array.isArray(slots) || !slots.length) {
        slots = '-';
      }

      if (!Array.isArray(coatings) || !coatings.length) {
        coatings = '-';
      }

      if (!Array.isArray(crafting) || !crafting.length) {
        crafting = '-';
      }

      if (!Array.isArray(upgrade) || !upgrade.length) {
        upgrade = '-';
      }

      const weaponsRatio = new Map([
        ['hammer', 5.2],
        ['great-sword', 4.8],
        ['hunting-horn', 4.2],
        ['charge-blade', 3.6],
        ['switch-axe', 3.5],
        ['long-sword', 3.3],
        ['insect-glaive', 3.1],
        ['lance', 2.3],
        ['gunlance', 2.3],
        ['heavy-bowgun', 1.5],
        ['sword-and-shield', 1.4],
        ['dual-blades', 1.4],
        ['light-bowgun', 1.3],
        ['bow', 1.2]
      ]);
      let rawAttack = '-';
      if (key.attack) {
        rawAttack = key.attack / weaponsRatio.get(key.type);
      }

      db[key.name.toLowerCase().replace(/ /g, '')] = {
        name: key.name,
        type: key.type,
        rarity: key.rarity,
        displayAttack: key.attack,
        rawAttack: rawAttack,
        damageType: damageType,
        affinity: affinity,
        defense: defense,
        sharpness: {
          base: sharpness
        },
        elderseal: elderseal,
        shelling: shelling,
        specialAmmo: specialAmmo,
        deviation: deviation,
        ammos: ammos,
        elements: elements,
        slots: slots,
        coatings: coatings,
        crafting: crafting,
        upgrade: upgrade
      };
    }

    utils.writeFile(writeTo, db);
  }

  // Creates an object and then writes that object to a specified file
  // This is considered ~legacy~ but is kept around in case of data being different compared to the two
  async weaponsApi(writeTo, advanced) {
    const weaponsAPIDatabase = await this.getData(weaponsURL);
    const db = {};

    for (let key of weaponsAPIDatabase) {
      let affinity = '-';
      if (key.attributes.affinity) {
        if (key.attributes.affinity == 0) affinity = '-';
        affinity = key.attributes.affinity;
      }

      let defense = '-';
      if (key.attributes.defense) {
        if (key.attributes.defense == 0) defense = '-';
        defense = key.attributes.defense;
      }

      let sharpness = '-';
      let handicraft1 = '-';
      let handicraft2 = '-';
      let handicraft3 = '-';
      let handicraft4 = '-';
      let handicraft5 = '-';
      if (key.durability) {
        if (key.durability[0]) {
          const s = [
            key.durability[0].red,
            key.durability[0].orange,
            key.durability[0].yellow,
            key.durability[0].green,
            key.durability[0].blue,
            key.durability[0].white,
            key.durability[0].purple
          ];

          if (!advanced) {
            sharpness = `Red: ${s[0]}\nOrange: ${s[1]}\nYellow: ${s[2]}\nGreen: ${s[3]}\nBlue: ${s[4]}\nWhite: ${s[5]}\nPurple: ${s[6]}`;
          } else {
            sharpness = {
              red: s[0],
              orange: s[1],
              yellow: s[2],
              green: s[3],
              blue: s[4],
              white: s[5],
              purple: s[6]
            };
          }
        }

        if (key.durability[1]) {
          const s = [
            key.durability[1].red,
            key.durability[1].orange,
            key.durability[1].yellow,
            key.durability[1].green,
            key.durability[1].blue,
            key.durability[1].white,
            key.durability[1].purple
          ];

          if (!advanced) {
            handicraft1 = `Red: ${s[0]}\nOrange: ${s[1]}\nYellow: ${s[2]}\nGreen: ${s[3]}\nBlue: ${s[4]}\nWhite: ${s[5]}\nPurple: ${s[6]}`;
          } else {
            handicraft1 = {
              red: s[0],
              orange: s[1],
              yellow: s[2],
              green: s[3],
              blue: s[4],
              white: s[5],
              purple: s[6]
            };
          }
        }

        if (key.durability[2]) {
          const s = [
            key.durability[2].red,
            key.durability[2].orange,
            key.durability[2].yellow,
            key.durability[2].green,
            key.durability[2].blue,
            key.durability[2].white,
            key.durability[2].purple
          ];

          if (!advanced) {
            handicraft2 = `Red: ${s[0]}\nOrange: ${s[1]}\nYellow: ${s[2]}\nGreen: ${s[3]}\nBlue: ${s[4]}\nWhite: ${s[5]}\nPurple: ${s[6]}`;
          } else {
            handicraft2 = {
              red: s[0],
              orange: s[1],
              yellow: s[2],
              green: s[3],
              blue: s[4],
              white: s[5],
              purple: s[6]
            };
          }
        }

        if (key.durability[3]) {
          const s = [
            key.durability[3].red,
            key.durability[3].orange,
            key.durability[3].yellow,
            key.durability[3].green,
            key.durability[3].blue,
            key.durability[3].white,
            key.durability[3].purple
          ];

          if (!advanced) {
            handicraft3 = `Red: ${s[0]}\nOrange: ${s[1]}\nYellow: ${s[2]}\nGreen: ${s[3]}\nBlue: ${s[4]}\nWhite: ${s[5]}\nPurple: ${s[6]}`;
          } else {
            handicraft3 = {
              red: s[0],
              orange: s[1],
              yellow: s[2],
              green: s[3],
              blue: s[4],
              white: s[5],
              purple: s[6]
            };
          }
        }

        if (key.durability[4]) {
          const s = [
            key.durability[4].red,
            key.durability[4].orange,
            key.durability[4].yellow,
            key.durability[4].green,
            key.durability[4].blue,
            key.durability[4].white,
            key.durability[4].purple
          ];

          if (!advanced) {
            handicraft4 = `Red: ${s[0]}\nOrange: ${s[1]}\nYellow: ${s[2]}\nGreen: ${s[3]}\nBlue: ${s[4]}\nWhite: ${s[5]}\nPurple: ${s[6]}`;
          } else {
            handicraft4 = {
              red: s[0],
              orange: s[1],
              yellow: s[2],
              green: s[3],
              blue: s[4],
              white: s[5],
              purple: s[6]
            };
          }
        }

        if (key.durability[5]) {
          const s = [
            key.durability[5].red,
            key.durability[5].orange,
            key.durability[5].yellow,
            key.durability[5].green,
            key.durability[5].blue,
            key.durability[5].white,
            key.durability[5].purple
          ];

          if (!advanced) {
            handicraft5 = `Red: ${s[0]}\nOrange: ${s[1]}\nYellow: ${s[2]}\nGreen: ${s[3]}\nBlue: ${s[4]}\nWhite: ${s[5]}\nPurple: ${s[6]}`;
          } else {
            handicraft5 = {
              red: s[0],
              orange: s[1],
              yellow: s[2],
              green: s[3],
              blue: s[4],
              white: s[5],
              purple: s[6]
            };
          }
        }
      }

      let elderseal = '-';
      if (key.elderseal) {
        if (key.elderseal == null) elderseal = '-';
        elderseal = key.elderseal;
      }

      let shelling = '-';
      if (key.shelling) {
        if (!advanced) {
          shelling = `${key.shelling.type} LV${key.shelling.level}`;
        } else {
          shelling = {
            type: key.shelling.type,
            level: key.shelling.level
          };
        }
      }

      let specialAmmo = '-';
      if (key.specialAmmo) {
        specialAmmo = key.specialAmmo;
      }

      let deviation = '-';
      if (key.deviation) {
        deviation = key.deviation;
      }

      let ammos = [];
      if (key.ammo) {
        for (const i in key.ammo) {
          let levelOne = 0;
          if (key.ammo[i].capacities[0]) {
            levelOne = key.ammo[i].capacities[0];
          }

          let levelTwo = 0;
          if (key.ammo[i].capacities[1]) {
            levelTwo = key.ammo[i].capacities[1];
          }

          let levelThree = 0;
          if (key.ammo[i].capacities[2]) {
            levelThree = key.ammo[i].capacities[2];
          }

          if (levelOne == 0 && levelTwo == 0 && levelThree) {
            ammos = [];
          }

          if (!advanced) {
            ammos.push(
              `${key.ammo[i].type}\nLV1: ${levelOne}\nLV2: ${levelTwo}\nLV3: ${levelThree}`
            );
          } else {
            let obj = {};
            obj = {
              type: key.ammo[i].type,
              lv1: levelOne,
              lv2: levelTwo,
              lv3: levelThree
            };

            ammos.push(obj);
          }
        }
      }

      let elements = [];
      if (key.elements) {
        for (const i in key.elements) {
          if (!advanced) {
            elements.push(
              `${key.elements[i].type}: ${key.elements[i].damage} damage`
            );
          } else {
            let obj = {};
            obj = {
              type: key.elements[i].type,
              damage: key.elements[i].damage
            };

            elements.push(obj);
          }
        }
      }

      let slots = [];
      if (key.slots) {
        for (const i in key.slots) {
          if (!advanced) {
            slots.push(`Rank: ${key.slots[i].rank}`);
          } else {
            let obj = {};
            obj = {
              rank: key.slots[i].rank
            };

            slots.push(obj);
          }
        }
      }

      let coatings = '-';
      if (key.coatings) {
        coatings = key.coatings;
      }

      let damageType = '-';
      if (key.damageType) {
        if (key.damageType == null) damage = '-';
        damageType = key.damageType;
      }

      let crafting = [];
      let upgrade = [];
      if (key.crafting) {
        if (key.crafting.craftingMaterials) {
          for (const i in key.crafting.craftingMaterials) {
            if (!advanced) {
              crafting.push(
                `${key.crafting.craftingMaterials[i].item.name} (x${key.crafting.craftingMaterials[i].quantity})`
              );
            } else {
              let obj = {};
              obj = {
                name: key.crafting.craftingMaterials[i].item.name,
                quantity: key.crafting.craftingMaterials[i].quantity
              };

              crafting.push(obj);
            }
          }
        }

        if (key.crafting.upgradeMaterials) {
          for (const i in key.crafting.upgradeMaterials) {
            if (!advanced) {
              crafting.push(
                `${key.crafting.upgradeMaterials[i].item.name} (x${key.crafting.upgradeMaterials[i].quantity})`
              );
            } else {
              let obj = {};
              obj = {
                name: key.crafting.upgradeMaterials[i].item.name,
                quantity: key.crafting.upgradeMaterials[i].quantity
              };

              upgrade.push(obj);
            }
          }
        }
      }

      if (!Array.isArray(ammos) || !ammos.length) {
        ammos = '-';
      }

      if (!Array.isArray(elements) || !elements.length) {
        elements = '-';
      }

      if (!Array.isArray(slots) || !slots.length) {
        slots = '-';
      }

      if (!Array.isArray(coatings) || !coatings.length) {
        coatings = '-';
      }

      if (!Array.isArray(crafting) || !crafting.length) {
        crafting = '-';
      }

      if (!Array.isArray(upgrade) || !upgrade.length) {
        upgrade = '-';
      }

      db[
        key.name
          .toLowerCase()
          .replace(/ /g, '')
          .split('"')
          .join('')
      ] = {
        name: key.name.split('"').join(''),
        type: key.type,
        rarity: key.rarity,
        displayAttack: key.attack.display,
        rawAttack: key.attack.raw,
        damageType: damageType,
        affinity: affinity,
        defense: defense,
        sharpness: {
          base: sharpness,
          h1: handicraft1,
          h2: handicraft2,
          h3: handicraft3,
          h4: handicraft4,
          h5: handicraft5
        },
        elderseal: elderseal,
        shelling: shelling,
        specialAmmo: specialAmmo,
        deviation: deviation,
        ammos: ammos,
        elements: elements,
        slots: slots,
        coatings: coatings,
        crafting: crafting,
        upgrade: upgrade
      };
    }

    utils.writeFile(writeTo, db);
  }

  // Creates an object and then writes that object to a specified file
  async items(writeTo, extended = './src/json/items/items.json') {
    const itemsAPIDatabase = await this.getData(itemsURL);
    const itemsData = require(extended);

    const db = {};

    const itemsDataMap = new Map();
    for (const i of Object.keys(itemsData)) {
      itemsDataMap.set(itemsData[i].name, itemsData[i]);
    }

    for (let key of itemsAPIDatabase) {
      let buyPrice = 0;

      if (itemsDataMap.has(key.name)) {
        const item = itemsDataMap.get(key.name);
        buyPrice = item.buy_price;
      }

      db[key.name.toLowerCase().replace(/ /g, '')] = {
        name: key.name,
        description: key.description.replace(/\n/g, ''),
        rarity: key.rarity,
        carryLimit: key.carryLimit,
        buy: buyPrice,
        value: key.value
      };
    }

    const items = new Map();
    for (const i of Object.keys(db)) {
      items.set(i, db[i]);
    }

    utils.writeFile(writeTo, db);
  }

  async decorations(writeTo, advanced) {
    const decorationsAPIDatabase = await this.getData(decorationsURL);
    const db = {};

    for (let key of decorationsAPIDatabase) {
      let skills = [];

      for (let i of key.skills) {
        if (!advanced) {
          skills.push(
            `${i.skillName}: ${i.description.replace(/\n/g, '')} LV${i.level}`
          );
        } else {
          let obj = {};
          obj = {
            name: i.skillName,
            description: i.description.replace(/\n/g, ''),
            level: i.level
          };

          skills.push(obj);
        }

        let nameString = key.name.toLowerCase().replace(/ /g, '');
        if (!advanced) {
          db[nameString] = {
            name: key.name,
            rarity: key.rarity,
            slot: key.slot,
            skills: skills
          };
        } else {
          db[nameString.split('/').join('+')] = {
            name: key.name,
            rarity: key.rarity,
            slot: key.slot,
            skills: skills
          };
        }
      }
    }

    utils.writeFile(writeTo, db);
  }

  // Creates an object and then writes that object to a specified file
  async skills(writeTo, advanced) {
    const skillAPIDatabase = await this.getData(skillsURL);
    const db = {};

    for (let key of skillAPIDatabase) {
      let ranks = [];

      for (let i of key.ranks) {
        if (!advanced) {
          ranks.push(`LV${i.level}: ${i.description.replace(/\n/g, '')}`);
        } else {
          let obj = {};
          obj = {
            level: i.level,
            description: i.description.replace(/\n/g, '')
          };

          ranks.push(obj);
        }

        db[key.name.toLowerCase().replace(/ /g, '')] = {
          name: key.name,
          description: key.description.replace(/\n/g, ''),
          ranks: ranks
        };
      }
    }

    utils.writeFile(writeTo, db);
  }

  // Creates an object and then writes that object to a specified file
  async armors(writeTo, advanced) {
    const armorsAPIDatabase = await this.getData(armorsURL);
    const db = {};

    for (let key of armorsAPIDatabase) {
      let totalDefense = 0;
      let maxDefense = 0;
      let augDefense = 0;

      let fireResistance = 0;
      let waterResistance = 0;
      let thunderResistance = 0;
      let iceResistance = 0;
      let dragonResistance = 0;

      let armorSkills = [];
      let setBonus = [];

      let slots = [];
      let pieces = [];

      if (key.bonus) {
        if (key.bonus.name) {
          for (let i of key.bonus.ranks) {
            if (!advanced) {
              setBonus.push(
                `${key.bonus.name}: ${i.description.replace(/\n/g, '')} (${
                  i.pieces
                } pieces)`
              );
            } else {
              let obj = {};
              obj = {
                name: key.bonus.name,
                description: i.description.replace(/\n/g, ''),
                pieces: i.pieces
              };

              setBonus.push(obj);
            }
          }
        }
      }

      if (key.pieces) {
        for (const i in key.pieces) {
          totalDefense += key.pieces[i].defense.base;
          maxDefense += key.pieces[i].defense.max;
          augDefense += key.pieces[i].defense.augmented;

          fireResistance += key.pieces[i].resistances.fire;
          waterResistance += key.pieces[i].resistances.water;
          thunderResistance += key.pieces[i].resistances.thunder;
          iceResistance += key.pieces[i].resistances.ice;
          dragonResistance += key.pieces[i].resistances.dragon;

          for (const v in key.pieces[i].skills) {
            if (!advanced) {
              armorSkills.push(
                `${key.pieces[i].skills[v].skillName} LV${key.pieces[i].skills[v].level}`
              );
            } else {
              let obj = {};
              obj = {
                piece: key.pieces[i].name,
                name: key.pieces[i].skills[v].skillName,
                rank: key.pieces[i].skills[v].level
              };

              armorSkills.push(obj);
            }
          }

          if (!advanced) {
            pieces.push(`${key.pieces[i].name} (${key.pieces[i].type})`);
          } else {
            let obj = {
              name: key.pieces[i].name,
              type: key.pieces[i].type
            };

            pieces.push(obj);
          }

          for (const v in key.pieces[i].slots) {
            if (
              key.pieces[i].slots.length &&
              Array.isArray(key.pieces[i].slots)
            ) {
              if (!advanced) {
                if (key.pieces[i].type == 'head') {
                  slots.push(
                    `<:ic_equipment_head_base:687395695946104869> Rank: ${key.pieces[i].slots[v].rank}`
                  );
                }

                if (key.pieces[i].type == 'chest') {
                  slots.push(
                    `<:ic_equipment_chest_base:687395693048102927> Rank: ${key.pieces[i].slots[v].rank}`
                  );
                }

                if (key.pieces[i].type == 'gloves') {
                  slots.push(
                    `<:ic_equipment_arm_base:687395691215192091> Rank: ${key.pieces[i].slots[v].rank}`
                  );
                }

                if (key.pieces[i].type == 'waist') {
                  slots.push(
                    `<:ic_equipment_waist_base:687395699062603899> Rank: ${key.pieces[i].slots[v].rank}`
                  );
                }

                if (key.pieces[i].type == 'legs') {
                  slots.push(
                    `<:ic_equipment_leg_base:687395697573888118> Rank: ${key.pieces[i].slots[v].rank}`
                  );
                }
              } else {
                let obj = {};
                obj = {
                  name: key.pieces[i].name,
                  rank: key.pieces[i].slots[v].rank
                };

                slots.push(obj);
              }
            }
          }
        }
      }

      if (!Array.isArray(setBonus) || !setBonus.length) {
        setBonus = '-';
      }

      if (!Array.isArray(slots) || !slots.length) {
        slots = '-';
      }

      let defenses = `Base: ${totalDefense}\nMax: ${maxDefense}\nAugmented: ${augDefense}`;
      let resistances = `🔥 ${fireResistance}\n💧 ${waterResistance}\n⚡ ${thunderResistance}\n❄ ${iceResistance}\n🐉 ${dragonResistance}`;
      if (advanced) {
        db[key.name.toLowerCase().replace(/ /g, '')] = {
          name: key.name,
          rank: key.rank,
          setBonus: setBonus,
          defenses: {
            base: totalDefense,
            max: maxDefense,
            augmented: augDefense
          },
          resistances: {
            fire: fireResistance,
            water: waterResistance,
            thunder: thunderResistance,
            ice: iceResistance,
            dragon: dragonResistance
          },
          pieces: pieces,
          skills: armorSkills,
          slots: slots
        };
      } else {
        db[key.name.toLowerCase().replace(/ /g, '')] = {
          name: key.name,
          setBonus: setBonus,
          defenses: defenses,
          resistances: resistances,
          pieces: pieces,
          skills: armorSkills,
          slots: slots
        };
      }
    }

    utils.writeFile(writeTo, db);
  }

  // Creates an object and then writes that object to a specified file
  async armorPieces(writeTo, advanced) {
    const armorsAPIDatabase = await this.getData(armorPiecesURL);
    const db = {};

    for (let key of armorsAPIDatabase) {
      let skills = [];
      if (key.skills) {
        for (const i in key.skills) {
          if (!advanced) {
            skills.push(
              `${key.skills[i].skillName}: ${key.skills[i].description.replace(
                /\n/g,
                ''
              )} LV${key.skills[i].description.replace(/\n/g, '')}`
            );
          } else {
            let obj = {};
            obj = {
              name: key.skills[i].skillName,
              level: key.skills[i].level,
              description: key.skills[i].description.replace(/\n/g, '')
            };

            skills.push(obj);
          }
        }
      }

      let slots = [];
      if (key.slots) {
        for (const i in key.slots) {
          if (!advanced) {
            slots.push(`Rank: ${key.slots[i].rank}`);
          } else {
            let obj = {};
            obj = {
              rank: key.slots[i].rank
            };

            slots.push(obj);
          }
        }
      }

      let crafting = [];
      if (key.crafting) {
        if (key.crafting.materials) {
          for (const i in key.crafting.materials) {
            if (!advanced) {
              crafting.push(
                `${
                  key.crafting.materials[i].item.name
                }: ${key.crafting.materials[i].item.description.replace(
                  /\n/g,
                  ''
                )} (x${key.crafting.materials[i].quantity})`
              );
            } else {
              let obj = {};
              obj = {
                name: key.crafting.materials[i].item.name,
                description: key.crafting.materials[i].item.description.replace(
                  /\n/g,
                  ''
                ),
                quantity: key.crafting.materials[i].quantity
              };

              crafting.push(obj);
            }
          }
        }
      }

      if (!Array.isArray(skills) || !skills.length) {
        skills = '-';
      }

      if (!Array.isArray(slots) || !slots.length) {
        slots = '-';
      }

      if (!Array.isArray(crafting) || !crafting.length) {
        crafting = '-';
      }

      let base = 0;
      let max = 0;
      let augmented = 0;
      if (key.defense) {
        if (key.defense.base) {
          base = key.defense.base;
        }

        if (key.defense.max) {
          max = key.defense.max;
        }

        if (key.defense.augmented) {
          augmented = key.defense.augmented;
        }
      }

      let fire = 0;
      let water = 0;
      let ice = 0;
      let thunder = 0;
      let dragon = 0;

      if (key.resistances) {
        if (key.resistances.fire) {
          fire = key.resistances.fire;
        }

        if (key.resistances.water) {
          water = key.resistances.water;
        }

        if (key.resistances.ice) {
          ice = key.resistances.ice;
        }

        if (key.resistances.thunder) {
          thunder = key.resistances.thunder;
        }

        if (key.resistances.dragon) {
          dragon = key.resistances.dragon;
        }
      }

      let defenses = `Base: ${base}\nMax: ${max}\nAugmented: ${augmented}`;
      let resistances = `🔥 ${fire}\n💧 ${water}\n⚡ ${thunder}\n❄ ${ice}\n🐉 ${dragon}`;
      if (advanced) {
        db[key.name.toLowerCase().replace(/ /g, '')] = {
          name: key.name,
          rank: key.rank,
          rarity: key.rarity,
          type: key.type,
          defenses: {
            base: base,
            max: max,
            augmented: augmented
          },
          resistances: {
            fire: fire,
            water: water,
            ice: ice,
            thunder: thunder,
            dragon: dragon
          },
          slots: slots,
          skills: skills,
          crafting: crafting
        };
      } else {
        db[key.name.toLowerCase().replace(/ /g, '')] = {
          name: key.name,
          rank: key.rank,
          rarity: key.rarity,
          type: key.type,
          defenses: defenses,
          resistances: resistances,
          slots: slots,
          skills: skills,
          crafting: crafting
        };
      }
    }

    utils.writeFile(writeTo, db);
  }
}

module.exports = new Build();
