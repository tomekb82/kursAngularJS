(function(){

    angular.module('crmApp')
    .controller('ClientsListCtrl', ['$scope', 'clientsService', 'sectorsService', 'usersService', 
    	function($scope, clientsService, sectorsService, usersService){
            $scope.clients = [];
            $scope.sectors = [];
            $scope.users = [];
            $scope.filterBy = {};
            $scope.orderByColumn = 'id';
            $scope.orderByDir = false;

            clientsService.getClients(function(clients){
            	$scope.clients = clients;
            });

            sectorsService.getSectors(function(sectors){
            	$scope.sectors = sectors;
            });
            usersService.getUsers(function(users){
            	$scope.users = users;
            });

            $scope.changeOrder = function(columnName){
                if($scope.orderByColumn == columnName){
                    $scope.orderByDir = !$scope.orderByDir;
                }else{
                    $scope.orderByColumn = columnName;
                    $scope.orderByDir = false;
                }
            }

            $scope.isOrderedReverse = function(){
                return !$scope.orderByDir; 
            }

            $scope.isOrderedBy = function(columnName){
                return $scope.orderByColumn == columnName;
            }

    }]);



})();