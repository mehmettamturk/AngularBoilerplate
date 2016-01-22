(function() {
    /**
     * Empty templates module. This module is used when compiling html
     * views into angular's template cache.
     */
    angular.module('templates', []);


    /**
     * Define our app.
     */
    window.App = angular.module('App', [
        'ui.router',
        'ui-notification',
        'ngSanitize',
        'ngResource',
        'angularFileUpload',
        'ngFileUpload',
        '720kb.socialshare',
        'textAngular',
        'templates'
    ]);


    /**
     * Init global settings and run the app.
     */
    App.run(run);


    /**
     * Dependencies of run method.
     * @type {Array}
     */
    run.$inject = [
        '$rootScope',
        '$state',
        'config',
        'AccountService',
        'alertify'
    ];


    /**
     * Run method.
     */
    function run($rootScope, $state, config, AccountService, alertify) {
        $rootScope.currentUser = null;

        $rootScope.$state = $state; // state to be accessed from view
        $rootScope.config = config;

        $rootScope.$watch(function () {
            return AccountService.loggedIn;
        }, function(val) {
            $rootScope.loggedIn = val;
            $rootScope.currentUser = AccountService.getUser();
        } , true );

        $rootScope.updateMetaTags = function(data) {
            $rootScope.config.meta.share.title = data.title;
            $rootScope.config.meta.share.site = data.site;
            $rootScope.config.meta.share.image = data.image;
            $rootScope.config.meta.share.description = data.summary;
        };
    };
})();
