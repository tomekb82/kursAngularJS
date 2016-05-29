(function(){

    angular.module('crmApp')
    .controller('UserDetailsCtrl', ['$scope', '$routeParams', 'usersService', 
        function($scope, $routeParams, usersService){
            
            $scope.user = {};
            $scope.userNotFound = false;

            console.log($routeParams.userId);
            
            if('new' != $routeParams.userId){
                usersService.getUser(
                    $routeParams.userId,
                    function (data) {
                        $scope.user = data[0];   
                        console.log($scope.user);              

                    },
                    function (data, status) {
                        if(404 == status){
                            $scope.userNotFound = true;
                        }
                    }
                );
            }

}]);




})();