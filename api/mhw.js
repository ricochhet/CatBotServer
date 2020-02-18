const fs = require('fs');
const fetch = require('node-fetch');

const itemsURL = `https://mhw-db.com/items`;
const armorsURL = `https://mhw-db.com/armor/sets`;
const decorationsURL = `https://mhw-db.com/decorations`;
const skillsURL = `https://mhw-db.com/skills`;
const weaponsURL = `https://mhw-db.com/weapons`;

const csvManager = require('./src/csvToJson');

async function getData(url) {
  const response = await fetch(url);
  return response.json();
}

module.exports = {
  writeData: async function(
    data = { delim: `,`, input: 'file.csv', output: 'file.json' }
  ) {
    csvManager.fieldDelimiter(data.delim).getJsonFromCsv(data.input);
    csvManager.formatValueByType().getJsonFromCsv(data.input);
    csvManager.generateJsonFileFromCsv(data.input, data.output);
  },
  writeWeapons: async function(writeTo) {
    const weaponsAPIDatabase = await getData(weaponsURL);
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
      if (key.durability) {
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

          sharpness = `Red: ${s[0]}\nOrange: ${s[1]}\nYellow: ${s[2]}\nGreen: ${s[3]}\nBlue: ${s[4]}\nWhite: ${s[5]}\nPurple: ${s[6]}`;
        }
      }

      let elderseal = '-';
      if (key.elderseal) {
        if (key.elderseal == null) elderseal = '-';
        elderseal = key.elderseal;
      }

      let shelling = '-';
      if (key.shelling) {
        shelling = `${key.shelling.type} LV${key.shelling.level}`;
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

          ammos.push(
            `${key.ammo[i].type}\nLV1 - ${levelOne}\nLV2 - ${levelTwo}\nLV3 - ${levelThree}`
          );
        }
      }

      let elements = [];
      if (key.elements) {
        for (const i in key.elements) {
          elements.push(
            `${key.elements[i].type} - ${key.elements[i].damage} Damage`
          );
        }
      }

      let slots = [];
      if (key.slots) {
        for (const i in key.slots) {
          slots.push(`Rank - ${key.slots[i].rank}`);
        }
      }

      let coatings = [];
      if (key.coatings) {
        coatings = `${key.coatings.join('\n ')}`;
      }

      let damageType = '-';
      if (key.damageType) {
        if (key.damageType == null) damage = '-';
        damageType = key.damageType;
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

      db[key.name.toLowerCase().replace(/ /g, '')] = {
        name: key.name,
        type: key.type,
        rarity: key.rarity,
        displayAttack: key.display,
        rawAttack: key.raw,
        damageType: damageType,
        affinity: affinity,
        defense: defense,
        sharpness: sharpness,
        elderseal: elderseal,
        shelling: shelling,
        specialAmmo: specialAmmo,
        deviation: deviation,
        ammos: ammos,
        elements: elements,
        slots: slots,
        coatings: coatings
      };
    }

    fs.writeFile(writeTo, JSON.stringify(db, null, 2), err => {
      if (err) {
        console.log(err);
      }
    });
  },
  writeItems: async function(writeTo) {
    const itemsAPIDatabase = await getData(itemsURL);
    const db = {};

    for (let key of itemsAPIDatabase) {
      db[key.name.toLowerCase().replace(/ /g, '')] = {
        name: key.name,
        description: key.description,
        rarity: key.rarity,
        carryLimit: key.carryLimit,
        value: key.value
      };
    }

    const items = new Map();
    for (const i of Object.keys(db)) {
      items.set(i, db[i]);
    }

    fs.writeFile(writeTo, JSON.stringify(db, null, 2), err => {
      if (err) {
        console.log(err);
      }
    });
  },
  writeDecorations: async function(writeTo) {
    const decorationsAPIDatabase = await getData(decorationsURL);
    const db = {};

    for (let key of decorationsAPIDatabase) {
      let skills = [];

      for (let i of key.skills) {
        skills.push(`${i.skillName} - ${i.description} LV${i.level}`);

        db[key.name.toLowerCase().replace(/ /g, '')] = {
          name: key.name,
          rarity: key.rarity,
          slot: key.slot,
          skills: skills
        };
      }
    }

    fs.writeFile(writeTo, JSON.stringify(db, null, 2), err => {
      if (err) {
        console.log(err);
      }
    });
  },
  writeSkills: async function(writeTo) {
    const skillAPIDatabase = await getData(skillsURL);
    const db = {};

    for (let key of skillAPIDatabase) {
      let ranks = [];

      for (let i of key.ranks) {
        ranks.push(`LV${i.level} - ${i.description}`);

        db[key.name.toLowerCase().replace(/ /g, '')] = {
          name: key.name,
          description: key.description,
          ranks: ranks
        };
      }
    }

    fs.writeFile(writeTo, JSON.stringify(db, null, 2), err => {
      if (err) {
        console.log(err);
      }
    });
  },
  writeArmors: async function(writeTo) {
    const armorsAPIDatabase = await getData(armorsURL);
    const db = {};

    for (let key of armorsAPIDatabase) {
      let setBonus = '-';
      let headSkills = [];
      let chestSkills = [];
      let armSkills = [];
      let waistSkills = [];
      let legSkills = [];

      if (key.bonus) {
        if (key.bonus.name) {
          setBonus = `${key.bonus.name} - ${key.bonus.ranks[0].skill.description} (${key.bonus.ranks[0].pieces} pieces)`;
        }
      }

      db[key.name.toLowerCase().replace(/ /g, '')] = {
        name: key.name,
        rank: key.rank,
        setBonus: setBonus
      };

      if (key.pieces[0] && key.pieces[0].skills[0]) {
        if (
          !key.pieces[0].skills[0].skillName === undefined ||
          !key.pieces[0].skills[0].skillName === null ||
          !key.pieces[0].skills[0].skillName == ''
        ) {
          for (let i of key.pieces[0].skills) {
            headSkills.push(i.skillName);
          }
        }
      }

      if (key.pieces[1] && key.pieces[1].skills[0]) {
        if (
          !key.pieces[1].skills[0].skillName === undefined ||
          !key.pieces[1].skills[0].skillName === null ||
          !key.pieces[1].skills[0].skillName == ''
        ) {
          for (let i of key.pieces[1].skills) {
            chestSkills.push(i.skillName);
          }
        }
      }

      if (key.pieces[2] && key.pieces[2].skills[0]) {
        if (
          !key.pieces[2].skills[0].skillName === undefined ||
          !key.pieces[2].skills[0].skillName === null ||
          !key.pieces[2].skills[0].skillName == ''
        ) {
          for (let i of key.pieces[2].skills) {
            armSkills.push(i.skillName);
          }
        }
      }

      if (key.pieces[3] && key.pieces[3].skills[0]) {
        if (
          !key.pieces[3].skills[0].skillName === undefined ||
          !key.pieces[3].skills[0].skillName === null ||
          !key.pieces[3].skills[0].skillName == ''
        ) {
          for (let i of key.pieces[3].skills) {
            waistSkills.push(i.skillName);
          }
        }
      }

      if (key.pieces[4] && key.pieces[3].skills[0]) {
        if (
          !key.pieces[4].skills[0].skillName === undefined ||
          !key.pieces[4].skills[0].skillName === null ||
          !key.pieces[4].skills[0].skillName == ''
        ) {
          for (let i of key.pieces[4].skills) {
            legSkills.push(i.skillName);
          }
        }
      }

      if (key.pieces[0]) {
        db[key.name.toLowerCase().replace(/ /g, '')]['head'] = {
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
        };
      }

      if (key.pieces[1]) {
        db[key.name.toLowerCase().replace(/ /g, '')]['chest'] = {
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
        };
      }

      if (key.pieces[2]) {
        db[key.name.toLowerCase().replace(/ /g, '')]['arm'] = {
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
        };
      }

      if (key.pieces[3]) {
        db[key.name.toLowerCase().replace(/ /g, '')]['waist'] = {
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
        };
      }

      if (key.pieces[4]) {
        db[key.name.toLowerCase().replace(/ /g, '')]['leg'] = {
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
        };
      }
    }

    const armors = new Map();
    for (const i of Object.keys(db)) {
      armors.set(i, db[i]);
    }

    for (let key of armors.keys()) {
      const armor = armors.get(key);

      let totalDefense = 0;
      let fireResistance = 0;
      let waterResistance = 0;
      let thunderResistance = 0;
      let iceResistance = 0;
      let dragonResistance = 0;

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
          head = armor.head.head_skills;
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
          chest = armor.chest.chest_skills;
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
          arm = armor.arm.arm_skills;
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
          waist = armor.waist.waist_skills;
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
          leg = armor.leg.leg_skills;
        }
      }

      let resistances = `Defense: ${totalDefense}\n Fire: ${fireResistance}\n Water: ${waterResistance}\n Thunder: ${thunderResistance}\n Ice: ${iceResistance}\n Dragon: ${dragonResistance}`;
      armorSkills = [...head, ...chest, ...arm, ...waist, ...leg];

      db[key] = {
        name: armor.name,
        setBonus: armor.setBonus,
        resistances: resistances,
        skills: armorSkills
      };
    }

    fs.writeFile(writeTo, JSON.stringify(db, null, 2), err => {
      if (err) {
        console.log(err);
      }
    });
  }
};