(function() {
    /**
     * Routing configuration.
     */
    App.config(routes);


    /**
     * Dependencies.
     * @type {Array}
     */
    routes.$inject = [
        '$stateProvider',
        '$urlRouterProvider',
        '$locationProvider'
    ];


    /**
     * Routes.
     */
    function routes($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $stateProvider
            .state('homepage', {
                url: '/',
                templateUrl: './components/homepage/view.html',
                data: { pageTitle: 'Anasayfa' },
                controller: 'HomepageController'
            })
            .state('about', {
                url: '/about',
                templateUrl: './components/about/view.html',
                data: { pageTitle: 'About' },
                controller: 'AboutUsController'
            });

        $urlRouterProvider.otherwise('/');

        $locationProvider.html5Mode(true);
    };
})();
