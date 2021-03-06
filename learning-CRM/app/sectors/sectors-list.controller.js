(function(){

    angular.module('crmApp')
    .controller('SectorsListCtrl', ['$scope', 'sectorsService', 
    	function($scope, sectorsService){
        
            $scope.items = [];
            $scope.listHeading = 'Lista branż';
            
            $scope.filterBy = {};
            $scope.orderByColumn = 'id';
            $scope.orderByDir = false;

            sectorsService.getSectors(function(sectors){
            	$scope.items = sectors;
            });

            $scope.changeOrder = function(columnName){
                if($scope.orderByColumn == columnName){
                    $scope.orderByDir = !$scope.orderByDir;
                }else{
                    $scope.orderByColumn = columnName;
                    $scope.orderByDir = false;
                }
            }

            $scope.isOrderedReverse = function(){
                return !$scope.orderByDir; 
            }

            $scope.isOrderedBy = function(columnName){
                return $scope.orderByColumn == columnName;
            }

    }]);



})();