const fetch = require('node-fetch');
const utils = require('../../../util/mapUtils');
const itemsURL = `https://mhw-db.com/items`;
const armorsURL = `https://mhw-db.com/armor/sets`;
const decorationsURL = `https://mhw-db.com/decorations`;
const skillsURL = `https://mhw-db.com/skills`;
const weaponsURL = `https://mhw-db.com/weapons`;
const armorPiecesURL = `https://mhw-db.com/armor`;

class Build {
  async getData(url) {
    const response = await fetch(url);
    return response.json();
  }

  async weapons(writeTo, dir) {
    const weapon_base = require(`${dir}/weapons/weapon_base.json`);
    const weapon_ammo = require(`${dir}/weapons/weapon_ammo.json`);
    const weapon_bow_ext = require(`${dir}/weapons/weapon_bow_ext.json`);
    const weapon_craft = require(`${dir}/weapons/weapon_craft.json`);
    const weapon_sharpness = require(`${dir}/weapons/weapon_sharpness.json`);
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
    let subObject = {};
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
          let curObject = {
            name: craft.item1_name,
            quantity: craft.item1_qty
          };
          crafting_array.push(curObject);
        }
        if (craft.item2_name != 0) {
          let curObject = {
            name: craft.item2_name,
            quantity: craft.item2_qty
          };
          crafting_array.push(curObject);
        }
        if (craft.item3_name != 0) {
          let curObject = {
            name: craft.item3_name,
            quantity: craft.item3_qty
          };
          crafting_array.push(curObject);
        }
        if (craft.item4_name != 0) {
          let curObject = {
            name: craft.item4_name,
            quantity: craft.item4_qty
          };
          crafting_array.push(curObject);
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
        let curObject = {
          type: base.element1,
          damage: base.element1_attack,
          hidden: base.element_hidden
        };
        elements_array.push(curObject);
      }
      if (base.element2 != 0) {
        let curObject = {
          type: base.element2,
          damage: base.element2_attack,
          hidden: base.element_hidden
        };
        elements_array.push(curObject);
      }
      if (base.slot_1 != 0) {
        let curObject = {
          rank: base.slot_1
        };
        slots_array.push(curObject);
      }
      if (base.slot_2 != 0) {
        let curObject = {
          rank: base.slot_2
        };
        slots_array.push(curObject);
      }
      if (base.slot_3 != 0) {
        let curObject = {
          rank: base.slot_3
        };
        slots_array.push(curObject);
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
      subObject[k.split(`\"`).join('').toLowerCase().replace(/ /g, '')] = {
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

    const weaponsDatabaseIterator = [];
    for (const i of Object.keys(subObject)) {
      weaponsDatabaseIterator.push(subObject[i]);
    }

    const object = {};

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

      let elderseal = '-';
      if (key.elderseal) {
        if (key.elderseal == null) elderseal = '-';
        elderseal = key.elderseal;
      }

      let shelling = '-';
      if (key.shelling) {
        shelling = {
          type: key.shelling.type,
          level: key.shelling.level
        };
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

          let curObject = {};
          curObject = {
            type: key.ammos[i].type,
            lv1: levelOne,
            lv2: levelTwo,
            lv3: levelThree
          };

          ammos.push(curObject);
        }
      }

      let elements = [];
      if (key.elements) {
        for (const i in key.elements) {
          let curObject = {};
          curObject = {
            type: key.elements[i].type.toLowerCase(),
            damage: key.elements[i].damage
          };

          elements.push(curObject);
        }
      }

      let slots = [];
      if (key.slots) {
        for (const i in key.slots) {
          let curObject = {};
          curObject = {
            rank: key.slots[i].rank
          };

          slots.push(curObject);
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
            let curObject = {};
            curObject = {
              name: key.crafting.materials[i].name,
              quantity: key.crafting.materials[i].quantity
            };

            crafting.push(curObject);
          }
        }

        if (key.crafting.type != null && key.crafting.type == 'Upgrade') {
          for (const i in key.crafting.materials) {
            let curObject = {};
            curObject = {
              name: key.crafting.materials[i].name,
              quantity: key.crafting.materials[i].quantity
            };

            upgrade.push(curObject);
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

      object[key.name.toLowerCase().replace(/ /g, '')] = {
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

    utils.writeFile(writeTo, object);
  }

  async items(writeTo) {
    const itemsAPIDatabase = await this.getData(itemsURL);
    const object = {};

    for (let key of itemsAPIDatabase) {
      object[key.name.toLowerCase().replace(/ /g, '')] = {
        name: key.name,
        description: key.description.replace(/\n/g, ' '),
        rarity: key.rarity,
        carryLimit: key.carryLimit,
        value: key.value
      };
    }

    const items = new Map();
    for (const i of Object.keys(object)) {
      items.set(i, object[i]);
    }

    utils.writeFile(writeTo, object);
  }

  async decorations(writeTo) {
    const decorationsAPIDatabase = await this.getData(decorationsURL);
    const object = {};

    for (let key of decorationsAPIDatabase) {
      let skills = [];

      for (let i of key.skills) {
        let curObject = {};
        curObject = {
          name: i.skillName,
          description: i.description.replace(/\n/g, ' '),
          level: i.level
        };

        skills.push(curObject);
        object[key.name.toLowerCase().replace(/ /g, '')] = {
          name: key.name,
          rarity: key.rarity,
          slot: key.slot,
          skills: skills
        };
      }
    }

    utils.writeFile(writeTo, object);
  }

  async skills(writeTo) {
    const skillAPIDatabase = await this.getData(skillsURL);
    const object = {};

    for (let key of skillAPIDatabase) {
      let ranks = [];

      for (let i of key.ranks) {
        let curObject = {};
        curObject = {
          level: i.level,
          description: i.description.replace(/\n/g, ' ')
        };

        ranks.push(curObject);
        object[key.name.toLowerCase().replace(/ /g, '')] = {
          name: key.name,
          description: key.description.replace(/\n/g, ' '),
          ranks: ranks
        };
      }
    }

    utils.writeFile(writeTo, object);
  }

  async armors(writeTo) {
    const armorsAPIDatabase = await this.getData(armorsURL);
    const object = {};

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
            let curObject = {};
            curObject = {
              name: key.bonus.name,
              description: i.description.replace(/\n/g, ' '),
              pieces: i.pieces
            };

            setBonus.push(curObject);
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
            let curObject = {};
            curObject = {
              piece: key.pieces[i].name,
              name: key.pieces[i].skills[v].skillName,
              rank: key.pieces[i].skills[v].level
            };
            armorSkills.push(curObject);
          }

          let curObject = {
            name: key.pieces[i].name,
            type: key.pieces[i].type
          };

          pieces.push(curObject);
          for (const v in key.pieces[i].slots) {
            if (
              key.pieces[i].slots.length &&
              Array.isArray(key.pieces[i].slots)
            ) {
              let curObject = {};
              curObject = {
                name: key.pieces[i].name,
                rank: key.pieces[i].slots[v].rank
              };

              slots.push(curObject);
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

      object[key.name.toLowerCase().replace(/ /g, '')] = {
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
    }

    utils.writeFile(writeTo, object);
  }

  async armorPieces(writeTo) {
    const armorsAPIDatabase = await this.getData(armorPiecesURL);
    const object = {};

    for (let key of armorsAPIDatabase) {
      let skills = [];

      if (key.skills) {
        for (const i in key.skills) {
          let curObject = {};
          curObject = {
            name: key.skills[i].skillName,
            level: key.skills[i].level,
            description: key.skills[i].description.replace(/\n/g, ' ')
          };

          skills.push(curObject);
        }
      }

      let slots = [];
      if (key.slots) {
        for (const i in key.slots) {
          let curObject = {};
          curObject = {
            rank: key.slots[i].rank
          };

          slots.push(curObject);
        }
      }

      let crafting = [];
      if (key.crafting) {
        if (key.crafting.materials) {
          for (const i in key.crafting.materials) {
            let curObject = {};
            curObject = {
              name: key.crafting.materials[i].item.name,
              description: key.crafting.materials[i].item.description.replace(
                /\n/g,
                ''
              ),
              quantity: key.crafting.materials[i].quantity
            };

            crafting.push(curObject);
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

      object[key.name.toLowerCase().replace(/ /g, '')] = {
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
    }

    utils.writeFile(writeTo, object);
  }
}

module.exports = new Build();
