(function() {
    'use strict';


    /**
     * Angular definition.
     */
    App.controller('HomepageController', HomepageController);


    /**
     * Dependencies.
     */
    HomepageController.$inject = [
        '$rootScope',
        '$scope',
        'Projects',
        'config'
    ];


    /**
     * Dashboard controller.
     */
    function HomepageController($rootScope, $scope, Projects, config) {
        $scope.projects = {};
        $scope.limit = 10;
        $scope.page = 0;

        $rootScope.updateMetaTags({
            title: 'Homepage',
            site: config.SITE + '/',
            image: config.SITE + '/img/logo.png',
            summary: 'Homepage summary'
        });

        $scope.loadMore = function() {
            $scope.page++;
            $scope.getList(true);
        };

        $scope.getList = function(isAppend) {
            var query = {
                limit: $scope.limit,
                skip: $scope.limit * $scope.page
            };

            Projects.query(query, function(data) {
                if (isAppend)
                    $scope.projects['rows'] = $scope.projects['rows'].concat(data['rows']);
                else
                    $scope.projects = data;
            });
        };

        $scope.getList();
    };
})();
