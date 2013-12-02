import sys
import json

def load(path):
    units = json.loads(open(path).read())
    print('loaded {0} units'.format(len(units)))
    return units

def sort(units):
    CLASS_BUILD = 'Build'
    CLASS_LAND = 'Land'
    CLASS_AIR = 'Air'
    CLASS_NAVAL = 'Naval'
    CLASS_BASE = 'Base'

    TECH_1 = 'T1'
    TECH_2 = 'T2'
    TECH_3 = 'T3'
    TECH_X = 'Experimental'

    tech_lookup = {
        'RULEUTL_Basic': TECH_1,
        'RULEUTL_Advanced': TECH_2,
        'RULEUTL_Secret': TECH_3,
        'RULEUTL_Experimental': TECH_X,
        'TECH1': TECH_1,
        'TECH2': TECH_2,
        'TECH3': TECH_3,
        'EXPERIMENTAL': TECH_X,
    }

    FAC_UEF = 'UEF'
    FAC_CYBRAN = 'Cybran'
    FAC_AEON = 'Aeon'
    FAC_SERAPHIM = 'Seraphim'

    def tech_key(val):
        return {
            'TECH1': 1,
            'TECH2': 2,
            'TECH3': 3,
            'EXPERIMENTAL': 4,
            'RULEUTL_Basic': 5,
            'RULEUTL_Advanced': 6,
            'RULEUTL_Secret': 7,
            'RULEUTL_Experimental': 8,
        }[val]

    def get_tech(u):
        possible_tech_values = ['TECH1', 'TECH2', 'TECH3', 'EXPERIMENTAL', 'RULEUTL_Basic', 'RULEUTL_Advanced', 'RULEUTL_Secret', 'RULEUTL_Experimental']
        unit_values = u['Categories'] + [u['General']['TechLevel']]

        intersection = list(set(possible_tech_values).intersection(unit_values))
        intersection.sort(key=tech_key)

        return tech_lookup[intersection[0] if len(intersection) > 0 else None]

    def sort_key(u):
        faction_order = {
            FAC_UEF: 1,
            FAC_CYBRAN: 2,
            FAC_AEON: 3,
            FAC_SERAPHIM: 4
        }

        tech_order = {
            TECH_1: 1,
            TECH_2: 2,
            TECH_3: 3,
            TECH_X: 4
        }

        faction_key =  10000*faction_order[u['General']['FactionName']]
        tech_key = 1000*(tech_order[get_tech(u)] if get_tech(u) else 1)
        priority_key = u['BuildIconSortPriority'] if 'BuildIconSortPriority' in u else 100
        command_key = 11 if u['General']['Category'] == 'Command' or 'COMMAND' in u['Categories'] else 0

        # print('-{0}--------------------'.format(u['Id']))
        # print(faction_key)
        # print(tech_key)
        # print(priority_key)
        # print(command_key)
        # print(faction_key + tech_key + priority_key + command_key)

        return faction_key + tech_key + priority_key + command_key

    units.sort(key=sort_key)
    print('sorted')

def save(units, path):
    out = open(path, 'w+')
    json.dump(units, out, indent=2)
    print('saved to {0}'.format(path))

def run(path):
    units = load(path)
    sort(units)
    save(units, path)

if __name__ == "__main__":
    run(( sys.argv[1] if len(sys.argv) > 1 else False ) or 'd:/code/personal/html/unitdb/src/data/index.json')
