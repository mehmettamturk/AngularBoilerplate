(function() {
    'use strict';


    /**
     * Angular definition.
     */
    App.directive('datepicker', function() {
        return {
            restrict: 'A',
            scope: {action: '&'},
            link : function (scope, element, attrs, ngModelCtrl) {
                $(function() {
                    $.datepicker.setDefaults($.datepicker.regional['tr']);
                    element.datepicker({
                        dateFormat: attrs.format || 'dd MM yy',
                        yearRange: "c-100:c+0",
                        maxDate: attrs.maxDate || "+0D",
                        changeMonth: true,
                        changeYear: true,
                        lang: 'tr',
                        onSelect:function (date) {
                            scope.action({value: date});
                        }
                    });
                });
            }
        };
    });
})();
