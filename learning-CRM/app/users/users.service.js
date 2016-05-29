(function(){

    angular.module('crmApp')
    .factory('usersService', ['$http','$log', function($http,$log){
        var _getUsers = function (callback) {

        	callback = callback||function(){};

            //$http.get('app/users/users.json')
            $http.get('http://localhost:8089/api/users')
                .success(function (data) {
                    callback(data);
                })
                .error(function(data, status){
                 	$log.error('Wystąpił błąd "'+status+'" podczas żądania');
                });

		};   
        var _getUser = function (userId, success, error) {

            success = success||function(){};
            error = error||function(){};

            $http.get('http://localhost:8089/api/users/' + userId)
                .success(function (data) {
                    success(data);
                })
                .error(error);

        };
        return {
        	getUsers: _getUsers,
            getUser: _getUser
        };
    }]);



})();