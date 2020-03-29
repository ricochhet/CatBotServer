const utils = require('./utils');

class Merge {
  constructor(sourceJsonDir) {
    this.sourceJsonDir = sourceJsonDir;
  }

  armorPieces(writeTo) {
    const armor_base = require(`${this.sourceJsonDir}/armors/armor_base.json`);
    const armor_craft_ext = require(`${this.sourceJsonDir}/armors/armor_craft_ext.json`);
    const armor_skills_ext = require(`${this.sourceJsonDir}/armors/armor_skills_ext.json`);
    const skill_levels = require(`${this.sourceJsonDir}/skills/skill_levels.json`);

    let armor_base_map = new Map();
    for (const i of Object.keys(armor_base)) {
      armor_base_map.set(armor_base[i].name_en, armor_base[i]);
    }

    let armor_craft_ext_map = new Map();
    for (const i of Object.keys(armor_craft_ext)) {
      armor_craft_ext_map.set(
        armor_craft_ext[i].base_name_en,
        armor_craft_ext[i]
      );
    }

    let armor_skills_ext_map = new Map();
    for (const i of Object.keys(armor_skills_ext)) {
      armor_skills_ext_map.set(
        armor_skills_ext[i].base_name_en,
        armor_skills_ext[i]
      );
    }

    let skill_levels_map = new Map();
    for (const i of Object.keys(skill_levels)) {
      skill_levels_map.set(skill_levels[i].base_name_en, skill_levels[i]);
    }

    let obj = {};
    for (const [k, v] of armor_base_map) {
      const base = armor_base_map.get(k);
      const craft = armor_craft_ext_map.get(k);
      const skills = armor_skills_ext_map.get(k);

      let slots_array = [];
      let skills_array = [];
      let crafting_array = [];

      if (base.slot_1 != 0) {
        let obj = {
          rank: base.slot_1
        };

        slots_array.push(obj);
      }

      if (base.slot_2 != 0) {
        let obj = {
          rank: base.slot_2
        };

        slots_array.push(obj);
      }

      if (base.slot_3 != 0) {
        let obj = {
          rank: base.slot_3
        };

        slots_array.push(obj);
      }

      if (skills.skill1_name != 0) {
        let filtered_skill = utils.advancedSearch(
          skill_levels,
          'base_name_en',
          'level',
          skills.skill1_name,
          skills.skill1_pts
        );
        for (const i in filtered_skill) {
          let obj = {
            level: filtered_skill[i].level,
            description: filtered_skill[i].description_en.split(`\"`).join(''),
            name: filtered_skill[i].base_name_en
          };

          skills_array.push(obj);
        }
      }

      if (skills.skill2_name != 0) {
        let filtered_skill = utils.advancedSearch(
          skill_levels,
          'base_name_en',
          'level',
          skills.skill2_name,
          skills.skill2_pts
        );
        for (const i in filtered_skill) {
          let obj = {
            level: filtered_skill[i].level,
            description: filtered_skill[i].description_en.split(`\"`).join(''),
            name: filtered_skill[i].base_name_en
          };

          skills_array.push(obj);
        }
      }

      if (craft.item1_name != 0) {
        let obj = {
          name: craft.item1_name,
          quantity: craft.item1_qty
        };

        crafting_array.push(obj);
      }

      if (craft.item2_name != 0) {
        let obj = {
          name: craft.item2_name,
          quantity: craft.item2_qty
        };

        crafting_array.push(obj);
      }

      if (craft.item3_name != 0) {
        let obj = {
          name: craft.item3_name,
          quantity: craft.item3_qty
        };

        crafting_array.push(obj);
      }

      if (craft.item4_name != 0) {
        let obj = {
          name: craft.item4_name,
          quantity: craft.item4_qty
        };

        crafting_array.push(obj);
      }

      obj[
        k
          .split('α')
          .join('Alpha')
          .split('β')
          .join('Beta')
          .toLowerCase()
          .replace(/ /g, '')
      ] = {
        id: base.id,
        name: base.name_en
          .split('α')
          .join('Alpha')
          .split('β')
          .join('Beta'),
        rarity: base.rarity,
        type: base.type,
        gender: base.gender,
        defenses: {
          base: base.defense_base,
          max: base.defense_max,
          augmented: base.defense_augment_max
        },
        resistances: {
          fire: base.defense_fire,
          water: base.defense_water,
          ice: base.defense_ice,
          thunder: base.defense_thunder,
          dragon: base.defense_ice
        },
        slots: slots_array,
        skills: skills_array,
        crafting: crafting_array
      };
    }

    utils.writeFile(writeTo, obj);
  }

