(function(){

    angular.module('crmApp')
    .controller('ClientsListCtrl', ['$scope', 'clientsService', 'sectorsService', 'usersService', 
    	function($scope, clientsService, sectorsService, usersService){
            $scope.clients = [];
            $scope.sectors = [];
            $scope.users = [];
            $scope.filterBy = {};

            clientsService.getClients(function(clients){
            	$scope.clients = clients;
            });

            sectorsService.getSectors(function(sectors){
            	$scope.sectors = sectors;
            });
            usersService.getUsers(function(users){
            	$scope.users = users;
            });

    }]);



})();