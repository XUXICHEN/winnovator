app.controller('VocaCtrl', function($rootScope, $scope,$http, $interval, SETTINGS, INFO){
	console.info('VocaCtrl started @ ' + $rootScope.startTimestamp);

    jQuery('#datetimepicker1').datetimepicker();

    $scope.custom = true;
    $scope.toggleCustom = function() {
        $scope.custom = $scope.custom === false ? true: false;
    };

});