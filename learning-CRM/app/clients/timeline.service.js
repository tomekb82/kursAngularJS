(function(){

    angular.module('crmApp')
    .factory('timelineService', ['$http','$log', function($http,$log){
        var helperOptions = {
            'phone': {
                color: 'blue',
                message: 'telefon do klienta'
            },
            'envelope-o': {
                color: 'green',
                message: 'wysyłka maila do klienta'
            },
            'users': {
                color: 'purple',
                message: 'spotkanie z kilentem'
            },
            'file-text-o': {
                color: 'red',
                message: 'podpisanie umowy z klientem'
            }
        };
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
        
         var _timelineHelper = function (contactType, option) {
            return helperOptions[contactType][option];

        };

        var _addTimelineEvent = function(clientId, eventData, success){

            success = success||function(){};

            $http.post('http://localhost:8089/api/clients/'+clientId+'/timeline', eventData)
                .success(function (data) {
                    success(data);
            });

        };
        var __parseTimeline = function (timeline) {

            angular.forEach(timeline, function (element, index) {
                element['contact_date'] = new Date(element['contact_date']);
            });

            return timeline;
        };

        var _getEvent = function (timeline, idx, callback) {

            callback = callback||function(){};
            angular.forEach(timeline, function (element, index) {
                if(idx == element.id){;
                    element['contact_date'] = new Date(element['contact_date']);
                    callback(element);
                }
            });
        };

        var _getClientTimeline = function(clientId, success, error){
            success = success||function(){};
            error = error||function(){};

            $http.get('http://localhost:8089/api/clients/' +clientId+'/timeline')
                .success(function (timeline) {
                    timeline = __parseTimeline(timeline);  
                    success(timeline);
                })
                .error(error);
        };
        var _deleteEvent = function(clientId, eventId, success){
            success = success||function(){};
                $http.delete('http://localhost:8089/api/clients/'+clientId+'/timeline/' + eventId)
                    .success(function (data) {
                    success(data);
            });
        };

        return {
            getEventTypes: function(){
                return eventTypes;
            },
            getTimelineHelper: function(){
                return _timelineHelper;
            },
            addTimelineEvent: _addTimelineEvent,
            getClientTimeline: _getClientTimeline,
            deleteEvent: _deleteEvent,
            getEvent: _getEvent
        };
    }]);



})();