var me;
var logOutURL = "../Webpro2016.Project/rest/session/logOut";




// LogOut
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
	 

	me = localStorage.getItem('myself');
	if (me) me = JSON.parse(me);
	loadUsers();
	
	$("#searchuserbutton").click(function() {
		loadUsers($("#searchuser").val());
	})
	
});

//ladUsers
function loadUsers(search) {
	
	var url = search ? 'rest/users/'+search : "rest/users";	
	$.ajax({ 
	    type: 'GET', 
	    url: url, 
	    data: { get_param: 'value' }, 
	    dataType: 'json',
	    success: function (data) { 
			$('#usersContainer').empty();
			if (data.length === 0) {
				$('#usersContainer').append('<h1>No Users</h1>');
				return;
			}
	        $.each(data, function(index, element) {
				showUserOnPage(index, element);
	        });
			
	    },
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(textStatus);
		}
	});	
}

function showUserOnPage(index, element) {
	if (me && element.username === me.username) return;
	if (me && me.role==='admin' || !element.blocked) {
		$('#usersContainer').append('<div class="userDiv">' +
			'<img class="thumbnail" src="rest/users/image-by-username/' + element.username  + '/thumbnail"></img>' +
			'<div class="name">' +
				'<p>' + element.firsName + ' ' + element.lastName + '</p>' +
				'<p>' + element.username + '</p>' +
			'</div>' + 
			( me && me.role==='admin' && element.role!=='admin' ?
				(element.blocked ?
					'<button id="unblockUser'+ element.username + '" class="userButton">Unblock User</button>'
					:
					'<button id="blockUser'+ element.username + '" class="userButton">Block User</button>'
				)
				: ''
			) + 
			'</div>');
	}	

	$("#blockUser"+element.username).click(blockUser.bind(this,element));	
	$("#unblockUser"+element.username).click(unblockUser.bind(this,element));		
}


//unblockUser
function unblockUser(user) {
		$.ajax({
			type : 'PUT',
			url : 'rest/users/unblock/'+user.username,
			dataType : "text",
			headers: {
				Accept: "application/json"
			},
			async: false,
			cache: false,
			contentType: false,
			processData: false,    
			success : function(data) {
				loadUsers();
          },
			error: function(error) {
				swal("Error", "There was an error while trying to reach server.", "error");
			}
		});
}

//block User
function blockUser(user) {
		$.ajax({
 			type : 'PUT',
 			url : 'rest/users/block/'+user.username,
 			dataType : "text",
			headers: {
				Accept: "application/json"
			},
			async: false,
			cache: false,
			contentType: false,
			processData: false,    
 			success : function(data) {
				loadUsers();
            },
			error: function(error) {
				swal("Error", "There was an error while trying to reach server.", "error");
			}
 		});
	console.log(user);
}


