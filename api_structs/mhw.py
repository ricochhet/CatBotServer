import json


class MHWStruct:
  def __init__(self, manager):
    self.manager = manager

  def struct_weapons(self):
    weapon_info = json.load(
        open("data/build/api/weapon_info.json", encoding="utf8"))
    self.manager.create("weapons", "(name TEXT UNIQUE, type TEXT, rarity TEXT, displayAttack TEXT, rawAttack TEXT, damageType TEXT, affinity TEXT, defense TEXT, sharpness TEXT, elderseal TEXT, shelling TEXT, specialAmmo TEXT, deviation TEXT, ammos TEXT, elements TEXT, slots TEXT, coatings TEXT, crafting TEXT, upgrade TEXT)")
    for i in weapon_info:
      sharpness = []
      if weapon_info[i]["sharpness"]["base"] == "-":
        sharpness.append(f"-")
      else:
        sharpness.append(
            f'[{{"red": "{weapon_info[i]["sharpness"]["base"]["red"]}","orange": "{weapon_info[i]["sharpness"]["base"]["orange"]}","yellow": "{weapon_info[i]["sharpness"]["base"]["yellow"]}","green": "{weapon_info[i]["sharpness"]["base"]["green"]}","blue": "{weapon_info[i]["sharpness"]["base"]["blue"]}","white": "{weapon_info[i]["sharpness"]["base"]["white"]}","purple": "{weapon_info[i]["sharpness"]["base"]["purple"]}"}}]')

      shelling = []
      if weapon_info[i]["shelling"] == "-":
        shelling.append(f"-")
      else:
        shelling.append(
            f'[{{"type": "{weapon_info[i]["shelling"]["type"]}","level": "{weapon_info[i]["shelling"]["level"]}"}}]')

      ammos = []
      for k in weapon_info[i]["ammos"]:
        if k == "-":
          ammos.append(f"-")
        else:
          ammos.append(
              f'[{{"type": "{k["type"]}","lv1": "{k["lv1"]}","lv2": "{k["lv2"]}","lv3": "{k["lv3"]}"}}]')

      elements = []
      for k in weapon_info[i]["elements"]:
        if k == "-":
          elements.append(f"-")
        else:
          elements.append(
              f'[{{"type": "{k["type"]}","damage": "{k["damage"]}"}}]')

      slots = []
      for k in weapon_info[i]["slots"]:
        if k == "-":
          slots.append(f"-")
        else:
          slots.append(
              f'[{{"slots": "{k["rank"]}"}}]')

      crafting = []
      for k in weapon_info[i]["crafting"]:
        if k == "-":
          crafting.append(f"-")
        else:
          crafting.append(
              f'[{{"name": "{k["name"]}","quantity": "{k["quantity"]}"}}]')

      upgrade = []
      for k in weapon_info[i]["upgrade"]:
        if k == "-":
          upgrade.append(f"-")
        else:
          upgrade.append(
              f'[{{"name": "{k["name"]}","quantity": "{k["quantity"]}"}}]')
      self.manager.insert("(name, type, rarity, displayAttack, rawAttack, damageType, affinity, defense, sharpness, elderseal, shelling, specialAmmo, deviation, ammos, elements, slots, coatings, crafting, upgrade)", "(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", True, [weapon_info[i]["name"], weapon_info[i]["type"], weapon_info[i]["rarity"], weapon_info[i]["displayAttack"], weapon_info[
                          i]["rawAttack"], weapon_info[i]["damageType"], weapon_info[i]["affinity"], weapon_info[i]["defense"], "&&".join(sharpness), weapon_info[i]["elderseal"], "&&".join(shelling), weapon_info[i]["specialAmmo"], weapon_info[i]["deviation"], "&&".join(ammos), "&&".join(elements), "&&".join(slots), ",".join(weapon_info[i]["coatings"]), "&&".join(crafting), "&&".join(upgrade)])

  def struct_skills(self):
    skill_info = json.load(
        open("data/build/api/skill_info.json", encoding="utf8"))
    self.manager.create(
        "skills", "(name TEXT UNIQUE, description TEXT, ranks TEXT)")
    for i in skill_info:
      skills = []
      for k in skill_info[i]["ranks"]:
        if k == "-":
          skills.append(f"-")
        else:
          skills.append(
              f'[{{"description": "{k["description"]}","level": "{k["level"]}"}}]')
      self.manager.insert("(name, description, ranks)", "(?, ?, ?)", True, [
                          skill_info[i]["name"], skill_info[i]["description"], "&&".join(skills)])

  def struct_items(self):
    item_info = json.load(
        open("data/build/api/item_info.json", encoding="utf8"))
    self.manager.create(
        "items", "(name TEXT UNIQUE, description TEXT, rarity TEXT, carryLimit TEXT, buy TEXT, value TEXT)")
    for i in item_info:
      self.manager.insert("(name, description, rarity, carryLimit, buy, value)", "(?, ?, ?, ?, ?, ?)", True, [
                          item_info[i]["name"], item_info[i]["description"], item_info[i]["rarity"], item_info[i]["carryLimit"], item_info[i]["buy"], item_info[i]["value"], ])

  def struct_decorations(self):
    decoration_info = json.load(
        open("data/build/api/decoration_info.json", encoding="utf8"))
    self.manager.create(
        "decorations", "(name TEXT UNIQUE, rarity TEXT, slot TEXT, skills TEXT)")
    for i in decoration_info:
      skills = []
      for k in decoration_info[i]["skills"]:
        if k == "-":
          skills.append(f"-")
        else:
          skills.append(
              f'[{{"name": "{k["name"]}","description": "{k["description"]}","level": "{k["level"]}"}}]')
      self.manager.insert("(name, rarity, slot, skills)",
                          "(?, ?, ?, ?)", True, [decoration_info[i]["name"], decoration_info[i]["rarity"], decoration_info[i]["slot"], "&&".join(skills)])

  def struct_armors(self):
    armor_info = json.load(
        open("data/build/api/armor_info.json", encoding="utf8"))
    self.manager.create("armors", "(name TEXT UNIQUE, rank TEXT, setBonus TEXT, defenseBase TEXT, defenseMax TEXT, defenseAugmented TEXT, resistanceFire TEXT, resistanceWater TEXT, resistanceThunder TEXT, resistanceIce TEXT, resistanceDragon TEXT, pieces TEXT, skills TEXT, slots TEXT)")
    for i in armor_info:
      set_bonus = []
      pieces = []
      skills = []
      slots = []
      for k in armor_info[i]["setBonus"]:
        if k == "-":
          set_bonus.append(f'-')
        else:
          set_bonus.append(
              f'[{{"name": "{k["name"]}","description": "{k["description"]}","pieces": "{k["pieces"]}"}}]')

      for k in armor_info[i]["pieces"]:
        pieces.append(f'[{{"name": "{k["name"]}","type": "{k["type"]}"}}]')

      for k in armor_info[i]["skills"]:
        skills.append(
            f'[{{"piece": "{k["piece"]}","name": "{k["name"]}","rank": "{k["rank"]}"}}]')

      for k in armor_info[i]["slots"]:
        if k == "-":
          slots.append(f"-")
        else:
          slots.append(f'[{{"name": "{k["name"]}","rank": "{k["rank"]}"}}]')

      self.manager.insert("(name, rank, setBonus, defenseBase, defenseMax, defenseAugmented, resistanceFire, resistanceWater, resistanceThunder, resistanceIce, resistanceDragon, pieces, skills, slots)",
                          "(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", True, [armor_info[i]["name"], armor_info[i]["rank"], "&&".join(set_bonus), armor_info[i]["defenses"]["base"], armor_info[i]["defenses"]["max"], armor_info[i]["defenses"]["augmented"], armor_info[i]["resistances"]["fire"], armor_info[i]["resistances"]["water"], armor_info[i]["resistances"]["thunder"], armor_info[i]["resistances"]["ice"], armor_info[i]["resistances"]["dragon"], "&&".join(pieces), "&&".join(skills), "&&".join(slots)])

  def struct_monsters(self):
    monster_data = json.load(
        open("data/build/def/monster_info.json", encoding="utf8"))
    monster_hitzones = json.load(
        open("data/build/def/hitzone_data.json", encoding="utf8"))
    monster_enrage = json.load(
        open("data/build/def/enrage_data.json", encoding="utf8"))

    self.manager.create("monsters", "(name TEXT UNIQUE, aliases TEXT, title TEXT, url TEXT, description TEXT, thumbnail TEXT, elements TEXT, ailments TEXT, blights TEXT, locations TEXT, info TEXT, slash TEXT, blunt TEXT, shot TEXT, fire TEXT, water TEXT, thunder TEXT, ice TEXT, dragon TEXT, hitzones TEXT, enrage TEXT)")
    for i in monster_data:
      if monster_hitzones[i["name"].lower().replace(" ", "")]:
        hitzone_data = monster_hitzones[i["name"].lower().replace(" ", "")]
        hitzone_array = []
        for k, v in hitzone_data.items():
          hitzone_object = {
              "part": k,
              "ke": hitzone_data[k]["ke"],
              "slash": hitzone_data[k]["slash"],
              "blunt": hitzone_data[k]["blunt"],
              "ranged": hitzone_data[k]["ranged"],
              "fire": hitzone_data[k]["fire"],
              "water": hitzone_data[k]["water"],
              "thunder": hitzone_data[k]["thunder"],
              "ice": hitzone_data[k]["ice"],
              "dragon": hitzone_data[k]["dragon"],
              "stun": hitzone_data[k]["stun"],
              "flinch": hitzone_data[k]["flinch"],
              "trip": hitzone_data[k]["trip"],
              "timer": hitzone_data[k]["timer"],
              "wound": hitzone_data[k]["wound"],
              "sever": hitzone_data[k]["sever"],
              "notes": hitzone_data[k]["notes"],
          }

          hitzone_array.append(f'[{{"{hitzone_object["part"]}": {{"ke": "{hitzone_object["ke"]}","slash": "{hitzone_object["slash"]}","blunt": "{hitzone_object["blunt"]}","ranged": "{hitzone_object["ranged"]}","fire": "{hitzone_object["fire"]}","water": "{hitzone_object["water"]}","thunder": "{hitzone_object["thunder"]}","ice": "{hitzone_object["ice"]}","dragon": "{hitzone_object["dragon"]}","stun": "{hitzone_object["stun"]}","flinch": "{hitzone_object["flinch"]}","trip": "{hitzone_object["trip"]}","timer": "{hitzone_object["timer"]}","wound": "{hitzone_object["wound"]}","sever": "{hitzone_object["sever"]}","notes": "{hitzone_object["notes"]}"}}}}]')
      if monster_enrage[i["name"].lower().replace(" ", "")]:
        enrage_data = monster_enrage[i["name"].lower().replace(" ", "")]
        enrage_array = []
        for k, v in enrage_data.items():
          enrage_object = {
              "tender": enrage_data["tender"],
              "dmgToEnrage": enrage_data["dmgToEnrage"],
              "enrageDuration": enrage_data["enrageDuration"],
              "enrageSpeed": enrage_data["enrageSpeed"],
              "monstrDmg": enrage_data["monstrDmg"],
              "playerDmg": enrage_data["playerDmg"],
              "tenderizeFormula": enrage_data["tenderizeFormula"],
          }

          enrage_array.append(
              f'[{{"tender": "{enrage_object["tender"]}","dmgToEnrage": "{enrage_object["dmgToEnrage"]}","enrageDuration": "{enrage_object["enrageDuration"]}","enrageSpeed": "{enrage_object["enrageSpeed"]}","monstrDmg": "{enrage_object["monstrDmg"]}","playerDmg": "{enrage_object["playerDmg"]}","tenderizeFormula": "{enrage_object["tenderizeFormula"]}"}}]')
      self.manager.insert("(name, aliases, title, url, description, thumbnail, elements, ailments, blights, locations, info, slash, blunt, shot, fire, water, thunder, ice, dragon, hitzones, enrage)",
                          "(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", True,
                          [i["name"], ",".join(i["details"]["aliases"]), i["details"]["title"], i["details"]["url"], i["details"]["description"], i["details"]["thumbnail"], i["details"]["elements"], i["details"]["ailments"], i["details"]["blights"], i["details"]["locations"], i["details"]["info"], i["details"]["hzv"]["slash"], i["details"]["hzv"]["blunt"], i["details"]["hzv"]["shot"], i["details"]["hzv"]["fire"], i["details"]["hzv"]["water"], i["details"]["hzv"]["thunder"], i["details"]["hzv"]["ice"], i["details"]["hzv"]["dragon"], "&&".join(hitzone_array), "&&".join(enrage_array)])
