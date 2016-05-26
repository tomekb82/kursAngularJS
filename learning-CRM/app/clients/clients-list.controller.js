(function(){

    angular.module('crmApp')
    .controller('ClientsListCtrl', ['$scope', 'clientsService', function($scope, clientsService){
            $scope.clients = [];

            clientsService.getClients(function(clients){
            	console.log("pobieram");
            	$scope.clients = clients;
            });

    }]);



})();