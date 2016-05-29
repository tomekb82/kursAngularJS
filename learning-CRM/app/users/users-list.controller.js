(function(){

    angular.module('crmApp')
    .controller('UsersListCtrl', ['$scope', 'usersService', 
    	function($scope, usersService){
        
            $scope.users = [];
            $scope.filterBy = {};
            $scope.orderByColumn = 'id';
            $scope.orderByDir = false;

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