(function() {
    'use strict';


    /**
     * Angular definition.
     */
    App.directive('footer', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: "./components/footer/view.html",
            controller: Footer
        }
    });


    /**
     * Dependencies.
     */
    Footer.$inject = [
        '$rootScope',
        '$scope',
        '$window'
    ];


    /**
     * Footer Directive.
     */
    function Footer($rootScope, $scope, $window) {
        $scope.goTo = function(param) {
            switch (param) {
                case 'facebook':
                    $window.open('https://www.facebook.com/D%C3%BC%C5%9Fle-Be%C5%9Fikta%C5%9F-745796092185231/?fref=ts', '_blank');
                    break;
                case 'twitter':
                    $window.open('https://twitter.com/duslebesiktas', '_blank');
                    break;
                case 'xin1':
                    $window.open('http://xin1.co', '_blank');
                    break;
                case 'hane':
                    $window.open('http://hanecreative.com', '_blank');
                    break;
            }
        }
    };
})();
