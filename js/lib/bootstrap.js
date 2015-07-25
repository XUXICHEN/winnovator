var app = angular.module('Sprot', ['ngSanitize', 'ngRoute'], function($routeProvider){
		$routeProvider.when('/', {
			templateUrl : '/js/modules/main/index.html'
		}).when('/care', {
			templateUrl : '/js/modules/care/index.html',
			controller : 'CareCtrl'
		}).when('/hosp', {
			templateUrl : '/js/modules/hosp/index.html',
			controller : 'HospCtrl'
		}).when('/cont', {
			templateUrl : '/js/modules/cont/index.html',
			controller : 'ContCtrl'
		}).when('/reve', {
			templateUrl : '/js/modules/reve/index.html',
			controller : 'ReveCtrl'
		}).otherwise({
			redirectTo : '/'
		});
	}),
	JSON_CALL = function(){};

app.run(function($rootScope) {
     $rootScope.startTimestamp = moment().format('YYYY-M-DD H:m:s');
   })
	.constant('INFO', {
	   	'TEAM'    : 'Winnovatiors',
	   	'VERSION' : '1.0.0'
   })
   .constant('SETTINGS', {
	   	title : 'Sprot'
   })
   .service('router', function($scope){
   		this.change = function(url){
   			
   		};
   });

app.controller('MainCtrl', 
	function($rootScope, $scope, $http, $interval, SETTINGS, INFO){//MainCtr body

		console.info('App started @ ' + $rootScope.startTimestamp);
		console.info('App Info: ', INFO);

		$scope.SETTINGS = SETTINGS;

	}//eo MainCtrl body
);//eo MainCtrl