  armors(writeTo, extended = './src/json/armors/armor_pieces.json') {
    const armorset_base = require(`${this.sourceJsonDir}/armors/armorset_base.json`);
    const armor_pieces = require(extended);
    const armorset_bonus_base = require(`${this.sourceJsonDir}/armors/armorset_bonus_base.json`);
    const skill_levels = require(`${this.sourceJsonDir}/skills/skill_levels.json`);

    let armorset_base_map = new Map();
    for (const i of Object.keys(armorset_base)) {
      armorset_base_map.set(armorset_base[i].name_en, armorset_base[i]);
    }

    let armor_pieces_map = new Map();
    for (const i of Object.keys(armor_pieces)) {
      armor_pieces_map.set(armor_pieces[i].name, armor_pieces[i]);
    }

    let armorset_bonus_base_map = new Map();
    for (const i of Object.keys(armorset_bonus_base)) {
      armorset_bonus_base_map.set(
        armorset_bonus_base[i].name_en,
        armorset_bonus_base[i]
      );
    }

    let skill_levels_map = new Map();
    for (const i of Object.keys(skill_levels)) {
      skill_levels_map.set(skill_levels[i].base_name_en, skill_levels[i]);
    }

    let obj = {};
    for (const [k, v] of armorset_base_map) {
      const base = armorset_base_map.get(k);
      const head = armor_pieces_map.get(
        base.head
          .toString()
          .split('α')
          .join('Alpha')
          .split('β')
          .join('Beta')
      );
      const chest = armor_pieces_map.get(
        base.chest
          .toString()
          .split('α')
          .join('Alpha')
          .split('β')
          .join('Beta')
      );
      const arms = armor_pieces_map.get(
        base.arms
          .toString()
          .split('α')
          .join('Alpha')
          .split('β')
          .join('Beta')
      );
      const waist = armor_pieces_map.get(
        base.waist
          .toString()
          .split('α')
          .join('Alpha')
          .split('β')
          .join('Beta')
      );
      const legs = armor_pieces_map.get(
        base.legs
          .toString()
          .split('α')
          .join('Alpha')
          .split('β')
          .join('Beta')
      );

      let bonus = null;
      if (base.bonus != 0) {
        let bonus_map = armorset_bonus_base_map.get(base.bonus);
        let skill1 = skill_levels_map.get(bonus_map.skill1_name);

        let ranks_obj = [
          {
            pieces: bonus_map.skill1_required,
            skill: {
              level: skill1.level,
              name: skill1.base_name_en
            },
            description: skill1.description_en
          }
        ];

        if (skill_levels_map.has(bonus_map.skill2_name)) {
          let skill2 = skill_levels_map.get(bonus_map.skill2_name);

          let obj = {
            pieces: bonus_map.skill2_required,
            skill: {
              level: skill2.level,
              name: skill2.base_name_en
            },
            description: skill2.description_en
          };

          ranks_obj.push(obj);
        }
        bonus = {
          name: base.bonus,
          ranks: ranks_obj
        };
      }

      const pieces = [head, chest, arms, waist, legs];
      const filtered_pieces = pieces.filter(function(element) {
        return element !== undefined;
      });

      obj[
        k
          .split('α')
          .join('Alpha')
          .split('β')
          .join('Beta')
          .toLowerCase()
          .replace(/ /g, '')
      ] = {
        name: base.name_en
          .toString()
          .split('α')
          .join('Alpha')
          .split('β')
          .join('Beta'),
        rank: base.rank,
        monster: base.monster,
        pieces: filtered_pieces,
        bonus: bonus
      };
    }

    utils.writeFile(writeTo, obj);
  }

  charms(writeTo) {
    const charm_base = require(`${this.sourceJsonDir}/charms/charm_base.json`);

    let charm_base_map = new Map();
    for (const i of Object.keys(charm_base)) {
      charm_base_map.set(charm_base[i].name_en, charm_base[i]);
    }

    let obj = {};
    for (const [k, v] of charm_base_map) {
      const base = charm_base_map.get(k);

      obj[k.toLowerCase().replace(/ /g, '')] = {
        id: base.id,
        name: base.name_en,
        previous: base.previous_en,
        rarity: base.rarity
      };
    }

    utils.writeFile(writeTo, obj);
  }

