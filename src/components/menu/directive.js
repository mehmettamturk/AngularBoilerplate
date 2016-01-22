(function() {
    'use strict';


    /**
     * Angular definition.
     */
    App.directive('menu', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: "./components/menu/view.html",
            controller: Menu
        }
    });


    /**
     * Dependencies.
     */
    Menu.$inject = [
        '$rootScope',
        '$scope',
        '$state',
        'AccountService',
        '$http'
    ];


    /**
     * Menu Directive.
     */
    function Menu($rootScope, $scope, $state, AccountService, $http) {
        $scope.logout = function() {
            AccountService.logout();
            $state.go('homepage');
        };
    }
})();
