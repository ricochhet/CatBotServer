import json

with open('enrage.tsv', 'r', encoding="utf8") as f:
  openFile = f.read()

openFile = openFile.split('\n')
openFile = [[value if len(value) >= 1 and value !=
             '–' else '-' for value in line.split(u'\u0009')] for line in openFile][1:]


lineObjects = []
keyValues = ['largeMonster', 'tender', 'dmgToEnrage', 'enrageDuration',
             'enrageSpeed', 'monstrDmg', 'playerDmg', 'tenderizeFormula']
for line in openFile:
  obj = {}
  for (key, value) in zip(keyValues, line):
    if value.isdigit():
      if value == '❶':
        value = 1
      elif value == '❷':
        value = 2
      elif value == '❸':
        value = 3
      elif value == '❹':
        value = 4
      elif value == '❶❷❸':
        value = '1/2/3'
      else:
        value = int(value)

    obj[key] = value
  lineObjects.append(obj)

monsters = {}
monstersUnnamed = {}

for obj in lineObjects:
  monsterKey = obj['largeMonster'].lower().replace(' ', '')
  if monsterKey not in monsters:
    monsters[monsterKey] = {}
    monstersUnnamed[monsterKey] = {}

  monsters[monsterKey] = {
      'name': obj['largeMonster'],
      'tender': obj['tender'],
      'dmgToEnrage': obj['dmgToEnrage'],
      'enrageDuration': obj['enrageDuration'],
      'enrageSpeed': obj['enrageSpeed'],
      'monstrDmg': obj['monstrDmg'],
      'playerDmg': obj['playerDmg'],
      'tenderizeFormula': obj['tenderizeFormula'],
  }

  monstersUnnamed[monsterKey] = {
      'tender': obj['tender'],
      'dmgToEnrage': obj['dmgToEnrage'],
      'enrageDuration': obj['enrageDuration'],
      'enrageSpeed': obj['enrageSpeed'],
      'monstrDmg': obj['monstrDmg'],
      'playerDmg': obj['playerDmg'],
      'tenderizeFormula': obj['tenderizeFormula'],
  }

with open('enrage.json', 'w', encoding="utf8") as outfile:
    json.dump(monstersUnnamed, outfile, ensure_ascii=False, indent=4)
with open('enrg.json', 'w', encoding="utf8") as outfile:
    json.dump(monsters, outfile, ensure_ascii=False, indent=4)
