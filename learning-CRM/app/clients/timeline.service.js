(function(){

    angular.module('crmApp')
    .factory('timelineService', ['$http','$log', function($http,$log){
        var eventTypes = [
            {
                value: 'phone',
                name: 'Kontakt telefoniczny'
            },
            {
                value: 'envelope-o',
                name: 'Kontakt mailowy'
            },
            {
                value: 'users',
                name: 'Spotkanie'
            },
            {
                value: 'file-text-o',
                name: 'Podpisanie umowy'
            }
        ];
        
        var _addTimelineEvent = function(clientId, eventData, success){

            success = success||function(){};

            $http.post('http://localhost:8089/api/clients/'+clientId+'/timeline', eventData)
                .success(function (data) {
                    success(data);
            });

        };
        var _getClientTimeline = function(clientId, success, error){
            success = success||function(){};
            error = error||function(){};

            $http.get('http://localhost:8089/api/clients/' +clientId+'/timeline')
                .success(function (data) {
                    success(data);
                })
                .error(error);
        };
        return {
            getEventTypes: function(){
                return eventTypes;
            },
            addTimelineEvent: _addTimelineEvent,
            getClientTimeline: _getClientTimeline
        };
    }]);



})();