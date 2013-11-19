import os
import re
import glob
import json
import shutil

class UnitThumb:
    @staticmethod
    def comparer(u):

        faction_order = { 'UEF': 1, 'Cybran': 2, 'Aeon': 3, 'Seraphim': 4 }
        tech_order = { 'T1': 1, 'T2': 2, 'T3': 3, 'Experimental': 4 } # TODO: remove doubled code

        # TODO: more sorting?
        return 1000*faction_order[u.faction] + 100*tech_order[u.tech] 

    def __init__(self):
        self.id = "" # URL0107
        self.name = "" # Mantis
        self.description = "" # Assault Bot
        self.faction = "" # Cybran
        self.classification = "" # RULEUC_MilitaryVehicle
        self.tech = "" # RULEUTL_Basic
        self.strategicIcon = "" # icon_bot1_directfire
        self.icon = "" # land

    def __repr__(self):
        return json.dumps(self, cls=UnitThumbEncoder, indent=2)

class UnitThumbEncoder(json.JSONEncoder):
    def default(self, o):
        return o.__dict__

class UnitFactory:
    classification_lookup = {
        'RULEUC_Engineer': 'Build',
        'RULEUC_Commander': 'Build',
        'RULEUMT_Amphibious': 'Land',
        'RULEUC_MilitaryVehicle': 'Land',
        'RULEUC_MilitaryAircraft': 'Air',
        'RULEUC_MilitarySub': 'Naval',
        'RULEUC_MilitaryShip': 'Naval',
        'RULEUC_Weapon': 'Base',
        'RULEUC_Sensor': 'Base',
        'RULEUC_Factory': 'Base',
        'RULEUC_Resource': 'Base',
        'RULEUC_MiscSupport': 'Base',
        'RULEUC_CounterMeasure': 'Base'
    }

    tech_lookup = {
        'RULEUTL_Basic': 'T1',
        'RULEUTL_Advanced': 'T2',
        'RULEUTL_Secret': 'T3',
        'RULEUTL_Experimental': 'Experimental'
    }

    @staticmethod
    def extract_id(path):
        return os.path.basename(path).replace('_unit.bp', '');

    @staticmethod
    def create(path):
        thumb = UnitThumb()
        thumb.id = UnitFactory.extract_id(path);

        f = open(path, 'r')
        bp = f.read()

        x = re.search("UnitName = '(?:<.*>)(.+)'", bp)
        thumb.name = x.group(1) if x else ''

        thumb.description = re.search("Description = '(?:<.*>)(.+)'", bp).group(1)
        thumb.faction = re.search("FactionName = '(.+)'", bp).group(1)
        thumb.classification = UnitFactory.classification_lookup[re.search("Classification = '(.+)'", bp).group(1)]
        thumb.tech = UnitFactory.tech_lookup[re.search("TechLevel = '(.+)'", bp).group(1)]
        thumb.strategicIcon = re.search("StrategicIconName = '(.+)'", bp).group(1)

        if thumb.strategicIcon == 'icon_experimental_generic': # HACK
            thumb.tech = 'Experimental' # TODO: DRY 

        # BuildIconSortPriority = 15

        x = re.search("Icon = '(.+)'", bp)
        thumb.icon = x.group(1) if x else ''

        return thumb

def run(source, destination):
    print('Looking through {0} directory'.format(source))

    units = []
    i = 0
    for bp in glob.glob(source + '/*/*.bp'):
        i += 1
        print('... {0}'.format(bp))
        units.append(UnitFactory.create(bp))
    
    print('Done parsing {0} units'.format(i))

    print('Saving to: {0}'.format(destination))
    out = open(destination, 'w+')

    units.sort(key=UnitThumb.comparer)

    try:
        json.dump(units, out, cls=UnitThumbEncoder, indent=2)
    finally:
        out.close()

if __name__ == "__main__":
    run('d:/code/personal/html/unitdb/tools/units', 'd:/code/personal/html/unitdb/src/data/index.json')
