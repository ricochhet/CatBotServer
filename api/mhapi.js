const fs = require('fs');
const itemDatabase = require('../databases/parser/items.json');
const armorDatabase = require('../databases/parser/armors.json');

const itemsDB = require('../databases/mhwdb/items.json');
const itemsParse = require('../databases/parser/items.json');
const armorsDB = require('../databases/mhwdb/armors.json');
const armorsParse = require('../databases/parser/armors.json');

const armorsWrite = require('../databases/parser/armorswrite.json');

const items = new Map();
const armors = new Map();

for (const i of Object.keys(itemDatabase)) {
  items.set(i, itemDatabase[i]);
}

for (const i of Object.keys(armorDatabase)) {
  armors.set(i, armorDatabase[i]);
}

const itemData = [];
const armorData = [];

for (let [name, i] of items.entries()) {
  itemData.push(i.name);
}

for (let [name, i] of armors.entries()) {
  armorData.push(i.name);
}

module.exports = {
  res: function (input, type, name) {
    if (type === 'item') {
      return fetch(input, items, name);
    }
  },
  parse_items: function (writeTo) {
    console.log('parse_items: Parsing data...');

    for (let key of itemsDB) {
      itemsParse[key.name.toLowerCase().replace(/ /g, '')] = {
        name: key.name,
        description: key.description,
        rarity: key.rarity,
        carryLimit: key.carryLimit,
        value: key.value
      }
    }

    fs.writeFile(writeTo, JSON.stringify(itemsParse, null, 2), (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('parse_items: Successfully parsed and written data');
      }
    });
  },
  parse_armors: function (writeTo) {
    console.log('parse_armors: Parsing data...');

    for (let key of armorsDB) {
      let setBonus = '-'
      if (key.bonus) {
        if (key.bonus.name) {
          setBonus = `${key.bonus.name} - ${key.bonus.ranks[0].skill.description} (${key.bonus.ranks[0].pieces} pieces)`;
        }
      }

      armorsParse[key.name.toLowerCase().replace(/ /g, '')] = {
        name: key.name,
        rank: key.rank,
        setBonus: setBonus
      }

      let headSkills = []
      if (key.pieces[0] && key.pieces[0].skills[0]) {
        if (!key.pieces[0].skills[0].skillName === undefined || !key.pieces[0].skills[0].skillName === null || !key.pieces[0].skills[0].skillName == '') {

          for(let i of key.pieces[0].skills) {
            headSkills.push(i.skillName);
          }
          //headSkill = key.pieces[0].skills[0].skillName;
        }
      }

      let chestSkills = []
      if (key.pieces[1] && key.pieces[1].skills[0]) {
        if (!key.pieces[1].skills[0].skillName === undefined || !key.pieces[1].skills[0].skillName === null || !key.pieces[1].skills[0].skillName == '') {

          for(let i of key.pieces[1].skills) {
            chestSkills.push(i.skillName);
          }
          //chestSkill = key.pieces[1].skills[0].skillName;
        }
      }

      let armSkills = []
      if (key.pieces[2] && key.pieces[2].skills[0]) {
        if (!key.pieces[2].skills[0].skillName === undefined || !key.pieces[2].skills[0].skillName === null || !key.pieces[2].skills[0].skillName == '') {

          for(let i of key.pieces[2].skills) {
            armSkills.push(i.skillName);
          }
          //armSkill = key.pieces[2].skills[0].skillName;
        }
      }

      let waistSkills = []
      if (key.pieces[3] && key.pieces[3].skills[0]) {
        if (!key.pieces[3].skills[0].skillName === undefined || !key.pieces[3].skills[0].skillName === null || !key.pieces[3].skills[0].skillName == '') {

          for(let i of key.pieces[3].skills) {
            waistSkills.push(i.skillName);
          }
          //waistSkill = key.pieces[3].skills[0].skillName;
        }
      }

      let legSkills = []
      if (key.pieces[4] && key.pieces[3].skills[0]) {
        if (!key.pieces[4].skills[0].skillName === undefined || !key.pieces[4].skills[0].skillName === null || !key.pieces[4].skills[0].skillName == '') {

          for(let i of key.pieces[4].skills) {
            legSkills.push(i.skillName);
          }
          //legSkill = key.pieces[4].skills[0].skillName;
        }
      }

      if (key.pieces[0]) {
        armorsParse[key.name.toLowerCase().replace(/ /g, '')]['head'] = {
          head_name: key.pieces[0].name,
          head_rarity: key.pieces[0].rarity,
          head_base_defense: key.pieces[0].defense.base,
          head_max_defense: key.pieces[0].defense.max,
          head_augmented_defense: key.pieces[0].defense.augmented,
          head_fire_resistances: key.pieces[0].resistances.fire,
          head_ice_resistances: key.pieces[0].resistances.ice,
          head_water_resistances: key.pieces[0].resistances.water,
          head_thunder_resistances: key.pieces[0].resistances.thunder,
          head_dragon_resistances: key.pieces[0].resistances.dragon,
          head_slots: key.pieces[0].slots.length,
          head_skills: headSkills
        }
      }

      if (key.pieces[1]) {
        armorsParse[key.name.toLowerCase().replace(/ /g, '')]['chest'] = {
          chest_name: key.pieces[1].name,
          chest_rarity: key.pieces[1].rarity,
          chest_base_defense: key.pieces[1].defense.base,
          chest_max_defense: key.pieces[1].defense.max,
          chest_augmented_defense: key.pieces[1].defense.augmented,
          chest_fire_resistances: key.pieces[1].resistances.fire,
          chest_ice_resistances: key.pieces[1].resistances.ice,
          chest_water_resistances: key.pieces[1].resistances.water,
          chest_thunder_resistances: key.pieces[1].resistances.thunder,
          chest_dragon_resistances: key.pieces[1].resistances.dragon,
          chest_slots: key.pieces[1].slots.length,
          chest_skills: chestSkills
        }
      }

      if (key.pieces[2]) {
        armorsParse[key.name.toLowerCase().replace(/ /g, '')]['arm'] = {
          arm_name: key.pieces[2].name,
          arm_rarity: key.pieces[2].rarity,
          arm_base_defense: key.pieces[2].defense.base,
          arm_max_defense: key.pieces[2].defense.max,
          arm_augmented_defense: key.pieces[2].defense.augmented,
          arm_fire_resistances: key.pieces[2].resistances.fire,
          arm_ice_resistances: key.pieces[2].resistances.ice,
          arm_water_resistances: key.pieces[2].resistances.water,
          arm_thunder_resistances: key.pieces[2].resistances.thunder,
          arm_dragon_resistances: key.pieces[2].resistances.dragon,
          arm_slots: key.pieces[2].slots.length,
          arm_skills: armSkills
        }
      }

      if (key.pieces[3]) {
        armorsParse[key.name.toLowerCase().replace(/ /g, '')]['waist'] = {
          waist_name: key.pieces[3].name,
          waist_rarity: key.pieces[3].rarity,
          waist_base_defense: key.pieces[3].defense.base,
          waist_max_defense: key.pieces[3].defense.max,
          waist_augmented_defense: key.pieces[3].defense.augmented,
          waist_fire_resistances: key.pieces[3].resistances.fire,
          waist_ice_resistances: key.pieces[3].resistances.ice,
          waist_water_resistances: key.pieces[3].resistances.water,
          waist_thunder_resistances: key.pieces[3].resistances.thunder,
          waist_dragon_resistances: key.pieces[3].resistances.dragon,
          waist_slots: key.pieces[3].slots.length,
          waist_skills: waistSkills
        }
      }

      if (key.pieces[4]) {
        armorsParse[key.name.toLowerCase().replace(/ /g, '')]['leg'] = {
          leg_name: key.pieces[4].name,
          leg_rarity: key.pieces[4].rarity,
          leg_base_defense: key.pieces[4].defense.base,
          leg_max_defense: key.pieces[4].defense.max,
          leg_augmented_defense: key.pieces[4].defense.augmented,
          leg_fire_resistances: key.pieces[4].resistances.fire,
          leg_ice_resistances: key.pieces[4].resistances.ice,
          leg_water_resistances: key.pieces[4].resistances.water,
          leg_thunder_resistances: key.pieces[4].resistances.thunder,
          leg_dragon_resistances: key.pieces[4].resistances.dragon,
          leg_slots: key.pieces[4].slots.length,
          leg_skills: legSkills
        }
      }
    }

    fs.writeFile(writeTo, JSON.stringify(armorsParse, null, 2), (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('parse_armors: Successfully parsed and written data');
      }
    });
  },
  create_armors: function (writeTo) {
    for (let key of armors.keys()) {
      const armor = armors.get(key);
      let totalDefense = 0;
      let fireResistance = 0;
      let waterResistance = 0;
      let thunderResistance = 0;
      let iceResistance = 0;
      let dragonResistance = 0;

      let setBonus = '';
      let armorSkills = [];

      let head = [];
      let chest = [];
      let arm = [];
      let waist = [];
      let leg = [];

      if (armor.head != undefined) {
        totalDefense += armor.head.head_base_defense;
        
        fireResistance += armor.head.head_fire_resistances;
        waterResistance += armor.head.head_water_resistances;
        thunderResistance += armor.head.head_thunder_resistances;
        iceResistance += armor.head.head_ice_resistances;
        dragonResistance += armor.head.head_dragon_resistances;

        if (armor.head.head_skills != undefined) {
          head = (armor.head.head_skills);
        }
      }

      if (armor.chest != undefined) {
        totalDefense += armor.chest.chest_base_defense;

        fireResistance += armor.chest.chest_fire_resistances;
        waterResistance += armor.chest.chest_water_resistances;
        thunderResistance += armor.chest.chest_thunder_resistances;
        iceResistance += armor.chest.chest_ice_resistances;
        dragonResistance += armor.chest.chest_dragon_resistances;

        if (armor.chest.chest_skills != undefined) {
          chest = (armor.chest.chest_skills);
        }
      }

      if (armor.arm != undefined) {
        totalDefense += armor.arm.arm_base_defense;

        fireResistance += armor.arm.arm_fire_resistances;
        waterResistance += armor.arm.arm_water_resistances;
        thunderResistance += armor.arm.arm_thunder_resistances;
        iceResistance += armor.arm.arm_ice_resistances;
        dragonResistance += armor.arm.arm_dragon_resistances;

        if (armor.arm.arm_skills != undefined) {
          arm = (armor.arm.arm_skills);
        }
      }

      if (armor.waist != undefined) {
        totalDefense += armor.waist.waist_base_defense;

        fireResistance += armor.waist.waist_fire_resistances;
        waterResistance += armor.waist.waist_water_resistances;
        thunderResistance += armor.waist.waist_thunder_resistances;
        iceResistance += armor.waist.waist_ice_resistances;
        dragonResistance += armor.waist.waist_dragon_resistances;

        if (armor.waist.waist_skills != undefined) {
          waist = (armor.waist.waist_skills);
        }
      }

      if (armor.leg != undefined) {
        totalDefense += armor.leg.leg_base_defense;

        fireResistance += armor.leg.leg_fire_resistances;
        waterResistance += armor.leg.leg_water_resistances;
        thunderResistance += armor.leg.leg_thunder_resistances;
        iceResistance += armor.leg.leg_ice_resistances;
        dragonResistance += armor.leg.leg_dragon_resistances;

        if (armor.leg.leg_skills != undefined) {
          leg = (armor.leg.leg_skills);
        }
      }

      //let removeDashes = arrayRemove(armorSkills, '-');
      //let armorSkillsUnique = removeDashes.unique();

      let resistances = `Defense: ${totalDefense}\n Fire: ${fireResistance}\n Water: ${waterResistance}\n Thunder: ${thunderResistance}\n Ice: ${iceResistance}\n Dragon: ${dragonResistance}`;
      armorSkills = [...head, ...chest, ...arm, ...waist, ...leg];

      //let bonus = armor.

      armorsWrite[key] = {
        name: armor.name,
        setBonus: armor.setBonus,
        resistances: resistances,
        skills: armorSkills
      }

      
      fs.writeFile(writeTo, JSON.stringify(armorsWrite, null, 2), (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('rewrite_armors: Successfully re-written data');
        }
      });
    }
  }
}

