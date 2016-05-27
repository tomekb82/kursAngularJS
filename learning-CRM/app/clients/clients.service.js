(function(){

    angular.module('crmApp')
    .factory('clientsService', ['$http','$log', function($http,$log){
        var _getClients = function (callback) {

        	callback = callback||function(){};

            //$http.get('app/clients/clients.json')
            $http.get('http://localhost:8089/api/clients')
                .success(function (data) {
                    callback(data);
                })
                .error(function(data, status){
                 	$log.error('Wystąpił błąd "'+status+'" podczas żądania');
                });

		};   
        return {
        	getClients: _getClients
        };
    }]);



})();