  decorations(writeTo, nop) {
    const decoration_base = require(`${this.sourceJsonDir}/decorations/decoration_base.json`);
    const skill_levels = require(`${this.sourceJsonDir}/skills/skill_levels.json`);

    let decoration_base_map = new Map();
    for (const i of Object.keys(decoration_base)) {
      decoration_base_map.set(decoration_base[i].name_en, decoration_base[i]);
    }

    let skill_levels_map = new Map();
    for (const i of Object.keys(skill_levels)) {
      skill_levels_map.set(skill_levels[i].base_name_en, skill_levels[i]);
    }

    let obj = {};
    for (const [k, v] of decoration_base_map) {
      const base = decoration_base_map.get(k);

      let skills_array = [];

      if (base.skill1_name != 0) {
        let filtered_skill = utils.advancedSearch(
          skill_levels,
          'base_name_en',
          'level',
          base.skill1_name,
          base.skill1_level
        );
        for (const i in filtered_skill) {
          let obj = {
            description: filtered_skill[i].description_en.split(`\"`).join(''),
            level: filtered_skill[i].level,
            name: filtered_skill[i].base_name_en
          };

          skills_array.push(obj);
        }
      }

      if (base.skill2_name != 0) {
        let filtered_skill = utils.advancedSearch(
          skill_levels,
          'base_name_en',
          'level',
          base.skill2_name,
          base.skill2_level
        );
        for (const i in filtered_skill) {
          let obj = {
            description: filtered_skill[i].description_en.split(`\"`).join(''),
            level: filtered_skill[i].level,
            name: filtered_skill[i].base_name_en
          };

          skills_array.push(obj);
        }
      }

      if (nop) {
        obj[
          k
            .split('/')
            .join('+')
            .toLowerCase()
            .replace(/ /g, '')
        ] = {
          id: base.id,
          name: base.name_en,
          slot: base.slot,
          rarity: base.rarity,
          skills: skills_array
        };
      } else {
        obj[k.toLowerCase().replace(/ /g, '')] = {
          id: base.id,
          name: base.name_en,
          slot: base.slot,
          rarity: base.rarity,
          skills: skills_array
        };
      }
    }

    utils.writeFile(writeTo, obj);
  }

  items(writeTo) {
    const item_base = require(`${this.sourceJsonDir}/items/item_base.json`);
    const item_combination_list = require(`${this.sourceJsonDir}/items/item_combination_list.json`);
    const location_items = require(`${this.sourceJsonDir}/locations/location_items.json`);

    let item_base_map = new Map();
    for (const i of Object.keys(item_base)) {
      item_base_map.set(item_base[i].name_en, item_base[i]);
    }

    let item_combination_list_map = new Map();
    for (const i of Object.keys(item_combination_list)) {
      item_combination_list_map.set(
        item_combination_list[i].result,
        item_combination_list[i]
      );
    }

    let obj = {};
    for (const [k, v] of item_base_map) {
      const base = item_base_map.get(k);

      let crafting = null;
      let location = [];

      let filtered_locations = utils.search(location_items, 'item', k);
      if (filtered_locations.length && Array.isArray(filtered_locations)) {
        for (const i in filtered_locations) {
          let obj = {
            stage: filtered_locations[i].base_name_en,
            area: filtered_locations[i].area,
            percentage: filtered_locations[i].percentage,
            nodes: filtered_locations[i].nodes
          };
          location.push(obj);
        }
      }

      if (item_combination_list_map.has(k)) {
        const base = item_combination_list_map.get(k);

        crafting = {
          id: base.id,
          result: base.result,
          first_item: base.first,
          second_item: base.second,
          quantity: base.quantity
        };
      }

      obj[k.toLowerCase().replace(/ /g, '')] = {
        id: base.id,
        name: base.name_en,
        category: base.category,
        subcategory: base.subcategory,
        rarity: base.rarity,
        buy_price: base.buy_price,
        sell_price: base.sell_price,
        carry_limit: base.carry_limit,
        crafting: crafting,
        locations: location
      };
    }

    utils.writeFile(writeTo, obj);
  }

