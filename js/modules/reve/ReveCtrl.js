app.controller('ReveCtrl', function($rootScope, $scope, $http, $interval, SETTINGS, INFO){
	console.info('ReveCtrl started @ ' + $rootScope.startTimestamp);

	var mocks = {
		voicerecord : [
			{ date : {'year': 2013, 'month': 3, 'date':1}, duration: 300, timer: true,  timertime:null },
			{ date : {'year': 2013, 'month': 3, 'date':1}, duration: 300, timer: true,  timertime:null },
			{ date : {'year': 2013, 'month': 3, 'date':1}, duration: 300, timer: false, timertime:null },
			{ date : {'year': 2013, 'month': 3, 'date':1}, duration: 300, timer: true,  timertime:null },
			{ date : {'year': 2013, 'month': 3, 'date':1}, duration: 300, timer: false, timertime:null }
		]
	};

	$scope.show_template = '';
	$scope.show_sub = 'hidden';
	$scope.show_main = '';
	$scope.view_cmd = '';

	$scope.show = function(cmd){
		console.info(cmd);
		$scope.show_main = 'hidden';		
		$scope.show_sub = '';
		$scope.view_cmd = cmd;
		$scope.show_template = '/js/modules/reve/' + cmd + '.html';		
		$scope.model = [];
	};

	$scope.onviewload = function(cmd){
		console.info('view loaded...', cmd);

		if(typeof mocks[cmd] === 'undefined'){
			return;
		}

		jQuery.each(mocks[cmd], function(idx, value){
			var duration = Math.ceil( (Math.random() * 200) ),
				timeobj  = moment().add(duration, 'days');
			value.timertime = value.timer ? timeobj.add(3, 'days').format('YYYY/MMM/DD h:mm') : null;	
			value.date = timeobj.format('YYYY/MMM/DD');
		});

		console.info(mocks);

		mocks[cmd].sort(function(a, b){
			if(a.date > b.date){
				return -1;
			}

			if(a.date > b.date){
				return 1;
			}

			return 0;
		});

		$scope.model = mocks[cmd];
	};

	$scope.remove_item = function(cmd, idx){
		mocks[cmd].splice(idx, 1);	
	}
});