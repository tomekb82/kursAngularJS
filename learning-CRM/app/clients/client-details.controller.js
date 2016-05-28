(function(){

    angular.module('crmApp')
    .controller('ClientDetailsCtrl', ['$scope', '$routeParams', 'clientsService', 'usersService', 'sectorsService', 
        function($scope, $routeParams, clientsService, usersService, sectorsService){
            $scope.client = {};//{ "id": 1, "company_name": "Lorem ipsum dolor", "contact_name": "Michalina Kwiatkowska", "contact_phone": "53 790 92 21", "contact_email": "MichalinaKwiatkowska@dayrep.com",             "account_manager_id": 1, "notes": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.", "sector_id": 5 };
            $scope.users = []; //[ { "id": 1, "name": "Konstantyn Kowalski" },             { "id": 2, "name": "Łukasz Pawłowski" }];
            $scope.sectors = [];
            $scope.clientNotFound = false;

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
            sectorsService.getSectors(function(sectors){
                $scope.sectors = sectors;
            });
            usersService.getUsers(function(users){
                $scope.users = users;
                console.log($scope.users);
            });

            $scope.saveClientData = function(){
                clientsService.updateClient($scope.client.id, $scope.client, function (data) {
                
                console.log("UPDATE ok");
                });

            };
}]);




})();