  monsters(writeTo) {
    const monster_base = require(`${this.sourceJsonDir}/monsters/monster_base.json`);
    const monster_breaks = require(`${this.sourceJsonDir}/monsters/monster_breaks.json`);
    const monster_hitzones = require(`${this.sourceJsonDir}/monsters/monster_hitzones.json`);
    const monster_ailments = require(`${this.sourceJsonDir}/monsters/monster_ailments.json`);
    const monster_habitats = require(`${this.sourceJsonDir}/monsters/monster_habitats.json`);
    const monster_rewards = require(`${this.sourceJsonDir}/monsters/monster_rewards.json`);
    const monster_weaknesses = require(`${this.sourceJsonDir}/monsters/monster_weaknesses.json`);

    let monster_base_map = new Map();
    for (const i of Object.keys(monster_base)) {
      monster_base_map.set(monster_base[i].name_en, monster_base[i]);
    }

    let obj = {};
    for (const [k, v] of monster_base_map) {
      const base = monster_base_map.get(k);

      let ailments = [];
      let breaks = [];
      let habitats = [];
      let hitzones = [];
      let rewards = [];
      let weakness = [];

      let filtered_ailments = utils.search(monster_ailments, 'base_name_en', k);
      if (filtered_ailments.length && Array.isArray(filtered_ailments)) {
        for (const i in filtered_ailments) {
          let obj = {
            roar: filtered_ailments[i].roar,
            wind: filtered_ailments[i].wind,
            tremor: filtered_ailments[i].tremor,
            defense_down: filtered_ailments[i].defense_down,
            fireblight: filtered_ailments[i].fireblight,
            waterblight: filtered_ailments[i].waterblight,
            thunderblight: filtered_ailments[i].thunderblight,
            iceblight: filtered_ailments[i].iceblight,
            dragonblight: filtered_ailments[i].dragonblight,
            blastblight: filtered_ailments[i].blastblight,
            poison: filtered_ailments[i].poison,
            sleep: filtered_ailments[i].sleep,
            paralysis: filtered_ailments[i].paralysis,
            bleed: filtered_ailments[i].bleed,
            stun: filtered_ailments[i].stun,
            mud: filtered_ailments[i].mud,
            effluvia: filtered_ailments[i].effluvia
          };

          ailments.push(obj);
        }
      }

      let filtered_breaks = utils.search(monster_breaks, 'base_name_en', k);
      if (filtered_breaks.length && Array.isArray(filtered_breaks)) {
        for (const i in filtered_breaks) {
          let obj = {
            part: filtered_breaks[i].part_en,
            flinch: filtered_breaks[i].flinch,
            wound: filtered_breaks[i].wound,
            sever: filtered_breaks[i].sever,
            extract: filtered_breaks[i].extract
          };

          breaks.push(obj);
        }
      }

      let filtered_habitats = utils.search(monster_habitats, 'base_name_en', k);
      if (filtered_habitats.length && Array.isArray(filtered_habitats)) {
        for (const i in filtered_habitats) {
          let obj = {
            stage: filtered_habitats[i].map_en,
            start_area: filtered_habitats[i].start_area,
            move_area: filtered_habitats[i].move_area
              .toString()
              .split(`\"`)
              .join(''),
            rest_area: filtered_habitats[i].rest_area
              .toString()
              .split(`\"`)
              .join('')
          };

          habitats.push(obj);
        }
      }

      let filtered_hitzones = utils.search(monster_hitzones, 'base_name_en', k);
      if (filtered_hitzones.length && Array.isArray(filtered_hitzones)) {
        for (const i in filtered_hitzones) {
          let obj = {
            part: filtered_hitzones[i].hitzone_en,
            cut: filtered_hitzones[i].cut,
            impact: filtered_hitzones[i].impact,
            shot: filtered_hitzones[i].shot,
            fire: filtered_hitzones[i].fire,
            water: filtered_hitzones[i].water,
            thunder: filtered_hitzones[i].thunder,
            ice: filtered_hitzones[i].ice,
            dragon: filtered_hitzones[i].dragon,
            ko: filtered_hitzones[i].ko
          };

          hitzones.push(obj);
        }
      }

      let filtered_rewards = utils.search(monster_rewards, 'base_name_en', k);
      if (filtered_rewards.length && Array.isArray(filtered_rewards)) {
        for (const i in filtered_rewards) {
          let obj = {
            condition: filtered_rewards[i].condition_en,
            rank: filtered_rewards[i].rank,
            item: filtered_rewards[i].item_en
          };

          rewards.push(obj);
        }
      }

      let filtered_weaknesses = utils.search(monster_weaknesses, 'name_en', k);
      if (filtered_weaknesses.length && Array.isArray(filtered_weaknesses)) {
        for (const i in filtered_weaknesses) {
          let obj = {
            form: filtered_weaknesses[i].form,
            alt_description: filtered_weaknesses[i].alt_description,
            fire: filtered_weaknesses[i].fire,
            water: filtered_weaknesses[i].water,
            thunder: filtered_weaknesses[i].thunder,
            ice: filtered_weaknesses[i].ice,
            dragon: filtered_weaknesses[i].dragon,
            poison: filtered_weaknesses[i].poison,
            sleep: filtered_weaknesses[i].sleep,
            paralysis: filtered_weaknesses[i].paralysis,
            blast: filtered_weaknesses[i].blast,
            stun: filtered_weaknesses[i].stun
          };

          weakness.push(obj);
        }
      }

      obj[k.toLowerCase().replace(/ /g, '')] = {
        id: base.id,
        name: base.name_en,
        ecology: base.ecology_en,
        size: base.size,
        pitfall_trap: base.pitfall_trap,
        shock_trap: base.shock_trap,
        vine_trap: base.vine_trap,
        ailments: ailments,
        breaks: breaks,
        habitats: habitats,
        hitzones: hitzones,
        rewards: rewards,
        weakness: weakness
      };
    }

    utils.writeFile(writeTo, obj);
  }

