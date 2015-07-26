var initmap = function(){

	console.info('Init Map');

	var markers = [];
	var map = new google.maps.Map(document.getElementById('map-canvas'), {
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	var defaultBounds = new google.maps.LatLngBounds(
	  new google.maps.LatLng(-33.8902, 151.1759),
	  new google.maps.LatLng(-33.8474, 151.2631));
	map.fitBounds(defaultBounds);

	// Create the search box and link it to the UI element.
	var input = /** @type {HTMLInputElement} */(
	  document.getElementById('pac-input'));
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

	var searchBox = new google.maps.places.SearchBox(
	/** @type {HTMLInputElement} */(input));

	// [START region_getplaces]
	// Listen for the event fired when the user selects an item from the
	// pick list. Retrieve the matching places for that item.
	google.maps.event.addListener(searchBox, 'places_changed', function() {
	var places = searchBox.getPlaces();

	console.info(places);

	if (places.length == 0) {
	  return;
	}
	for (var i = 0, marker; marker = markers[i]; i++) {
	  marker.setMap(null);
	}

	// For each place, get the icon, place name, and location.
	markers = [];
	var bounds = new google.maps.LatLngBounds();
	for (var i = 0, place; place = places[i]; i++) {
	  var image = {
	    url: place.icon,
	    size: new google.maps.Size(71, 71),
	    origin: new google.maps.Point(0, 0),
	    anchor: new google.maps.Point(17, 34),
	    scaledSize: new google.maps.Size(25, 25)
	  };

	  // Create a marker for each place.
	  var marker = new google.maps.Marker({
	    map: map,
	    icon: image,
	    title: place.name,
	    position: place.geometry.location
	  });

	  markers.push(marker);

	  bounds.extend(place.geometry.location);
	}

	map.fitBounds(bounds);
	});
	// [END region_getplaces]

	// Bias the SearchBox results towards places that are within the bounds of the
	// current map's viewport.
	google.maps.event.addListener(map, 'bounds_changed', function() {
	var bounds = map.getBounds();
	searchBox.setBounds(bounds);
	});
};

app.controller('CareCtrl', function($rootScope, $scope, $http, $interval, SETTINGS, INFO){
	console.info('CareCtrl started @ ' + $rootScope.startTimestamp);

	var mocks = {
		friends : [
			{ name : 'Chan Ying Feng', distance: 5.0, location:'80 Boat Quay', icon:'/img/avatar/YF.jpg', desc:'Daughter' },
			{ name : 'Joyce Chang',    distance: 5.0, location:'40 Hong Kong Street', icon:'/img/avatar/Joy.jpg', desc:'' },
			{ name : 'Chua Aik Boon',  distance: 5.0, location:'36 North Canal Road', icon:'/img/avatar/boss.jpg', desc:'Son' },
			{ name : 'Aitch Chung',    distance: 5.0, location:'383 Jalan Besar', icon:'/img/avatar/aitch.jpg', desc:'' },
			{ name : 'Andy Vu',        distance: 5.0, location:'115 King George’s Avenue', icon:'/img/avatar/Andy.jpg', desc:'' },
			{ name : 'Coco Tsai',      distance: 5.0, location:'3 Seng Poh Road', icon:'/img/avatar/coco.jpg', desc:'' },
			{ name : 'Melissa Tian',   distance: 5.0, location:'6 Kim Tian Road ', icon:'/img/avatar/Mel.jpg', desc:'' },
			{ name : 'Tang Xin Yi',    distance: 5.0, location:'36 Keong Saik Road', icon:'/img/avatar/XY.jpg', desc:'' },
			{ name : 'Ashley Ng',      distance: 5.0, location:'28 Maxwell Road', icon:'/img/avatar/Ash.jpg', desc:'' }
		],
		hospitals : [
			{ name : 'AgeWell Artsz', 							distance: 5.0, location:'', icon:'/img/hospitals/image1.jpg', desc:'' },
			{ name : 'Assist Care', 							distance: 5.0, location:'', icon:'/img/hospitals/image2.jpg', desc:'' },
			{ name : 'Handicaps Welfare Association (Whampoa)', distance: 5.0, location:'', icon:'/img/hospitals/image3.jpg', desc:'' },
			{ name : 'Lotus Eldercare Pte Ltd', 				distance: 5.0, location:'', icon:'/img/hospitals/image4.jpg', desc:'private' },
			{ name : 'MW Medical Pte Ltd', 						distance: 5.0, location:'', icon:'/img/hospitals/image5.jpg', desc:'' },
			{ name : 'OmniMed Healthcare Holdings', 			distance: 5.0, location:'', icon:'/img/hospitals/image6.jpg', desc:'' },
			{ name : 'Preciouz Kare Pte Ltd', 					distance: 5.0, location:'', icon:'/img/hospitals/image7.jpg', desc:'private' },
			{ name : 'St Andrew\'s Community Hospital', 		distance: 5.0, location:'', icon:'/img/hospitals/image8.jpg', desc:'' },
			{ name : 'Yong-En Care Centre', 					distance: 5.0, location:'', icon:'/img/hospitals/image9.jpg', desc:'' },
			{ name : 'General Hospital', 					    distance: 5.0, location:'', icon:'/img/hospitals/image9.jpg', desc:'private' },
		],
		parks : [
			{ name : 'Dhoby Ghaut Green', 		distance: 5.0, location:'', icon:'/img/parks/park1.jpg', desc:'' },
			{ name : 'Gardens by the Bay', 		distance: 5.0, location:'', icon:'/img/parks/park2.jpg', desc:'' },
			{ name : 'Pearl\'s Hill City Park', distance: 5.0, location:'', icon:'/img/parks/park3.jpg', desc:'' },
			{ name : 'Tiong Bahru Park', 		distance: 5.0, location:'', icon:'/img/parks/park4.jpg', desc:'' },
			{ name : 'Clementi Woods Park ', 	distance: 5.0, location:'', icon:'/img/parks/park5.jpg', desc:'' },
			{ name : 'Jurong Central Park ', 	distance: 5.0, location:'', icon:'/img/parks/park6.jpg', desc:'' },
			{ name : 'Jurong Central Park ', 	distance: 5.0, location:'', icon:'/img/parks/park7.jpg', desc:'' },
			{ name : 'Toa Payoh Town Park', 	distance: 5.0, location:'', icon:'/img/parks/park8.jpg', desc:'' },
			{ name : 'Woodlands Town Garden', 	distance: 5.0, location:'', icon:'/img/parks/park9.jpg', desc:'' },
			{ name : 'Pasir Ris Park', 			distance: 5.0, location:'', icon:'/img/parks/park10.jpg', desc:'' }
		],
		facilities : [
			{ name : 'National Heart Centre', 				 distance: 5.0, location:'', icon:'/img/facilities/images-1.jpg', desc:'' },
			{ name : 'National Neuroscience Institute', 	 distance: 5.0, location:'', icon:'/img/facilities/images-2.jpg', desc:'' },
			{ name : 'Singapore National Eye Centre', 		 distance: 5.0, location:'', icon:'/img/facilities/images-3.jpg', desc:'' },
			{ name : 'Raffles Hospital', 					 distance: 5.0, location:'', icon:'/img/facilities/images-4.jpg', desc:'' },
			{ name : 'Ren Ci Hospital and Medicare Centre',  distance: 5.0, location:'', icon:'/img/facilities/images-5.jpg', desc:'' },
			{ name : 'National University Hospital', 		 distance: 5.0, location:'', icon:'/img/facilities/images-6.jpg', desc:'' },
			{ name : 'Tan Tock Seng Hospital', 				 distance: 5.0, location:'', icon:'/img/facilities/images-7.jpg', desc:'' },
			{ name : 'KK Women\'s and Children\'s Hospital', distance: 5.0, location:'', icon:'/img/facilities/images-8.jpg', desc:'' },
			{ name : 'Saint Jose\'s Community Hospital', 	 distance: 5.0, location:'', icon:'/img/facilities/images-9.jpg', desc:'' },
			{ name : 'Saint Andrew\'s Community Hospital', 	 distance: 5.0, location:'', icon:'/img/facilities/images-10.jpg', desc:'' }
		]
	};

	$scope.show_template = '';
	$scope.show_sub = 'hidden';
	$scope.show_main = '';
	$scope.view_cmd = '';
	$scope.main = false;

	$scope.show = function(cmd){
		console.info(cmd);
		$scope.show_main = 'hidden';		
		$scope.show_sub = '';
		$scope.view_cmd = cmd;
		$scope.show_template = '/js/modules/care/' + cmd + '.html';		
		$scope.model = [];
	};

	$scope.onviewload = function(cmd){
		console.info('view loaded...', cmd);

		if(typeof mocks[cmd] === 'undefined'){
			return;
		}

		jQuery.each(mocks[cmd], function(idx, value){
			value.distance = Math.round10( ( Math.random() * 10 ) + value.distance, -1 );
		});

		mocks[cmd].sort(function(a, b){
			if(a.distance > b.distance){
				return 1;
			}

			if(a.distance > b.distance){
				return -1;
			}

			return 0;
		});

		$scope.model = mocks[cmd];
	};

});