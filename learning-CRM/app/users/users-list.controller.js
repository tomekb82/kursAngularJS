(function(){

    angular.module('crmApp')
    .controller('UsersListCtrl', ['$scope', '$location', 'usersService', 
    	function($scope, $location, usersService){
        
            $scope.users = [];
            $scope.showUsers = false;

            $scope.admins = [];
            $scope.devs = [];
            $scope.teamLeader = {};

            $scope.filterBy = {};
            $scope.orderByColumn = 'id';
            $scope.orderByDir = false;

            usersService.getUsers(function(users){
            	$scope.users = users;

                angular.forEach(users, function (element, index) {
                if('admin' == element.position){
                    element.avatar = 'img/admin-avatar.jpg';
                    $scope.admins.push(element);
                }
                if('developer' == element.position){
                    element.avatar = 'img/dev-avatar.png';
                    $scope.devs.push(element);
                }
                if('leader' == element.position){
                    element.avatar = 'img/leader-avatar.png';
                    $scope.teamLeader = element;
                }
            });
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

            $scope.showUserDetails = function(userId){
                $location.path('/users/'+userId);
            }

    }]);



})();