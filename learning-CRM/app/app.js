(function(){

    angular.module('crmApp', ['ngRoute', 'ngMessages', 'ng-breadcrumbs'])

    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        $routeProvider
            .when('/clients', {
                controller: 'ClientsListCtrl',
                templateUrl: 'app/clients/clients-list.html',
                label: 'Lista klientów'
            })
            .when('/clients/:clientId', {
                controller: 'ClientDetailsCtrl',
                templateUrl: 'app/clients/client-details.html',
                label: 'Karta klienta'
            })
            .when('/sectors', {
                controller: 'SectorsListCtrl',
                templateUrl: 'app/sectors/sectors-list.html',
                label: 'Lista branż'
            })
            .when('/users', {
                controller: 'UsersListCtrl',
                templateUrl: 'app/users/users-list.html',
                label: 'Lista użytkowników systemu'
            })
            .when('/users/:userId', {
                controller: 'UserDetailsCtrl',
                templateUrl: 'app/users/user-details.html',
                label: 'Karta użytkownika'
            })
            .otherwise({
                redirectTo: '/clients'
            })
        ;

        $locationProvider
            .html5Mode(true);

    }])

    .controller('MainCtrl', ['$scope', 'routeChecker', 'breadcrumbs', function($scope, routeChecker, breadcrumbs){
         $scope.routeChecker = routeChecker;
         $scope.breadcrumbs = breadcrumbs;

    }])

    .factory('routeChecker', ['$location', function($location){
        return {
            isActive: function (location) {
                return (-1 !== $location.path().indexOf(location));
            }
        };
    }]);



})();