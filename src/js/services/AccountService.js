(function() {
    'use strict';


    /**
     * Angular definition.
     */
    App.factory('AccountService', AccountService);


    /**
     * Dependencies.
     */
    AccountService.$inject = [
        '$http',
        'config'
    ];


    /**
     * Account service.
     */
    function AccountService($http, config) {
        var AccountService = {};
        AccountService.currentUser = {};
        AccountService.loggedIn = false;

        AccountService.getUser = function() {
            return AccountService.currentUser;
        };

        return AccountService;
    }
})();