  quests(writeTo) {
    const quest_base = require(`${this.sourceJsonDir}/quests/quest_base.json`);
    const quest_monsters = require(`${this.sourceJsonDir}/quests/quest_monsters.json`);
    const quest_rewards = require(`${this.sourceJsonDir}/quests/quest_rewards.json`);

    let quest_base_map = new Map();
    for (const i of Object.keys(quest_base)) {
      quest_base_map.set(quest_base[i].name_en, quest_base[i]);
    }

    let obj = {};
    for (const [k, v] of quest_base_map) {
      const base = quest_base_map.get(k);

      let monsters = [];
      let rewards = [];

      let filtered_monsters = utils.search(quest_monsters, 'base_id', k);
      if (filtered_monsters.length && Array.isArray(filtered_monsters)) {
        for (const i in filtered_monsters) {
          let obj = {
            monster: filtered_monsters[i].monster_en,
            quantity: filtered_monsters[i].quantity,
            objective: filtered_monsters[i].is_objective
          };

          monsters.push(obj);
        }
      }

      let filtered_rewards = utils.search(quest_rewards, 'base_id', k);
      if (filtered_rewards.length && Array.isArray(filtered_rewards)) {
        for (const i in filtered_rewards) {
          let obj = {
            group: filtered_rewards[i].group,
            item: filtered_rewards[i].item_en,
            stack: filtered_rewards[i].stack,
            percentage: filtered_rewards[i].percentage
          };

          rewards.push(obj);
        }
      }

      obj[
        k
          .split(`\"`)
          .join('')
          .toLowerCase()
          .replace(/ /g, '')
      ] = {
        id: base.id,
        name: base.name_en.split(`\"`).join(''),
        stars: base.stars,
        type: base.quest_type,
        stage: base.location_en,
        zenny: base.zenny
      };
    }

    utils.writeFile(writeTo, obj);
  }

  skills(writeTo) {
    const skill_base = require(`${this.sourceJsonDir}/skills/skill_base.json`);
    const skill_levels = require(`${this.sourceJsonDir}/skills/skill_levels.json`);

    let skill_base_map = new Map();
    for (const i of Object.keys(skill_base)) {
      skill_base_map.set(skill_base[i].name_en, skill_base[i]);
    }

    let obj = {};
    for (const [k, v] of skill_base_map) {
      const base = skill_base_map.get(k);

      let levels = [];

      let filtered_levels = utils.search(skill_levels, 'base_name_en', k);
      if (filtered_levels.length && Array.isArray(filtered_levels)) {
        for (const i in filtered_levels) {
          let obj = {
            level: filtered_levels[i].level,
            description: filtered_levels[i].description_en.split(`\"`).join('')
          };

          levels.push(obj);
        }
      }

      obj[k.toLowerCase().replace(/ /g, '')] = {
        name: base.name_en,
        levels: levels
      };
    }

    utils.writeFile(writeTo, obj);
  }

