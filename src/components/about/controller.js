(function() {
    'use strict';


    /**
     * Angular definition.
     */
    App.controller('AboutUsController', AboutUsController);


    /**
     * Dependencies.
     */
    AboutUsController.$inject = [
        '$rootScope',
        '$scope',
        'config'
    ];


    /**
     * AboutUs controller.
     */
    function AboutUsController($rootScope, $scope, config) {
        $rootScope.updateMetaTags({
            title: 'About',
            site: config.SITE + '/',
            image: config.SITE + '/img/logo.png',
            summary: 'About page summary'
        });
    }
})();
