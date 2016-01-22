(function() {
    /**
     * Environment configuration
     */
    App.constant('config', {
        'SITE': '__SITE_URL__',
        'API_URL': '__API_URL__',
        'meta': {
            'title': 'Website',
            'description': 'Description',
            'keywords': 'key, words',
            'share': {
                'title': 'Website',
                'image': '/img/logo.png',
                'site': '/',
                'description': ''
            }
        }
    });

    App.constant('alertify', alertify);

    /**
     * Configure.
     */
    App.config(configure);


    /**
     * Dependencies.
     * @type {Array}
     */
    configure.$inject = ['$httpProvider', 'NotificationProvider', '$animateProvider', '$provide'];


    /**
     * Main configure method.
     */
    function configure($httpProvider, NotificationProvider, $animateProvider, $provide) {
        $animateProvider.classNameFilter(/animated/);
        $httpProvider.defaults.withCredentials = true;
        //$httpProvider.interceptors.push('apiHttpInterceptor');

        NotificationProvider.setOptions({
            delay: 10000,
            startTop: 10,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'right',
            positionY: 'top'
        });

        $provide.decorator('taOptions', ['taRegisterTool', '$delegate', function(taRegisterTool, taOptions) {
            taOptions.forceTextAngularSanitize = false;
            return taOptions;
        }]);
    };
})();
