(function(){

    angular.module('crmApp')
    .controller('ClientDetailsCtrl', ['$scope', '$routeParams', '$timeout', '$location','clientsService', 'usersService', 'sectorsService', 
        function($scope, $routeParams, $timeout, $location, clientsService, usersService, sectorsService){
            $scope.client = {};//{ "id": 1, "company_name": "Lorem ipsum dolor", "contact_name": "Michalina Kwiatkowska", "contact_phone": "53 790 92 21", "contact_email": "MichalinaKwiatkowska@dayrep.com",             "account_manager_id": 1, "notes": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.", "sector_id": 5 };
            $scope.users = []; //[ { "id": 1, "name": "Konstantyn Kowalski" },             { "id": 2, "name": "Łukasz Pawłowski" }];
            $scope.sectors = [];

            $scope.clientNotFound = false;
            $scope.showSaveClientFormMsg = false;

            if('new' != $routeParams.clientId){
                clientsService.getClient(
                    $routeParams.clientId,
                    function (data) {
                        $scope.client = data[0];   
                        console.log($scope.client);              
                    },
                    function (data, status) {
                        if(404 == status){
                            $scope.clientNotFound = true;
                        }
                    }
                );
            }
            sectorsService.getSectors(function(sectors){
                $scope.sectors = sectors;
            });
            usersService.getUsers(function(users){
                $scope.users = users;
                console.log($scope.users);
            });

            $scope.saveClientData = function(){

                if($scope.clientForm.$invalid) return;

                if('new' == $routeParams.clientId){
                    clientsService.saveNewClient($scope.client, function (clientId) {
                        $location.path('/clients/'+clientId);
                    });
                }else{
                    clientsService.updateClient($scope.client.id, $scope.client, function (data) {
                        $scope.showSaveClientFormMsg = true;

                    $timeout(function () {

                        $scope.showSaveClientFormMsg = false;

                    }, 2000);
                    });
                }

            };

            $scope.deleteClient = function () {

                if(!$scope.client.id) return;

                if(!confirm('Czy na pewno chcesz usunąć tego klienta?')) return;

                clientsService.deleteClient($scope.client.id, function () {
                    alert('Klient został poprawnie usunięty');
                    $location.path('/#/clients');
                });

        };

}]);




})();