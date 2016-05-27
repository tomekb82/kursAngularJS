(function(){

    angular.module('crmApp')
    .controller('SectorsListCtrl', ['$scope', 'sectorsService', 
    	function($scope, sectorsService){
        
            $scope.sectors = [];
            
            $scope.filterBy = {};

            sectorsService.getSectors(function(sectors){
            	$scope.sectors = sectors;
            });

    }]);



})();