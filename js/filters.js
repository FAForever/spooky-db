unitDb.filters = {
    unsafe: ['$sce', function($sce) {
        return function(val) {
            return $sce.trustAsHtml(val);
        }
    }],

    flatten: function() {
        return function(item) {
            var separator = '<br/> ';

            if(angular.isArray(item)) {
                return item.join(separator)
            }

            if (angular.isObject(item)) {
                return _.map(item, function(v, k) {
                    if (angular.isObject(v)) return;

                    return k + (v === true ? '' :  ': ' + v)
                }).join(separator)
            }

            return item;
        }
    },

    time: function() {
        return function(item) {
            function padTime(val) {
                return ("00"+val).slice(-2);
            }
            return Math.floor((item%3600)/60) + ":" + padTime(Math.floor((item%3600)%60));
        }
    },

    round: function() {
        return function(item) {
            return Math.round(item);
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
    },

    shorten: function() {
        return function(num) {
            if (num > 1000*1000*1000-1)
                return num/(1000*1000*1000) + "G";

            if (num > 1000*1000-1)
                return num/(1000*1000) + "M";

            if (num > 1000-1)
                return num/1000 + "k";

            return num;
        }
    },

    dps: function() {
        return function(weapon) {
            // TODO
            return '?!? ';//weapon.Damage;
        }
    }
};
