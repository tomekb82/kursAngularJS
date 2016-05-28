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
        var _getClient = function (clientId, success, error) {

            success = success||function(){};
            error = error||function(){};

            $http.get('http://localhost:8089/api/clients/' + clientId)
                .success(function (data) {
                    success(data);
                })
                .error(error);

        };
        var _updateClient = function (clientId, clientData, success) {

            success = success||function(){};

            $http.put('http://localhost:8089/api/clients/' + clientId, clientData)
                    .success(success);

        };
        return {
            getClient: _getClient,
        	getClients: _getClients,
            updateClient: _updateClient
        };
    }]);



})();