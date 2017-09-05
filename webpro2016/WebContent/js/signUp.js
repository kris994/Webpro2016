var autocomplete;

//submit form when making a new account
$("#msform").submit(function(event){
	  event.preventDefault();
	  
	  if(!validateThirdStep()){
			return false;
	  }
	 
	  var formData = new FormData($(this)[0]);
	  var url = "";
	  var redirectUrl = "";
	  url = "rest/users/signup/" + $('#username').val();
	  redirectUrl = "../Webpro2016.Project/userHomePage.html"
	  formData.delete('address');
      formData.append('address', JSON.stringify(autocomplete.getPlace()));  
	  $.ajax({
	    url: url,
	    type: 'POST',
	    data: formData,
	    async: false,
	    cache: false,
	    contentType: false,
	    processData: false,
	    success: function (returndata) {
	      window.location.replace(redirectUrl);
	    },
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("AJAX ERROR: " + errorThrown);
			swal("Error", "There was an error while trying to reach server.", "error");
		}
	  });
	 
	  return false;
});

//checking if the username is avaiable
$('#username').focusout(function(){
	var username = $('#username').val();
	if(username===""){
		markInvalidUsername("empty");
	}else{
		var checkUserAvailabilityURL = "../Webpro2016.Project/rest/users/signup/" +username;
		$.ajax({
			type : 'get',
			url : checkUserAvailabilityURL,
			dataType : "text",
			success : function(data) {
				if(data==="available"){
					markUsernameValid();
				}else if(data==="taken"){
					markInvalidUsername("taken");
				}
			},
		});
	}
});

//Username is unavaiable
function markInvalidUsername(reason){
	$("#username").css("border", "5px solid red");
	if(reason==="empty"){
		$("#username").after("<p id=\"usernameMessage\" style=\"color:red; margin-bottom: 10px;\">Username field can not be empty.<i class=\"fa fa-times\" style=\"color:red;\"></i></p>");
	}else if(reason==="taken"){
		$("#username").after("<p id=\"usernameMessage\" style=\"color:red; margin-bottom: 10px;\">This username is not available.<i class=\"fa fa-times\" style=\"color:red;\"></i></p>");
	}
}

//Useraname is valid
function markUsernameValid(){
	$("#username").css("border", "5px solid green");
	$("#username").after("<p id=\"usernameMessage\" style=\"color:green; margin-bottom: 10px;\" >This username is available. <i class=\"fa fa-check\" style=\"color:green;\"></i></p>");
}

$('#username').focusin(function(){
	$("#usernameMessage").remove();
	$("#username").css("border", "1px solid #ccc");
});

//confirm password
$('#cpass').focusout(function(){
	var cpass = $('#cpass').val();
	if(cpass===""){
		markInvalidCpass("empty");
	}else{
		var password = $('#password').val();
		if(password!=cpass){
			markInvalidCpass("different");
		}else{
			markCpassValid();
		}
	}
});

//passwords do not match
function markInvalidCpass(reason){
	$("#cpass").css("border", "5px solid red");
	if(reason==="empty"){
		$("#cpass").after("<p id=\"cpassMessage\" style=\"color:red; margin-bottom: 10px;\">Password must be confirmed.<i class=\"fa fa-times\" style=\"color:red;\"></i></p>");
	}else if(reason==="different"){
		$("#cpass").after("<p id=\"cpassMessage\" style=\"color:red; margin-bottom: 10px;\">Passwords do not match.<i class=\"fa fa-times\" style=\"color:red;\"></i></p>");
	}
}

//passwords match
function markCpassValid(){
	$("#cpass").css("border", "5px solid green");
	$("#cpass").after("<p id=\"cpassMessage\" style=\"color:green; margin-bottom: 10px;\" >Passwords match. <i class=\"fa fa-check\" style=\"color:green;\"></i></p>");
}

$('#cpass').focusin(function(){
	$("#cpassMessage").remove();
	$("#cpass").css("border", "1px solid #ccc");
});

// Validation
function validateInput(element){
	var fs = $(element).parent();
	var id = fs.attr('id');
	if(id==="fs1"){
		return validateFirstStep();
	}else if(id==="fs2"){
		return validateSecondStep();
	}
}

function validateFirstStep(){
	if($("#usernameMessage").css("color")!="rgb(0, 128, 0)"){
		swal("Error", "You must choose available username.", "error");
		return false;
	}
	if($("#password").val()==="" || $("#cpass").val()===""){
		swal("Error", "You must fill and confirm password.", "error");
		return false;
	}
	if($("#cpassMessage").css("color")!="rgb(0, 128, 0)"){
		swal("Error", "You must confirm password correctly.", "error");
		return false;
	}
	return true;
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateSecondStep(){
	if($("#firstName").val()===""){
		swal("Error", "You must fill first name.", "error");
		return false;
	}
	if($("#lastName").val()===""){
		swal("Error", "You must fill last name.", "error");
		return false;
	}
	if($("#email").val()===""){
		swal("Error", "You must fill email.", "error");
		return false;
	}
	if(!validateEmail($("#email").val())){
		swal("Error", "You must enter a valid email.", "error");
		return false;
	}
	return true;
}

function validateThirdStep(){
	var val =$('input[type=file]').val().toLowerCase();
	var regex = new RegExp("(.*?)\.(jpg|png|jpeg|bmp|ico)$");
	if(!(regex.test(val))) {
		$('input[type=file]').val('');
		swal("Error", "Please select image file.", "error");
		return false;
	} 
	return true;
}

function initAutocomplete() {
	autocomplete = new google.maps.places.Autocomplete(
		/** @type {!HTMLInputElement} */(document.getElementById('address')),
		{types: ['geocode']});
}