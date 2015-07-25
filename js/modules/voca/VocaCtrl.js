app.controller('VocaCtrl', function($rootScope, $scope,$http, $interval, SETTINGS, INFO){
	console.info('VocaCtrl started @ ' + $rootScope.startTimestamp);


    $scope.custom = true;
    $scope.toggleCustom = function() {
        $scope.custom = $scope.custom === false ? true: false;
    };


});