const fs = require('fs');
const itemsAPIDatabase = require('../databases/api/items.json');
const armorsAPIDatabase = require('../databases/api/armors.json');
const decorationsAPIDatabase = require('../databases/api/decorations.json');
const skillAPIDatabase = require('../databases/api/skills.json');

module.exports = {
  writeItems: function (writeTo) {
    const db = {};

    for (let key of itemsAPIDatabase) {
      db[key.name.toLowerCase().replace(/ /g, '')] = {
        name: key.name,
        description: key.description,
        rarity: key.rarity,
        carryLimit: key.carryLimit,
        value: key.value
      }
    }

    const items = new Map();
    for (const i of Object.keys(itemDatabase)) {
      items.set(i, itemDatabase[i]);
    }

    fs.writeFile(writeTo, JSON.stringify(db, null, 2), (err) => {
      if (err) {
        console.log(err);
      }
    });
  },
  writeDecorations: function (writeTo) {
    const db = {};

    for (let key of decorationsAPIDatabase) {
      let skills = [];

      for(let i of key.skills) {
        skills.push(`${i.skillName} - ${i.description} LV${i.level}`);

        db[key.name.toLowerCase().replace(/ /g, '')] = {
          name: key.name,
          rarity: key.rarity,
          slot: key.slot,
          skills: skills
        }
      }
    }

    fs.writeFile(writeTo, JSON.stringify(db, null, 2), (err) => {
      if (err) {
        console.log(err);
      }
    });
  },
  writeSkills: function (writeTo) {
    const db = {};

    for (let key of skillAPIDatabase) {
      let ranks = [];

      for(let i of key.ranks) {
        ranks.push(`LV${i.level} - ${i.description}`);

        db[key.name.toLowerCase().replace(/ /g, '')] = {
          name: key.name,
          description: key.description,
          ranks: ranks
        }
      }
    }

    fs.writeFile(writeTo, JSON.stringify(db, null, 2), (err) => {
      if (err) {
        console.log(err);
      }
    });
  },
  writeArmors: function (writeTo) {
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
      }

      if (key.pieces[0] && key.pieces[0].skills[0]) {
        if (!key.pieces[0].skills[0].skillName === undefined || !key.pieces[0].skills[0].skillName === null || !key.pieces[0].skills[0].skillName == '') {
          for (let i of key.pieces[0].skills) {
            headSkills.push(i.skillName);
          }
        }
      }

      if (key.pieces[1] && key.pieces[1].skills[0]) {
        if (!key.pieces[1].skills[0].skillName === undefined || !key.pieces[1].skills[0].skillName === null || !key.pieces[1].skills[0].skillName == '') {
          for (let i of key.pieces[1].skills) {
            chestSkills.push(i.skillName);
          }
        }
      }

      if (key.pieces[2] && key.pieces[2].skills[0]) {
        if (!key.pieces[2].skills[0].skillName === undefined || !key.pieces[2].skills[0].skillName === null || !key.pieces[2].skills[0].skillName == '') {
          for (let i of key.pieces[2].skills) {
            armSkills.push(i.skillName);
          }
        }
      }

      if (key.pieces[3] && key.pieces[3].skills[0]) {
        if (!key.pieces[3].skills[0].skillName === undefined || !key.pieces[3].skills[0].skillName === null || !key.pieces[3].skills[0].skillName == '') {
          for (let i of key.pieces[3].skills) {
            waistSkills.push(i.skillName);
          }
        }
      }

      if (key.pieces[4] && key.pieces[3].skills[0]) {
        if (!key.pieces[4].skills[0].skillName === undefined || !key.pieces[4].skills[0].skillName === null || !key.pieces[4].skills[0].skillName == '') {
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
        }
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
        }
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
        }
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
        }
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
        }
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

      let resistances = `Defense: ${totalDefense}\n Fire: ${fireResistance}\n Water: ${waterResistance}\n Thunder: ${thunderResistance}\n Ice: ${iceResistance}\n Dragon: ${dragonResistance}`;
      armorSkills = [...head, ...chest, ...arm, ...waist, ...leg];

      db[key] = {
        name: armor.name,
        setBonus: armor.setBonus,
        resistances: resistances,
        skills: armorSkills
      }
    }

    fs.writeFile(writeTo, JSON.stringify(db, null, 2), (err) => {
      if (err) {
        console.log(err);
      }
    });
  },
}