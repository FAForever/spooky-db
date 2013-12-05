unitDb.filters = {
    name: function() {
            return function(item) {
                if (!item) return;
                return (item.name ? item.name + ': ' : '') + (item.tech == 'EXP' ? '' : item.tech + ' ') + item.description;
            }
        },

    pic: function() {
            return function (item) {
                if (!item) return;
                return 'img/units/'+item.id+'.png';
            }
        },

    icon: function() {
            return function (item) {
                if (!item) return;
                return 'img/strategic/' + item.faction + '_' + item.strategicIcon +'.png';
            }
        }
};
