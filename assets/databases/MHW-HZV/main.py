import json

with open('MHW-HZV.csv','r') as f:
  content = [line.split(',') for line in f.read().split('\n')]
  content = [ [value for value in line if value != ''] for line in content if line != 'PART,SEVER,BLUNT,RANGED,FIRE,WATER,THUNDER,ICE,DRAGON,STUN,STAMINA'.split(',')] # clean up empty slots 

monsters = {}

for values in content:
  if len(values) == 1:
    monsterKey = values[0]
    monsters[monsterKey.lower().replace(' ','')] = {'name' : monsterKey}
    monsterKey = monsterKey.lower().replace(' ','')
  else:
    part,sever,blunt,ranged,fire,water,thunder,ice,dragon,stun,stamina = values
    monsters[monsterKey][part.lower()] = {
      'sever' : int(sever),
      'blunt' : int(blunt),
      'ranged' : int(ranged),
      'fire' : int(fire),
      'water' : int(water),
      'thunder' : int(thunder),
      'ice' : int(ice),
      'dragon' : int(dragon),
      'stun' : int(stun),
      'stamina' : int(stamina)
    }


with open('MHW-HZV.json', 'w') as outfile:
    json.dump(monsters,outfile,indent = 4)