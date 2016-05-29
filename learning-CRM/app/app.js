(function(){

    angular.module('crmApp', ['ngRoute', 'ngMessages'])

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

    .controller('MainCtrl', ['$scope', function($scope){

    }]);



})();