(function() {
    'use strict';


    /**
     * Angular definition.
     */
    angular
        .module('App')
        .factory('apiHttpInterceptor', ApiHttpInterceptor);


    /**
     * Dependencies.
     * @type {Array}
     */
    ApiHttpInterceptor.$inject = ['$q', '$rootScope'];


    /**
     * Api http interceptor.
     */
    function ApiHttpInterceptor($q, $rootScope) {
        return {
            // We cannot use Notification module here as it requires
            // $http module and this interceptor is used in $httpProvider
            // config phase. So we use event based communication. See app#run
            // for error display.
            'requestError': function(rejection) {
                var errors = rejection.data.errors ||
                    rejection.data.error && [rejection.data.error];

                $rootScope.$emit('api-error', errors);

                return $q.reject(rejection);
            },
            'responseError': function(rejection) {
                var errors = rejection.data && (rejection.data.errors ||
                    rejection.data.error && [rejection.data.error]);

                //if (rejection.status == 401)
                //    return $rootScope.redirectToLogin();
                //
                //if (!errors && rejection.status == 403)
                //    errors = [{message: 'You do not have privileges to do ' +
                //        'that action.'}];
                //
                //if (!errors && rejection.status == 404)
                //    errors = [{message: 'Requested resource is removed or ' +
                //        'does not exist.'}];
                //
                //if (!errors && rejection.status == 502)
                //    errors = [{message: 'Unexpected error occurred at ' +
                //        'server. Please contact administrator.'}];

                $rootScope.$emit('api-error', errors ||
                    [{message: 'Error in request'}]);

                return $q.reject(rejection);
            }
        };
    };
})();
