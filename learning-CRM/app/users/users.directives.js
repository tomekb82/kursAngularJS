(function(){

  angular.module('crmApp')
    .directive('businessCard', function () {

      return {
          scope: {
              member: '='
          },
          restrict: 'AEC',
          //template: '<div class="well text-center bc-style"><img ng-src="{{ member.avatar }}" alt=""><h4>{{ member.name }}</h4><h6>{{ member.position }}</h6></div>'
          //templateUrl: 'member-simple-bc.html'
          templateUrl: function (elem, attr) {

              attr.type = attr.type||'simple';

              return 'app/users/member-'+attr.type+'-bc.html';

          }
      };
    });


})();