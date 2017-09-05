var logInURL = "../Webpro2016.Project/rest/session/logIn";

//login
$(function(){
	if( $.cookie('ssid') != null ) { 
		$.ajax({
 			type : 'GET',
 			url : logInURL,
 			dataType : "text", 
 			success : function(data) {
				console.log(data);
 			},
 			error : function(XMLHttpRequest, textStatus, errorThrown) {
 				console.log("AJAX ERROR: " + errorThrown);
 			}
 		});
	}
	  
    $( "#username" ).focus(function() {
    	  $('#errorMessage').remove();
    	});
    
    $( 'input[name=password]' ).focus(function() {
    	  $('#errorMessage').remove();
    	});
});


//login check after submit
$(document).on('submit', '#logInForm', function(e) {
	e.preventDefault();
	console.log("log in attempt");

	var data =$('#logInForm').serializeJSON();	
	$.ajax({
		type : 'POST',
		url : logInURL,
		contentType : 'application/json',
		data : data,
		success : function(data) {
			console.log(data);
			window.location.replace("../Webpro2016.Project/userHomePage.html");
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("AJAX ERROR: " + errorThrown);
			$('#checkBoxP').after("<p id='errorMessage' style='color:red; font-weight: bold; margin-bottom:10px;'>Invalid username or password!</p>")
		}
	});

});