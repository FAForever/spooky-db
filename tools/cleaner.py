import os
import re
import sys
import json

def load(path):
    units = json.loads(open(path).read())
    print('loaded {0} units'.format(len(units)))
    
    white_list = ['UEB0101','UEB3101','UEL0105','UEA0101','UEB0102','UEB3102','UEL0101','UES0203','UEA0102','UEB0103','UEL0106','UES0103','UEA0103','UEB1103','UEL0201','UEA0107','UEL0104','UEB1106','UEL0103','UEB1101','UEB1102','UEB1105','UEA0003','XEA3204','UEB2101','UEB2104','UEB2109','UEB5101','UEL0208','XEL0209','DEA0202','DEL0204','UEA0204','UEL0202','XES0102','UEL0203','UEA0203','UES0201','UES0202','UEA0104','UEB1202','UEB0201','UEB1104','ZEB9501','UEB0202','XES0205','ZEB9502','UEB0203','UEB1201','ZEB9503','UEL0205','UEL0111','UEB2301','UEL0307','UEB2204','UEB2205','UEB2303','UEB2108','UEB4201','UEB4202','UEB4202','UEB3201','UEB3202','UEB4203','XEB0104','UEB5202','UEL0309','UES0304','UEA0302','UEL0303','UES0302','XES0307','UEL0301','UEA0303','UEL0304','XEL0305','XEL0306','UEA0304','UEB0301','UEB1302','ZEB9601','UEA0305','UEB0302','UEB1303','ZEB9602','UEB0303','XEA0306','ZEB9603','UEB1301','XEB2306','UEB2304','UEB2302','UEB2305','UEB4302','UEB4301','UES0305','UEB3104','XEB0204','UEB0304','UEL0401','XEA0002','UES0401','XEB2402','UEL0001','UEB2401','URB0101','URL0105','URA0101','URB0102','URL0101','URA0102','URB0103','URL0106','URS0203','URA0103','URB1103','URL0107','URS0103','XRA0105','URA0107','URL0104','URB1106','URL0103','URB1101','URB1102','URB1105','URB2101','URB2104','URB2109','URB3101','URB3102','URB5101','URL0208','XRL0004','DRA0202','DRL0204','URA0204','URL0202','XRS0204','URL0203','URS0201','URA0203','URL0205','URS0202','URA0104','URB1202','URL0111','XRS0205','URB0201','URB1104','ZRB9501','URB0202','URL0306','ZRB9502','URB0203','URB1201','ZRB9503','XRL0302','URB2301','URB2204','URB2205','URB2303','URB2108','URB4201','URB4202','URB4204','URB4205','URB4206','URB4207','URB3201','URB3202','URB4203','XRB0104','XRB0204','XRB0304','URB5202','URL0309','XRL0002','XRL0003','XRL0005','URA0302','URL0303','URS0304','XRL0305','URL0301','URA0303','URL0304','URS0302','URA0304','URB0301','URB1302','URS0303','ZRB9601','URB0302','URB1303','XRA0305','ZRB9602','URB0303','ZRB9603','URB1301','URB2304','XRB2308','URB2302','URB2305','URB4302','URS0305','URB3104','XRB3301','URB0304','URL0401','URL0402','XRL0403','URA0401','URL0001','UAB0101','UAL0105','UAA0101','UAB0102','UAL0101','UAA0102','UAB0103','UAL0106','UAS0203','UAA0103','UAB1103','UAL0201','UAS0102','UAS0103','UAA0107','UAB1106','UAL0104','UAB1101','UAL0103','UAB1102','UAB1105','UAB2101','UAB2104','UAB2109','UAB5101','UAB3101','UAB3102','UAL0208','XAA0202','XAS0204','UAA0204','UAL0202','XAL0203','UAL0205','UAA0203','UAL0111','UAS0201','DAA0206','UAA0104','UAB1202','UAS0202','UAB0201','UAB1104','UAL0307','ZAB9501','UAB0202','ZAB9502','UAB0203','UAB1201','ZAB9503','UAB2301','UAB2204','UAB2205','UAB2303','UAB2108','UAB4201','UAB4202','UAB3201','UAB3202','UAB4203','UAB5202','UAL0309','UAS0304','XAL0305','UAS0302','UAA0302','UAL0303','XAS0306','UAL0301','UAA0303','UAL0304','UAS0303','XAA0306','DAL0310','UAA0304','UAB0301','UAB1302','ZAB9601','UAB0302','UAB1303','XAA0305','ZAB9602','UAB0303','ZAB9603','UAB1301','UAB2304','UAB2302','XAB2307','UAB2305','UAB4302','UAB4301','UAS0305','UAB3104','XAB3301','UAB0304','UAL0401','UAA0310','UAL0001','UAS0401','XAB1401','XSB0101','XSL0105','XSA0101','XSB0102','XSL0101','XSL0201','XSA0102','XSB0103','XSS0203','XSA0103','XSB1103','XSS0103','XSA0107','XSL0104','XSB1106','XSL0103','XSB1101','XSB1102','XSB1105','XSB2101','XSB2104','XSB2109','XSB5101','XSB3101','XSB3102','XSL0208','XSA0202','XSA0204','XSL0202','XSA0203','XSL0203','XSS0201','XSS0202','XSL0205','XSA0104','XSB1202','XSL0111','XSB0201','XSB1104','ZSB9501','XSB0202','ZSB9502','XSB0203','XSB1201','ZSB9503','XSB2301','XSB2204','XSB2205','XSB2303','XSB2108','XSB4201','XSB4202','XSB3201','XSB3202','XSB4203','XSB5202','XSL0309','XSS0304','XSA0302','XSL0303','XSL0305','XSS0302','XSL0301','XSA0303','XSS0303','XSA0304','XSB0301','XSB1302','ZSB9601','XSB0302','XSB1303','XSL0304','XSL0307','ZSB9602','XSB0303','ZSB9603','XSB1301','XSB2304','XSB2302','XSB2305','XSB4302','XSB4301','XSB3104','XSB0304','XSA0402','XSL0401','XSL0001','XSB2401']
    white_list += ['DRLK001', 'DELK002', 'DALK003', 'DSLK004'] # t3 anti air
    units = [ u for u in units if 'Id' in u.keys() and u['Id'] in white_list ]

    print('white listed {0} out of {1} units'.format(len(units), len(white_list)))
    return units

