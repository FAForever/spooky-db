from datetime import datetime, date, timedelta
import json
import urllib.request

base_big = 'http://faforever.com/faf/unitsDB/icons/big/{0}_icon.png'
base_small = 'http://faforever.com/faf/unitsDB/icons/small/{0}_{1}.png'
unit_index = 'd:/code/personal/html/unitdb/src/data/index.json'

index = json.loads(open(unit_index).read())

for unit in index:
    id = unit['id']
    faction = unit['faction']
    icon = unit['strategicIcon']
    try:
        fn, headres = urllib.request.urlretrieve(base_big.format(id.lower()), './img/{0}.png'.format(id))
        print(fn)
        fn, headres = urllib.request.urlretrieve(base_small.format(faction.lower(), icon.lower()), './img_small/{0}_{1}.png'.format(faction, icon))
        print(fn)
    except Exception as e:
        print(e)
        print("[Error] {0}".format(id))

print('Done')
