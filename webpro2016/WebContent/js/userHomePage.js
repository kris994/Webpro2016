var map = null;
var markersData = [];
var newRatingVal = 0;
var ratedPlaceId = 0;
var myLocation = {};
var logOutURL = "../Webpro2016.Project/rest/session/logOut";


$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("active");
});

//LogOut Button in Menu
$(function(){
 	$('#logOut').click(function(){
		 localStorage.removeItem('myself');
 		$.ajax({
 			type : 'GET',
 			url : logOutURL,
 			dataType : "text", 
 			success : function(data) {
 				window.location.replace("../Webpro2016.Project/logIn.html");
 			}
 		});
 	});
});

//Load logged in user data
function loadSelfData(){
	
	var url = "rest/users/self-data";
	$.ajax({ 
	    type: 'GET', 
	    url: url, 
	    data: { get_param: 'value' }, 
	    dataType: 'json',
	    success: function (data) { 
			console.log(data);
				 me = data;
	       localStorage.setItem('myself', JSON.stringify(data));
	    },
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			if(XMLHttpRequest.status == 401){
				window.location.replace("../Webpro2016.Project/logIn.html");
			}
		}
	});	
}

//load logged in user data - adress
$(function(){
	let me = localStorage.getItem('myself');
	if (!me) {
		loadSelfData();
	}
	else {
		me = JSON.parse(me);
	}
	myLocation = me.address ? JSON.parse(me.address) : {};
	console.log(myLocation);
});

//get the adress from the logged in user and show it on google maps
function initMap() {
	
	map = new google.maps.Map($('#map').get(0), {
	    center: myLocation.geometry ? myLocation.geometry.location : {lat: 45.251249, lng: 19.83839},
	    zoom: 14,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	  });	

		if (myLocation.geometry) {
			var marker = new google.maps.Marker({
					position: myLocation.geometry.location,
					label: 'YOU',
					map: map,
					title: "You're here!"
				});
		}
}