  kinsects(writeTo) {
    const kinsect_base = require(`${this.sourceJsonDir}/weapons/kinsect_base.json`);
    const kinsect_craft_ext = require(`${this.sourceJsonDir}/weapons/kinsect_craft_ext.json`);

    let kinsect_base_map = new Map();
    for (const i of Object.keys(kinsect_base)) {
      kinsect_base_map.set(kinsect_base[i].name_en, kinsect_base[i]);
    }

    let kinsect_craft_ext_map = new Map();
    for (const i of Object.keys(kinsect_craft_ext)) {
      kinsect_craft_ext_map.set(
        kinsect_craft_ext[i].base_name_en,
        kinsect_craft_ext[i]
      );
    }

    let obj = {};
    for (const [k, v] of kinsect_base_map) {
      const base = kinsect_base_map.get(k);

      let crafting_array = [];
      if (kinsect_craft_ext_map.has(k)) {
        const craft = kinsect_craft_ext_map.get(k);

        if (craft.item1_name != 0) {
          let obj = {
            name: craft.item1_name,
            quantity: craft.item1_qty
          };

          crafting_array.push(obj);
        }

        if (craft.item2_name != 0) {
          let obj = {
            name: craft.item2_name,
            quantity: craft.item2_qty
          };

          crafting_array.push(obj);
        }

        if (craft.item3_name != 0) {
          let obj = {
            name: craft.item3_name,
            quantity: craft.item3_qty
          };

          crafting_array.push(obj);
        }

        if (craft.item4_name != 0) {
          let obj = {
            name: craft.item4_name,
            quantity: craft.item4_qty
          };

          crafting_array.push(obj);
        }
      }

      obj[k.toLowerCase().replace(/ /g, '')] = {
        id: base.id,
        name: base.name_en,
        rarity: base.rarity,
        attack_type: base.attack_type,
        dust_effect: base.dust_effect,
        power: base.power,
        speed: base.speed,
        heal: base.heal,
        crafting: crafting_array
      };
    }

    utils.writeFile(writeTo, obj);
  }

