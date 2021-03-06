(function(){

    angular.module('crmApp')
    .factory('sectorsService', ['$http','$log', function($http,$log){
        var _getSectors = function (callback) {

        	callback = callback||function(){};

            //http.get('app/sectors/sectors.json')
            $http.get('http://localhost:8089/api/sectors')
                .success(function (data) {
                    callback(data);
                })
                .error(function(data, status){
                 	$log.error('Wystąpił błąd "'+status+'" podczas żądania');
                });

		};   
        return {
        	getSectors: _getSectors
        };
    }]);



})();