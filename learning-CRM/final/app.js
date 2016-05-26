(function(){

    var app = angular.module('crmApp', ['ngRoute', 'crmService', 'ngMessages', 'ng-breadcrumbs']);

    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        $routeProvider
            .when('/clients', {
                controller: 'ClientsListCtrl',
                templateUrl: 'views/clients-list.html',
                label: 'Lista klientów'
            })
            .when('/clients/:clientId', {
                controller: 'ClientDetailsCtrl',
                templateUrl: 'views/client-details.html',
                label: 'Karta klienta'
            })
            .when('/sectors', {
                controller: 'SectorsCtrl',
                templateUrl: 'views/simple-list.html',
                label: 'Lista branż'
            })
            .when('/users', {
                controller: 'UsersCtrl',
                templateUrl: 'views/simple-list.html',
                label: 'Lista pracowników'
            })
            .otherwise({
                redirectTo: '/clients'
            })
        ;

        $locationProvider
            .html5Mode(true);

    }]);

    app.controller('MainCtrl', ['$scope', 'routeChecker', 'breadcrumbs', function($scope, routeChecker, breadcrumbs){
        $scope.routeChecker = routeChecker;
        $scope.breadcrumbs = breadcrumbs;
    }]);

    app.controller('SectorsCtrl', ['$scope', 'sectors', function($scope, sectors){
        $scope.items = [];
        $scope.filterBy = {};
        $scope.listHeading = 'Lista branz';

        sectors.getSectors(function (sectors) {
            $scope.items = sectors;
        });
    }]);

    app.controller('UsersCtrl', ['$scope', 'users', function($scope, users){
        $scope.items = [];
        $scope.filterBy = {};
        $scope.listHeading = 'Lista pracowników';

        users.getUsers(function (users) {
            $scope.items = users;
        });
    }]);

    app.controller('ClientsListCtrl', ['$scope', 'clients', 'users', 'sectors', function($scope, clients, users, sectors){

        $scope.clients = [];
        $scope.users = [];
        $scope.sectors = [];

        $scope.orderByColumn = 'id';
        $scope.orderByDir = false;

        $scope.filterBy = {};

        clients.getClients(function (clients) {
            $scope.clients = clients;
        });

        users.getUsers(function (users) {
            $scope.users = users;
        });

        sectors.getSectors(function (sectors) {
            $scope.sectors = sectors;
        });

        $scope.changeOrder = function (columnName) {

            if($scope.orderByColumn == columnName){
                $scope.orderByDir = !$scope.orderByDir;
            }else{
                $scope.orderByColumn = columnName;
                $scope.orderByDir = false;
            }
        };

        $scope.isOrderedBy = function (columnName) {
            return ($scope.orderByColumn == columnName);
        };

        $scope.isOrderedReverse = function () {
            return !$scope.orderByDir;
        };

    }]);

    app.controller('ClientDetailsCtrl', ['$scope', 'clients', '$routeParams', 'users', 'sectors', '$timeout', 'timeline', '$location', function($scope, clients, $routeParams, users, sectors, $timeout, timeline, $location){
        $scope.client = {};
        $scope.users = [];
        $scope.sectors = [];

        $scope.timeline = [];
        $scope.timelineHelper = timeline.getTimelineHelper();
        $scope.timelineEvent = {};
        $scope.eventTypes = timeline.getEventTypes();
        $scope.newEventCreatedMsg = false;

        $scope.clientNotFound = false;
        $scope.showSaveClientFormMsg = false;

        if('new' !== $routeParams.clientId){
            clients.getClient(
                $routeParams.clientId,
                function (data) {
                    $scope.client = data;

                    timeline.getClientTimeline($scope.client.id, function (timeline) {
                        $scope.timeline = timeline;
                        console.log($scope.timeline);
                    });
                },
                function (data, status) {
                    if(404 == status){
                        $scope.clientNotFound = true;
                    }
                }
            );
        }


        users.getUsers(function (users) {
            $scope.users = users;
        });

        sectors.getSectors(function (sectors) {
            $scope.sectors = sectors;
        });



        $scope.saveClientData = function () {

            if($scope.clientForm.$invalid) return;


            if('new' == $routeParams.clientId){

                clients.saveNewClient($scope.client, function (client) {

                     $location.path('/clients/'+client.id);

                });

            }else{
                clients.updateClient($scope.client.id, $scope.client, function (data) {
                    $scope.showSaveClientFormMsg = true;

                    $timeout(function () {

                        $scope.showSaveClientFormMsg = false;

                    }, 5000);
                });
            }


        };

        $scope.addEventTimeline = function () {

            if($scope.eventForm.$invalid) return;

            timeline.addTimelineEvent($scope.client.id, $scope.timelineEvent, function (timeline) {
                $scope.timeline = timeline;
                $scope.timelineEvent = {};

                $scope.newEventCreatedMsg = true;
                $scope.eventForm.$setUntouched();
                $scope.eventForm.$submitted = false;

                $timeout(function () {

                    $scope.newEventCreatedMsg = false;

                }, 5000);
            });

        };

        $scope.deleteClient = function () {

            if(!$scope.client.id) return;

            if(!confirm('Czy na pewno chcesz usunąć tego klienta?')) return;

            clients.deleteClient($scope.client.id, function () {
               alert('Klient został poprawnie usunięty');
               $location.path('/#/clients');
            });

        };

    }]);

})();