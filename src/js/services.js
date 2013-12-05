unitDb.services = {
    data: ['$http', function($http) {
        return {
            items: $http.get('data/index.json'),
            contenders: []
        };
    }]
};
