(function(){

    angular.module('crmApp')
    .controller('UsersListCtrl', ['$scope', 'usersService', 
    	function($scope, usersService){
        
            $scope.users = [];
            $scope.filterBy = {};

    
            usersService.getUsers(function(users){
            	$scope.users = users;
            });

    }]);



})();