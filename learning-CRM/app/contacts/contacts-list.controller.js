(function(){

    angular.module('crmApp')
    .controller('ContactsCtrl', ['$scope', function($scope){
        
        $scope.listHeading = 'Typy kontaktów';
        $scope.items = [
            {
                id: '1',
                name: 'phone'
            },
            {
                id: '2',
                name: 'envelope-o'
            },
            {
                id: '3',
                name: 'users'
            },
            {
                id: '4',
                name: 'file-text-o'
            }
        ];
            
        $scope.filterBy = {};
        $scope.orderByColumn = 'id';
        $scope.orderByDir = false;

    
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