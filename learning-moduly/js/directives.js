(function(){

    var app = angular.module('exampleDirectives', ['exampleFilters']);

    app.directive('businessCard', function () {

        return {
            restrict: 'AEC',
            scope: {
                member: '='
            },
            templateUrl: function (elem, attr) {
                attr.type = attr.type||'simple';

                return 'member-'+attr.type+'-bc.html';
            }
        };

    });

})();