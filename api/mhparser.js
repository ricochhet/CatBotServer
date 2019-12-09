/*

Deprecated (This file will be removed in future updates.)

mhparser is deprecated, it's simply a demonstration of 
how mhw-db data will be parsed to a json file in a specific; usable format.

mhparser converts the mhw-db api jsons into a much more readable and smaller format,
only including what is neccessary. This parser drops the line count from ~100,000 to
~20,000 within the armors.json files.

*/

const armorsDB = require('../databases/mhwdb/armors.json');
const armorsParse = require('../databases/parser/armors.json');

const itemsDB = require('../databases/mhwdb/items.json');
const itemsParse = require('../databases/parser/items.json');
const fs = require('fs');

module.exports = {
    parse_items: function () {
        for (let key of itemsDB) {
            itemsParse[key.name.toLowerCase().replace(/ /g, '')] = {
                name: key.name,
                description: key.description,
                rarity: key.rarity,
                carryLimit: key.carryLimit,
                value: key.value
            }

            fs.writeFile('../databases/parser/items.json', JSON.stringify(itemsParse, null, 2), (err) => {
                if (err) console.log(err);
            });
        }
    },
    parse_armors: function () {
        for (let key of armorsDB) {
            let setBonus = '-'
            if (key.bonus) {
                if (key.bonus.name) {
                    setBonus = key.bonus.name;
                }
            }

            armorsParse[key.name.toLowerCase().replace(/ /g, '')] = {
                name: key.name,
                rank: key.rank,
                setBonus: setBonus
            }

            let headSkill = '-'
            if (key.pieces[0] && key.pieces[0].skills[0]) {
                if (!key.pieces[0].skills[0].skillName === undefined || !key.pieces[0].skills[0].skillName === null || !key.pieces[0].skills[0].skillName == '') {
                    headSkill = key.pieces[0].skills[0].skillName;
                }
            }

            let chestSkill = '-'
            if (key.pieces[1] && key.pieces[1].skills[0]) {
                if (!key.pieces[1].skills[0].skillName === undefined || !key.pieces[1].skills[0].skillName === null || !key.pieces[1].skills[0].skillName == '') {
                    chestSkill = key.pieces[1].skills[0].skillName;
                }
            }

            let armSkill = '-'
            if (key.pieces[2] && key.pieces[2].skills[0]) {
                if (!key.pieces[2].skills[0].skillName === undefined || !key.pieces[2].skills[0].skillName === null || !key.pieces[2].skills[0].skillName == '') {
                    armSkill = key.pieces[2].skills[0].skillName;
                }
            }

            let waistSkill = '-'
            if (key.pieces[3] && key.pieces[3].skills[0]) {
                if (!key.pieces[3].skills[0].skillName === undefined || !key.pieces[3].skills[0].skillName === null || !key.pieces[3].skills[0].skillName == '') {
                    waistSkill = key.pieces[3].skills[0].skillName;
                }
            }

            let LegSkill = '-'
            if (key.pieces[4] && key.pieces[3].skills[0]) {
                if (!key.pieces[4].skills[0].skillName === undefined || !key.pieces[4].skills[0].skillName === null || !key.pieces[4].skills[0].skillName == '') {
                    LegSkill = key.pieces[4].skills[0].skillName;
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
                    head_skills: headSkill
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
                    chest_skills: chestSkill
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
                    arm_skills: armSkill
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
                    waist_skills: waistSkill
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
                    leg_skills: LegSkill
                }
            }

            fs.writeFile('../databases/parser/armors.json', JSON.stringify(armorsParse, null, 2), (err) => {
                if (err) console.log(err);
            });
        }
    }
}