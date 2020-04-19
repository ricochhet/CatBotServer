class Parser {
  constructor(lib) {
    this.lib = lib;
  }

  parse_as_armors(data) {
    let object = {};
    const map = this.lib.to_map(data, {
      raw: true
    }).map;

    for (const [k, v] of map) {
      const item = map.get(k);

      let array_setBonus = [];
      let array_pieces = [];
      let array_skills = [];
      let array_slots = [];

      for (const i in item.setBonus) {
        if (item.setBonus[i] == '-') {
          array_setBonus.push('-');
        } else {
          array_setBonus.push(
            `${item.setBonus[i].name}: ${item.setBonus[i].description} (${item.setBonus[i].pieces} pieces)`
          );
        }
      }

      for (const i in item.pieces) {
        array_pieces.push(item.pieces[i].name);
      }

      for (const i in item.skills) {
        array_skills.push(item.skills[i].name);
      }

      for (const i in item.slots) {
        if (item.slots[i] == '-') {
          array_slots.push('-');
        } else {
          array_slots.push(
            `${item.slots[i].name}: Slot LV${item.slots[i].rank}`
          );
        }
      }

      object[k] = {
        name: item.name,
        setBonus: array_setBonus,
        defenses: `Base: ${item.defenses.base}\nMax: ${item.defenses.max}\nAugmented: ${item.defenses.augmented}`,
        resistances: `🔥 ${item.resistances.fire}\n💧 ${item.resistances.water}\n⚡ ${item.resistances.thunder}\n❄ ${item.resistances.ice}\n🐉 ${item.resistances.dragon}`,
        pieces: array_pieces,
        skills: array_skills,
        slots: array_slots
      };
    }

    return object;
  }

  parse_as_decorations(data) {
    let object = {};
    const map = this.lib.to_map(data, {
      raw: true
    }).map;

    for (const [k, v] of map) {
      const item = map.get(k);

      let array_skills = [];
      for (const i in item.skills) {
        array_skills.push(
          `${item.skills[i].name}: ${item.skills[i].description} LV${item.skills[i].level}`
        );
      }

      object[k] = {
        name: item.name,
        rarity: item.rarity,
        slot: item.slot,
        skills: array_skills
      };
    }

    return object;
  }

  parse_as_skills(data) {
    let object = {};
    const map = this.lib.to_map(data, {
      raw: true
    }).map;

    for (const [k, v] of map) {
      const item = map.get(k);

      let array_ranks = [];
      for (const i in item.ranks) {
        array_ranks.push(
          `LV${item.ranks[i].level}: ${item.ranks[i].description}`
        );
      }

      object[k] = {
        name: item.name,
        description: item.description,
        ranks: array_ranks
      };
    }

    return object;
  }

  parse_as_weapons(data) {
    let object = {};
    const map = this.lib.to_map(data, {
      raw: true
    }).map;

    for (const [k, v] of map) {
      const item = map.get(k);

      let string_shelling = `-`;
      let string_sharpness = `-`;
      let array_ammos = [];
      let array_elements = [];
      let array_slots = [];
      let array_crafting = [];
      let array_upgrading = [];

      if (item.shelling.type != null && item.shelling.level != null) {
        string_shelling = `${item.shelling.type} LV${item.shelling.level}`;
      }

      if (item.ammos != `-`) {
        for (const i in item.ammos) {
          array_ammos.push(
            `${item.ammos[i].type}\nLV1: ${item.ammos[i].lv1}\nLV2: ${item.ammos[i].lv2}\nLV3: ${item.ammos[i].lv3}`
          );
        }
      } else {
        array_ammos = `-`;
      }

      if (item.elements != `-`) {
        for (const i in item.elements) {
          array_elements.push(
            `${item.elements[i].type}: ${item.elements[i].damage} damage`
          );
        }
      } else {
        array_elements = `-`;
      }

      if (item.slots != `-`) {
        for (const i in item.slots) {
          array_slots.push(`Rank: ${item.slots[i].rank}`);
        }
      } else {
        array_slots = `-`;
      }

      if (item.crafting != `-`) {
        for (const i in item.crafting) {
          array_crafting.push(
            `${item.crafting[i].name} (x${item.crafting[i].quantity})`
          );
        }
      } else {
        array_crafting = `-`;
      }

      if (item.upgrade != `-`) {
        for (const i in item.upgrade) {
          array_upgrading.push(
            `${item.upgrade[i].name} (x${item.upgrade[i].quantity})`
          );
        }
      } else {
        array_upgrading = `-`;
      }

      if (item.sharpness.base != `-`) {
        string_sharpness = `Red: ${item.sharpness.base.red}\nOrange: ${item.sharpness.base.orange}\nYellow: ${item.sharpness.base.yellow}\nGreen: ${item.sharpness.base.green}\nBlue: ${item.sharpness.base.blue}\nWhite: ${item.sharpness.base.white}\nPurple: ${item.sharpness.base.purple}`;
      } else {
        string_sharpness = `-`;
      }

      object[k] = {
        name: item.name,
        type: item.type,
        rarity: item.rarity,
        displayAttack: item.displayAttack,
        rawAttack: item.rawAttack,
        damageType: item.damageType,
        affinity: item.affinity,
        defense: item.defense,
        sharpness: {
          base: string_sharpness
        },
        elderseal: item.elderseal,
        shelling: string_shelling,
        specialAmmo: item.specialAmmo,
        deviation: item.deviation,
        ammos: array_ammos,
        elements: array_elements,
        slots: array_slots,
        coatings: item.coatings,
        crafting: array_crafting,
        upgrade: array_upgrading
      };
    }

    return object;
  }
}

module.exports = new Parser();
