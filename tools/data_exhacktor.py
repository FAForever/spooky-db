import os
import re
import glob
import json
import shutil

class UnitThumb:
    CLASS_BUILD = 'Build'
    CLASS_LAND = 'Land'
    CLASS_AIR = 'Air'
    CLASS_NAVAL = 'Naval'
    CLASS_BASE = 'Base'

    TECH_1 = 'T1'
    TECH_2 = 'T2'
    TECH_3 = 'T3'
    TECH_X = 'Experimental'

    FAC_UEF = 'UEF'
    FAC_CYBRAN = 'Cybran'
    FAC_AEON = 'Aeon'
    FAC_SERAPHIM = 'Seraphim'

    @staticmethod
    def sort_order(u):
        faction_order = {
            UnitThumb.FAC_UEF: 1,
            UnitThumb.FAC_CYBRAN: 2,
            UnitThumb.FAC_AEON: 3,
            UnitThumb.FAC_SERAPHIM: 4
        }

        tech_order = {
            UnitThumb.TECH_1: 1,
            UnitThumb.TECH_2: 2,
            UnitThumb.TECH_3: 3,
            UnitThumb.TECH_X: 4
        }

        # TODO: more sorting?
        return 10000*faction_order[u.faction] + 1000*tech_order[u.tech]  + u.order

    def __init__(self):
        self.id = "" # URL0107
        self.name = "" # Mantis
        self.description = "" # Assault Bot
        self.faction = "" # Cybran
        self.classification = "" # RULEUC_MilitaryVehicle
        self.tech = "" # RULEUTL_Basic
        self.strategicIcon = "" # icon_bot1_directfire
        self.icon = "" # land
        self.order = 1000

    def __repr__(self):
        return json.dumps(self, cls=UnitThumbEncoder, indent=2)

class UnitThumbEncoder(json.JSONEncoder):
    def default(self, o):
        return o.__dict__

class UnitFactory:
    classification_lookup = {
        'RULEUC_Engineer': UnitThumb.CLASS_BUILD,
        'RULEUC_Commander': UnitThumb.CLASS_BUILD,
        'RULEUMT_Amphibious': UnitThumb.CLASS_LAND,
        'RULEUC_MilitaryVehicle': UnitThumb.CLASS_LAND,
        'RULEUC_MilitaryAircraft': UnitThumb.CLASS_AIR,
        'RULEUC_MilitarySub': UnitThumb.CLASS_NAVAL,
        'RULEUC_MilitaryShip': UnitThumb.CLASS_NAVAL,
        'RULEUC_Weapon': UnitThumb.CLASS_BASE,
        'RULEUC_Sensor': UnitThumb.CLASS_BASE,
        'RULEUC_Factory': UnitThumb.CLASS_BASE,
        'RULEUC_Resource': UnitThumb.CLASS_BASE,
        'RULEUC_MiscSupport': UnitThumb.CLASS_BASE,
        'RULEUC_CounterMeasure': UnitThumb.CLASS_BASE
    }

    tech_lookup = {
        'RULEUTL_Basic': UnitThumb.TECH_1,
        'RULEUTL_Advanced': UnitThumb.TECH_2,
        'RULEUTL_Secret': UnitThumb.TECH_3,
        'RULEUTL_Experimental': UnitThumb.TECH_X
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
            thumb.tech = UnitThumb.TECH_X

        x = re.search("BuildIconSortPriority = (\d+)", bp)
        thumb.order = int(x.group(1)) if x else 1000

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

    units.sort(key=UnitThumb.sort_order)

    try:
        json.dump(units, out, cls=UnitThumbEncoder, indent=2)
    finally:
        out.close()

if __name__ == "__main__":
    run('d:/code/personal/html/unitdb/tools/units', 'd:/code/personal/html/unitdb/src/data/index.json')
