(function(){

    angular.module('crmApp', ['ngRoute', 'ngMessages'])

    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        $routeProvider
            .when('/clients', {
                controller: 'ClientsListCtrl',
                templateUrl: 'app/clients/clients-list.html',
                label: 'Lista klientów'
            })
           
            .otherwise({
                redirectTo: '/clients'
            })
        ;

        $locationProvider
            .html5Mode(true);

    }])

    .controller('MainCtrl', ['$scope', function($scope){

    }]);



})();