  weapons(writeTo) {
    const weapon_base = require(`${this.sourceJsonDir}/weapons/weapon_base.json`);
    const weapon_ammo = require(`${this.sourceJsonDir}/weapons/weapon_ammo.json`);
    const weapon_bow_ext = require(`${this.sourceJsonDir}/weapons/weapon_bow_ext.json`);
    const weapon_craft = require(`${this.sourceJsonDir}/weapons/weapon_craft.json`);
    const weapon_sharpness = require(`${this.sourceJsonDir}/weapons/weapon_sharpness.json`);

    let weapon_base_map = new Map();
    for (const i of Object.keys(weapon_base)) {
      weapon_base_map.set(weapon_base[i].name_en, weapon_base[i]);
    }

    let weapon_ammo_map = new Map();
    for (const i of Object.keys(weapon_ammo)) {
      weapon_ammo_map.set(weapon_ammo[i].key, weapon_ammo[i]);
    }

    let weapon_bow_ext_map = new Map();
    for (const i of Object.keys(weapon_bow_ext)) {
      weapon_bow_ext_map.set(weapon_bow_ext[i].base_name_en, weapon_bow_ext[i]);
    }

    let weapon_craft_map = new Map();
    for (const i of Object.keys(weapon_craft)) {
      weapon_craft_map.set(weapon_craft[i].base_name_en, weapon_craft[i]);
    }

    let weapon_sharpness_map = new Map();
    for (const i of Object.keys(weapon_sharpness)) {
      weapon_sharpness_map.set(
        weapon_sharpness[i].base_name_en,
        weapon_sharpness[i]
      );
    }

    let obj = {};
    for (const [k, v] of weapon_base_map) {
      const base = weapon_base_map.get(k);

      let coatings = [];
      let sharpness = null;
      let affinity = null;
      let defense = null;
      let shelling = null;
      let crafting = null;
      let phials = null;
      let elements_array = [];
      let slots_array = [];
      let ammos_array = [];
      let specialAmmo = null;
      let deviation = null;

      if (weapon_craft_map.has(k)) {
        const craft = weapon_craft_map.get(k);

        let crafting_array = [];
        crafting = {
          type: craft.type,
          materials: crafting_array
        };

        if (craft.item1_name != 0) {
          let obj = {
            name: craft.item1_name,
            quantity: craft.item1_qty
          };

          crafting_array.push(obj);
        }

        if (craft.item2_name != 0) {
          let obj = {
            name: craft.item2_name,
            quantity: craft.item2_qty
          };

          crafting_array.push(obj);
        }

        if (craft.item3_name != 0) {
          let obj = {
            name: craft.item3_name,
            quantity: craft.item3_qty
          };

          crafting_array.push(obj);
        }

        if (craft.item4_name != 0) {
          let obj = {
            name: craft.item4_name,
            quantity: craft.item4_qty
          };

          crafting_array.push(obj);
        }
      }

      if (weapon_bow_ext_map.has(k)) {
        const base = weapon_bow_ext_map.get(k);
        if (base.close == 'TRUE') {
          coatings.push('Close Range');
        }

        if (base.power == 'TRUE') {
          coatings.push('Power');
        }

        if (base.paralysis == 'TRUE') {
          coatings.push('Paralysis');
        }

        if (base.poison == 'TRUE') {
          coatings.push('Poison');
        }

        if (base.sleep == 'TRUE') {
          coatings.push('Sleep');
        }

        if (base.blast == 'TRUE') {
          coatings.push('Blast');
        }
      }

      if (base.affinity != 0) {
        affinity = base.affinity;
      }

      if (base.defense != 0) {
        defense = base.defense;
      }

      if (base.element1 != 0) {
        let obj = {
          type: base.element1,
          damage: base.element1_attack,
          hidden: base.element_hidden
        };

        elements_array.push(obj);
      }

      if (base.element2 != 0) {
        let obj = {
          type: base.element2,
          damage: base.element2_attack,
          hidden: base.element_hidden
        };

        elements_array.push(obj);
      }

      if (base.slot_1 != 0) {
        let obj = {
          rank: base.slot_1
        };

        slots_array.push(obj);
      }

      if (base.slot_2 != 0) {
        let obj = {
          rank: base.slot_2
        };

        slots_array.push(obj);
      }

      if (base.slot_3 != 0) {
        let obj = {
          rank: base.slot_3
        };

        slots_array.push(obj);
      }

      if (base.shelling != 0) {
        shelling = {
          type: base.shelling,
          level: base.shelling_level
        };
      }

      if (base.phial != 0) {
        phials = {
          type: base.phial,
          damage: base.phial_power
        };
      }

      if (base.ammo_config != 0) {
        const config = weapon_ammo_map.get(base.ammo_config);
        specialAmmo = config.special;
        deviation = config.deviation;

        let normal_ammo = {
          type: 'normal',
          capacities: [
            config.normal1_clip,
            config.normal2_clip,
            config.normal3_clip
          ]
        };

        let pierce_ammo = {
          type: 'pierce',
          capacities: [
            config.pierce1_clip,
            config.pierce2_clip,
            config.pierce3_clip
          ]
        };

        let spread_ammo = {
          type: 'spread',
          capacities: [
            config.spread1_clip,
            config.spread2_clip,
            config.spread3_clip
          ]
        };

        let sticky_ammo = {
          type: 'sticky',
          capacities: [
            config.sticky1_clip,
            config.sticky2_clip,
            config.sticky3_clip
          ]
        };

        let cluster_ammo = {
          type: 'cluster',
          capacities: [
            config.cluster1_clip,
            config.cluster2_clip,
            config.cluster3_clip
          ]
        };

        let recover_ammo = {
          type: 'recover',
          capacities: [config.recover1_clip, config.recover2_clip]
        };

        let poison_ammo = {
          type: 'poison',
          capacities: [config.poison1_clip, config.poison2_clip]
        };

        let paralysis_ammo = {
          type: 'paralysis',
          capacities: [config.paralysis1_clip, config.paralysis2_clip]
        };

        let sleep_ammo = {
          type: 'sleep',
          capacities: [config.sleep1_clip, config.sleep2_clip]
        };

        let exhaust_ammo = {
          type: 'exhaust',
          capacities: [config.exhaust1_clip, config.exhaust2_clip]
        };

        let flaming_ammo = {
          type: 'flaming',
          capacities: [config.flaming_clip]
        };

        let water_ammo = {
          type: 'water',
          capacities: [config.water_clip]
        };

        let freeze_ammo = {
          type: 'freeze',
          capacities: [config.freeze_clip]
        };

        let thunder_ammo = {
          type: 'thunder',
          capacities: [config.thunder_clip]
        };

        let dragon_ammo = {
          type: 'dragon',
          capacities: [config.dragon_clip]
        };

        let slicing_ammo = {
          type: 'slicing',
          capacities: [config.slicing_clip]
        };

        let wyvern_ammo = {
          type: 'wyvern',
          capacities: [config.wyvern_clip]
        };

        let demon_ammo = {
          type: 'demon',
          capacities: [config.demon_clip]
        };

        let armor_ammo = {
          type: 'armor',
          capacities: [config.armor_clip]
        };

        let tranq_ammo = {
          type: 'tranq',
          capacities: [config.tranq_clip]
        };

        if (
          normal_ammo.capacities[0] != 0 ||
          normal_ammo.capacities[1] != 0 ||
          normal_ammo.capacities[2] != 0
        ) {
          ammos_array.push(normal_ammo);
        }

        if (
          pierce_ammo.capacities[0] != 0 ||
          pierce_ammo.capacities[1] != 0 ||
          pierce_ammo.capacities[2] != 0
        ) {
          ammos_array.push(pierce_ammo);
        }

        if (
          spread_ammo.capacities[0] != 0 ||
          spread_ammo.capacities[1] != 0 ||
          spread_ammo.capacities[2] != 0
        ) {
          ammos_array.push(spread_ammo);
        }

        if (
          sticky_ammo.capacities[0] != 0 ||
          sticky_ammo.capacities[1] != 0 ||
          sticky_ammo.capacities[2] != 0
        ) {
          ammos_array.push(sticky_ammo);
        }

        if (
          cluster_ammo.capacities[0] != 0 ||
          cluster_ammo.capacities[1] != 0 ||
          cluster_ammo.capacities[2] != 0
        ) {
          ammos_array.push(cluster_ammo);
        }

        if (
          recover_ammo.capacities[0] != 0 ||
          recover_ammo.capacities[1] != 0
        ) {
          ammos_array.push(recover_ammo);
        }

        if (poison_ammo.capacities[0] != 0 || poison_ammo.capacities[1] != 0) {
          ammos_array.push(poison_ammo);
        }

        if (
          paralysis_ammo.capacities[0] != 0 ||
          paralysis_ammo.capacities[1] != 0
        ) {
          ammos_array.push(paralysis_ammo);
        }

        if (sleep_ammo.capacities[0] != 0 || sleep_ammo.capacities[1] != 0) {
          ammos_array.push(sleep_ammo);
        }

        if (
          exhaust_ammo.capacities[0] != 0 ||
          exhaust_ammo.capacities[1] != 0
        ) {
          ammos_array.push(exhaust_ammo);
        }

        if (flaming_ammo.capacities[0] != 0) {
          ammos_array.push(flaming_ammo);
        }

        if (water_ammo.capacities[0] != 0) {
          ammos_array.push(water_ammo);
        }

        if (freeze_ammo.capacities[0] != 0) {
          ammos_array.push(freeze_ammo);
        }

        if (thunder_ammo.capacities[0] != 0) {
          ammos_array.push(thunder_ammo);
        }

        if (dragon_ammo.capacities[0] != 0) {
          ammos_array.push(dragon_ammo);
        }

        if (slicing_ammo.capacities[0] != 0) {
          ammos_array.push(slicing_ammo);
        }

        if (wyvern_ammo.capacities[0] != 0) {
          ammos_array.push(wyvern_ammo);
        }

        if (demon_ammo.capacities[0] != 0) {
          ammos_array.push(demon_ammo);
        }

        if (armor_ammo.capacities[0] != 0) {
          ammos_array.push(armor_ammo);
        }

        if (tranq_ammo.capacities[0] != 0) {
          ammos_array.push(tranq_ammo);
        }
      }

      if (weapon_sharpness_map.has(k)) {
        const sharp = weapon_sharpness_map.get(k);
        sharpness = {
          maxed: sharp.maxed,
          red: sharp.red,
          orange: sharp.orange,
          yellow: sharp.yellow,
          green: sharp.green,
          blue: sharp.blue,
          white: sharp.white,
          purple: sharp.purple
        };
      }

      let kinsect_bonus = null;
      if (base.kinsect_bonus != 0) {
        kinsect_bonus = base.kinsect_bonus;
      }

      let elderseal = null;
      if (base.elderseal != 0) {
        elderseal = base.elderseal;
      }

      obj[
        k
          .split(`\"`)
          .join('')
          .toLowerCase()
          .replace(/ /g, '')
      ] = {
        id: base.id,
        name: base.name_en.split(`\"`).join(''),
        shelling: shelling,
        phials: phials,
        slots: slots_array,
        elements: elements_array,
        type: base.weapon_type,
        durability: sharpness,
        rarity: base.rarity,
        attack: base.attack,
        elderseal: elderseal,
        affinity: affinity,
        defense: defense,
        coatings: coatings,
        kinsect_bonus: kinsect_bonus,
        crafting: crafting,
        ammos: ammos_array,
        special_ammo: specialAmmo,
        deviation: deviation
      };
    }

    utils.writeFile(writeTo, obj);
  }
}

module.exports = Merge;
