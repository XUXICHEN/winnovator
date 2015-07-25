var app = angular.module('Sprot', ['ngSanitize', 'ngRoute', 'pascalprecht.translate'], function($routeProvider){
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
   .service('t', function(){
   		this._ = function(text){
   			
   		};
   });

app.config(['$translateProvider', function ($translateProvider) {
	$translateProvider.translations('en', {
		TITLE          : 'Sprot',
		MENU_LIFE_CARE : 'Life Care',
		MENU_VOCAL_MSG : 'Vocal Message',
		MENU_CONTACTS  : 'Contacts',
		MENU_REVEAL    : 'Reveal'
	});
	$translateProvider.preferredLanguage('en');
}]);

app.controller('MainCtrl', 
	function($rootScope, $scope, $http, $interval, SETTINGS, INFO){//MainCtr body

		console.info('App started @ ' + $rootScope.startTimestamp);
		console.info('App Info: ', INFO);

		$scope.SETTINGS = SETTINGS;

	}//eo MainCtrl body
);//eo MainCtrl