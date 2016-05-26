(function(){

    var app = angular.module('exampleControllers', ['exampleDirectives', 'exampleServices']);

    app.controller('TeamsController', ['$scope', 'teamNotifier', 'memberLoader', function($scope, teamNotifier, memberLoader){

        memberLoader('team1', function (data) {
            $scope.team1 = data;
        });

        memberLoader('team2', function (data) {
            $scope.team2 = data;
        });

        memberLoader('leader', function (data) {
            $scope.teamLeader = data;
        });

        $scope.notifyTeam = function (team) {
            teamNotifier(team, 'Do roboty!');
        };
    }]);

    app.controller('ProjectsController', ['$scope', 'projectsLoader', function($scope, projectsLoader){
        $scope.projects = projectsLoader();
    }]);

})();