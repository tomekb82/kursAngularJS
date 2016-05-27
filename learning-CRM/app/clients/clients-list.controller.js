(function(){

    angular.module('crmApp')
    .controller('ClientsListCtrl', ['$scope', 'clientsService', 'sectorsService', function($scope, clientsService, sectorsService){
            $scope.clients = [];
            $scope.sectors = [];
            $scope.filterBy = {};

            clientsService.getClients(function(clients){
            	$scope.clients = clients;
            });

            sectorsService.getSectors(function(sectors){
            	$scope.sectors = sectors;
            });

    }]);



})();