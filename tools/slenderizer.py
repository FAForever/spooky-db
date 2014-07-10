import re
import os.path
import sys
import sorter

def slenderize(units, app_path = 'd:/code/personal/html/unitdb/app'):
    VIEWS = ['compare.html', 'home.html', 'thumb.html', 'unit.html']
    SCRIPTS = ['filters.js', 'main.js']

    def extract_properties(files):
        properties = []
        regex = re.compile('\s*\w*\.([\w\.]*)(?:\s*\|\s*\w+){0,}\s*') # match foo.bar.buz... | filter

        for v in files:
            with open(v) as f:
                for l in f.readlines():
                    properties += regex.findall(l)

        return set(properties)

    def filter_lowercase(properties):
        return [p for p in properties if p[0].isupper()]

    def split_nested(properties):
        return set([e for p in properties for e in p.split('.')])

    def trim(u, props):
        for k in dict(u).keys():
            if k not in props:
                u.pop(k)
            elif (type(u[k]) is dict):
                trim(u[k], props)
            elif (type(u[k]) is list):
                for x in u[k]:
                    if (type(x) is dict):
                        trim(x, props)

    view_props = extract_properties([os.path.join(app_path, 'views', v) for v in VIEWS])
    script_props = extract_properties([os.path.join(app_path, 'js', s) for s in SCRIPTS])
    other_props = ['Level1', 'Level2', 'Level3', 'Level4', 'Level5'] # not detected by script because of usage in unit.html ... well, shit happens
    
    props = filter_lowercase(view_props.union(script_props).union(other_props))
    props = split_nested(props)
    props = sorted(props)

    for u in units:
        trim(u, props)

def run(read_path, write_path):
    units = sorter.load(read_path)
    slenderize(units)
    sorter.save(units, write_path)

if __name__ == '__main__':
    run(( sys.argv[1] if len(sys.argv) > 1 else False ) or 'd:/code/personal/html/unitdb/app/data/index.fat.json', ( sys.argv[2] if len(sys.argv) > 2 else False ) or 'd:/code/personal/html/unitdb/app/data/index.json')
