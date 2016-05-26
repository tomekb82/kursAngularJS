(function(){

    var app = angular.module('exampleFilters', []);

    app.filter('maskEmail', function(){
        return function (input, length) {

            input = input||'';
            length = length||3;

            var parts = input.split('@');
            var masked = parts[0].substr(0, length);
            var maskLength = parts[0].length - length;

            for (var i = 0; i<maskLength; i++) {
                masked += '*';
            };

            parts[0] = masked;

            return parts.join('@');
        };
    });

})();