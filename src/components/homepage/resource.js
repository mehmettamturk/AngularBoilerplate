(function() {
    'use strict';


    /**
     * Angular definition.
     */
    App.factory('Items', Items);

    /**
     * Dependencies.
     */
    Items.$inject = [
        '$resource',
        'config'
    ];


    /**
     * Items factory.
     */
    function Items($resource, config) {
        return $resource(config.API_URL + '/api/items/:id', {
            id: '@_id'
        }, {
            'save': {method: 'POST', url: config.API_URL + '/api/items'},
            'update': {method: 'PUT', url: config.API_URL + '/api/items/:id'},
            'remove': {method: 'DELETE', url: config.API_URL + '/api/items/:id'},
            'random': {method: 'GET', url: config.API_URL + '/api/items/random', isArray: true},
            'query': {method: 'GET', isArray: false}
        })
    }
})();
