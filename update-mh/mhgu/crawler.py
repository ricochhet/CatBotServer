
import requests
from bs4 import BeautifulSoup
import pprint
import json

response = requests.get( 'https://mhgu.kiranico.com/' )
soup = BeautifulSoup( response.text, 'html.parser' )

tables = soup.find_all( 'table', class_ = 'table table-sm table-bordered' )

LargeMonsters = tables[-2]

monsters = [
    {
        'title': monster.text.strip(),
        'url': monster.get('href'),
        'hitData': {},
        'bodyPart': {},
        'abnormalStatus': {}
    } for monster in LargeMonsters.find_all('a')
]

outputJson = {}
for monster in monsters:

    response = requests.get( monster['url'] )
    soup = BeautifulSoup( response.text, 'html.parser' )

    pprint.pprint( f"Started Gathering {monster['title']} data." )

    # Hitzones
    hitzones = soup.find( 'div', class_ = 'col-lg-8' )
    table = hitzones.find('table')
    
    for tr in table.find_all('tr'):
        part = None
        for td in tr.find_all('td'):
            if ' '.join( td['class'] ) == 'vertical-align text-center':
                monster['hitData'][part].append( int( td.text.strip() ) )
            else:
                part = td.text.strip()
                monster['hitData'][part] = []

    # Body part
    bodys = soup.find( 'div', class_ = 'col-lg-4' )

    for tr in bodys.find_all('tr'):

        body = None
        for td in tr.find_all('td'):
            
            if ' '.join( td.get('class') ) == 'vertical-align text-center':

                value = td.text.replace(' ', '').replace('\n', '').replace('[', ' [' )
                
                if 'R' in value:
                    value = 'R'
                elif 'G' in value:
                    value = 'G'
                elif 'O' in value:
                    value = 'O'
                elif 'W' in value:
                    value = 'W'

                monster['bodyPart'][body].append( value )
            else:
                body = td.text.strip()
                monster['bodyPart'][body] = []


    # Abnormal Status
    abnormals = soup.find( 'div', class_ = 'col-lg-7' )
    
    for tr in abnormals.find_all( 'tr' ):
        
        status = None
        for td in tr.find_all( 'td' ):

            if td.get('class') != None :
                monster['abnormalStatus'][status].append( td.text.strip() if len( td.text.strip() ) != 0 else '0' )
            else:
                status = td.text.strip()
                monster['abnormalStatus'][status] = []

    outputJson[ ''.join( monster['title'].lower().split(' ') ) ] = monster
    pprint.pprint( f"Finsied Gathering {monster['title']} data." )



output = json.dumps( outputJson, indent=4 )

with open( './mhgu/output/monsters.json', 'w' ) as f:
    f.write(output) 