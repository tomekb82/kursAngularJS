(function(){

    var app = angular.module('exampleServices', []);

    app.factory('projectsLoader', function(){
        var projects = [
            {
                name: 'Kurs AngularJS',
                client: 'wp.pl'
            },
            {
                name: 'Kurs Spring',
                client: 'wp.pl'
            },
            {
                name: 'Kurs Java',
                client: 'wp.pl'
            },
        ];

        return function (){
            return projects;
        };
    });

    app.factory('memberLoader', ['$http', '$log', function($http, $log){
        var cache = {};
        var urls = {
            'team1': 'members-team1.json',
            'team2': 'members-team2.json',
            'leader': 'team-leader.json',
        };

        return function (type, callback){
            if(angular.isUndefined(cache[type])){
                callback = callback||function(){};

                var url = urls[type];

                $http.get(urls[type])
                    .success(function (data, status, headers, config) {
                        cache[type] = data;
                        callback(data);
                    })
                    .error(function (data, status, headers, config) {

                        $log.error('Wystąpił błąd podczas żądania "'+url+'"!');

                    });
            }else{
                callback(data);
            }

        };
    }])

    app.factory('teamNotifier',  ['$log', function($log) {
        var notifyMember = function (member, message) {
            $log.info('Wysyłam wiadomość "'+message+'" do '+member.name+' ('+member.email+')');
        };

        return function (members, message){
            for (var i = 0; i < members.length; i++) {
                notifyMember(members[i], message);
            };
        };
    }]);

})();