def save(units, path, debug=False):
    out = open(path, 'w+')
    json.dump(units, out, indent=(2 if debug else None))
    print('saved to {0}'.format(path))

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

        try:
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
        except:
            print('sort error. unit {0}'.format(u['Id']))
            raise

    units.sort(key=sort_key)
    print('sorted')

def slenderize(units, app_path = 'd:/code/personal/html/unitdb/app'):
    VIEWS = ['compare.html', 'home.html', 'thumb.html', 'unit.html']
    SCRIPTS = ['filters.js', 'main.js', 'dps.js', 'UnitDecorator.js']

    def extract_properties(files):
        properties = []
        regex = re.compile('\s*\w*\.([\w\.]*)(?:\s*\|\s*\w+){0,}\s*') # match foo.bar.buz... | filter

        for v in files:
            with open(v) as f:
                for l in f.readlines():
                    properties += regex.findall(l)

        return set(properties)

    def filter_lowercase(properties):
        return [p for p in properties if len(p) > 0 and p[0].isupper()]

    def split_nested(properties):
        return set([e for p in properties for e in p.split('.')])

    def handle_enhancements(d, props):
        for k in dict(d).keys():
            if k == 'Slots' or k.endswith('Remove'):
                d.pop(k)
            else:
                trim(d[k], props)

    def trim(u, props):
        for k in dict(u).keys():
            if k not in props:
                u.pop(k)
            elif (type(u[k]) is dict):
                if k == 'Enhancements': # ugh
                    handle_enhancements(u[k], props)
                else:
                    trim(u[k], props)
            elif (type(u[k]) is list):
                for x in u[k]:
                    if (type(x) is dict):
                        trim(x, props)

    view_props = extract_properties([os.path.join(app_path, 'views', v) for v in VIEWS])
    script_props = extract_properties([os.path.join(app_path, 'js', s) for s in SCRIPTS])
    # not detected by script because of usage in unit.html ... well, shit happens
    other_props = ['Level1', 'Level2', 'Level3', 'Level4', 'Level5']
    other_props += ['BuildRate', 'StorageMass', 'StorageEnergy', 'ProductionPerSecondMass', 'ProductionPerSecondEnergy', 'MaintenanceConsumptionPerSecondEnergy']
    
    props = filter_lowercase(view_props.union(script_props).union(other_props))
    props = split_nested(props)
    props = sorted(props)

    for u in units:
        trim(u, props)

    print('slenderized')

def run(path):

    data = os.path.join(path, 'data', 'index.json')
    dataFat = os.path.join(path, 'data', 'index.fat.json')

    units = load(data)
    print('sorting')
    sort(units)
    save(units, dataFat) # save for dev and debug purpuses
    print('slenderizing')
    slenderize(units, path)
    save(units, data)

if __name__ == '__main__':
    run(( sys.argv[1] if len(sys.argv) > 1 else False ) or 'd:/code/personal/html/unitdb/app')