function fetch(input, map, type) {
  let parsedInput = input.toLowerCase().replace(' ', '');
  if (!map.has(parsedInput)) {
    const similarItems = new Array();

    for (const key of map.keys()) {
      if (similarity(key, parsedInput) >= 0.5) {
        similarItems.push(key);
      }
    }

    if (similarItems.length > 0) {
      throw `\nDid you mean: \`${similarItems.join(', ')}\`?`;;
    } else {
      throw `That ${type} doesn\'t seem to exist!`;
    }
  } else if (map.has(parsedInput)) {
    const data = map.get(parsedInput);

    return data;
  }
}

function pull(names, index, map, type) {
  const array = names.map(toLowerReplace);
  const dictionary = array.indexOf(index);
  const stringify = dictionary.toString();
  const info = map.get(stringify);

  if (dictionary == -1) {
    let similarKeys = [];

    for (let key of array) {
      if (similarity(key, index) >= 0.5) {
        similarKeys.push(key);
      }
    }

    if (similarKeys.length > 0) {
      throw `\nDid you mean: \`${similarKeys.join(', ')}\`?`;;
    } else {
      throw `That ${type} doesn\'t seem to exist!`;
    }
  }

  let data = [];
  for (let key in info) {
    if (info.hasOwnProperty(key)) {
      let values = info[key];
      data.push(values);
    }
  }

  return data;
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

function arrayRemove(array, find) {
  let filtered = array.filter(function (element) {
    return element !== find;
  });

  return filtered;
}

Array.prototype.unique = function () {
  return this.reduce(function (previous, current, index, array) {
    previous[current.toString() + typeof (current)] = current;
    return array.length - 1 == index ? Object.keys(previous).reduce(function (prev, cur) {
      prev.push(previous[cur]);
      return prev;
    }, []) : previous;
  }, {});
};

let toUpper = function (x) {
  return x.toUpperCase();
};

let toLower = function (x) {
  return x.toLowerCase();
};

let toLowerReplace = function (x) {
  return x.toLowerCase().replace(/ /g, '');
};
