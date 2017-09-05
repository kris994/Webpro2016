
var comments;
var allComments;
var snippet;
var logOutURL = "../Webpro2016.Project/rest/session/logOut";
var me;


//creating comments
function createComment(){
	snippet = JSON.parse(localStorage.getItem('snippetView')|| '{}');
	var formData = new FormData();
	formData.append('text', $('#text').val());
	var url = "rest/comments/" + snippet.id;
	$.ajax({
		url: url,
		type: 'POST',
		data: formData,
		headers: {
			Accept: "application/json"
		},
		async: false,
		cache: false,
		contentType: false,
		processData: false,    
		success: function (returndata) {
			$('#commentNumContainer').empty();
			comments = comments + 1;
			$('#commentNumContainer').append(
				'<h1>' + comments + ' comments</h1'
			);
			showCommentOnPage(0, returndata);
			$('#text').val("");
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("AJAX ERROR: " + errorThrown);
			swal("Error", "There was an error while trying to reach server.", "error");
		}
	});
}	

//logout in Menu
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

//enabling and disabling comments with button as admin, create coment, snippet description...
$(function(){	
	me = localStorage.getItem('myself');
	snippet = JSON.parse(localStorage.getItem('snippetView')|| '{}');
	if (me) {
		me = JSON.parse(me);
		if (me.role==='admin') {
			if (snippet.commentsEnabled) {
				$("#actions").append('<button class="disComButton" onclick="disableComments()">Disable comments</button>');
			} else {
				$("#actions").append('<button class="disComButton" onclick="enableComments()">Enable comments</button>');
			}
		}
	}

    snippet = JSON.parse(localStorage.getItem('snippetView')|| '{}');
    $('#snippetContainer').append(
		'<div class="oneEventDivSC">'+
			'<section class="dataPart1">'+	
				'<p class="nameP"><b>Description: </b>' +  snippet.description + '</a></p>'+
			'</section>'+
			'<section class="dataPart2">'+
				'<p><b>Code: </b>' +  snippet.code + '</p>'+			
				'<p><b>Programming language: </b>' +  snippet.language.name + '</p>'+
				'<p><b>Repository: </b>' +  snippet.repository + '</p>'+
				'<p><b>Creator: </b>' +  
				(snippet.user && snippet.user.username || 'Anonymous') + '</p>'+
			'</section>'+	
		'</div>'
		);
    
	if (snippet.commentsEnabled) {
		loadComments();
		$("#commentBox").append(
			'<div class="oneEventDivCB">'+
				'<textarea id="text" placeholder="Type a comment"></textarea>' +
				'<button id="createComment" >Post</button>'
				)

				$("#createComment").click(createComment.bind(this))
			} else {
				$('#commentNumContainer').append('<h1>Commenting disabled</h1>');
			}+
	'</div>'
    $("#sortbutton").click(onSort.bind(this));
});


//diableComments
function disableComments() {
	$.ajax({
 			type : 'PUT',
 			url : 'rest/snippets/block/'+snippet.id,
 			dataType : "text",
			headers: {
				Accept: "application/json"
			},
			async: false,
			cache: false,
			contentType: false,
			processData: false,    
 			success : function(data) {
				 snippet.commentsEnabled = false;
				 localStorage.setItem('snippetView', JSON.stringify(snippet));
				 if (me.role==='admin') {
					$("#actions").empty();
					$("#actions").append('<button class="disComButton" onclick="enableComments()">Enable comments</button>');
				}
				$('#commentNumContainer').empty();
				$('#commentsContainer').empty(); 
				$('#commentNumContainer').append('<h1>Commenting disabled</h1>');
				$("#commentBox").empty();
            },
			error: function(error) {
				swal("Error", "There was an error while trying to reach server.", "error");
			}
 		});
}

//enableComments
function enableComments() {
	$.ajax({
 			type : 'PUT',
 			url : 'rest/snippets/unblock/'+snippet.id,
 			dataType : "text",
			headers: {
				Accept: "application/json"
			},
			async: false,
			cache: false,
			contentType: false,
			processData: false,    
 			success : function(data) {
				if (me.role==='admin') {
					$("#actions").empty();
					$("#actions").append('<button class="disComButton" onclick="disableComments()">Disable comments</button>');
				}
				snippet.commentsEnabled = true;
				localStorage.setItem('snippetView', JSON.stringify(snippet));
				loadComments();
				$("#commentBox").append(
				'<div class="oneEventDivCB">'+
				'<textarea id="text" placeholder="Type a comment"></textarea>' +
				'<button id="createComment" >Post</button>'
				+ '</div>'
				)
				$("#createComment").click(createComment.bind(this))
            },
			error: function(error) {
				swal("Error", "There was an error while trying to reach server.", "error");
			}
 		});
}

//loadComments
function loadComments() {
	$.ajax({
 			type : 'GET',
 			url : 'rest/comments/'+snippet.id,
 			dataType : "text",
			headers: {
				Accept: "application/json"
			},
			async: false,
			cache: false,
			contentType: false,
			processData: false,    
 			success : function(data) {
				$('#commentNumContainer').empty();
				$('#commentsContainer').empty();
                data = JSON.parse(data);
				comments = data.length;
                if (data.length === 0) {
                    $('#commentNumContainer').append('<h1>No comments</h1>');
                    return;
			    }
                $('#commentNumContainer').append(
                    '<h1>' + data.length + ' comments</h1'
                );
				allComments = sortComments(data, 'date');
                $.each(allComments, function(index, element) {
                    showCommentOnPage(index, element);
                });
            },
			error: function(error) {
				swal("Error", "There was an error while trying to reach server.", "error");
			}
 		});
}

//deleteComments
function deleteComment(element) {
	var url = "rest/comments/" + element.id;
	
	$.ajax({ 
	    type: 'DELETE', 
	    url: url, 
	    dataType: 'json',
		headers: {
			Accept: "application/json"
		},
	    async: false,
	    cache: false,
	    contentType: false,
	    processData: false,    
	    success: function (data) { 
			$('#commentNumContainer').empty();
			comments = comments - 1;
			$('#commentNumContainer').append(
				'<h1>' + comments + ' comments</h1'
			);
			$('#comment'+data.id).remove();
			
	    },
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			if(XMLHttpRequest.status == 401){
				localStorage.removeItem('myself')
				window.location.replace("../Webpro2016.Project/logIn.html");
				return;
			}
			swal("Error", "There was an error while trying to reach server.", "error");
		}
	});	
}

//ratePositive the comment
function ratePositive(element) {
	var url = "rest/ratings/positive/" + element.id;
	
	$.ajax({ 
	    type: 'POST', 
	    url: url, 
	    dataType: 'json',
		headers: {
			Accept: "application/json"
		},
	    async: false,
	    cache: false,
	    contentType: false,
	    processData: false,    
	    success: function (data) {
			loadComments(); 
	    },
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			if(XMLHttpRequest.status == 401){
				localStorage.removeItem('myself')
				window.location.replace("../Webpro2016.Project/logIn.html");
				return;
			}
			swal("Error", "There was an error while trying to reach server.", "error");
		}
	});	
}

//rateNegative the comment
function rateNegative(element) {
	var url = "rest/ratings/negative/" + element.id;
	
	$.ajax({ 
	    type: 'POST', 
	    url: url, 
	    dataType: 'json',
		headers: {
			Accept: "application/json"
		},
	    async: false,
	    cache: false,
	    contentType: false,
	    processData: false,    
	    success: function (data) { 
			loadComments();
	    },
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			if(XMLHttpRequest.status == 401){
				localStorage.removeItem('myself')
				window.location.replace("../Webpro2016.Project/logIn.html");
				return;
			}
			swal("Error", "There was an error while trying to reach server.", "error");
		}
	});	
}

//show Comments
function showCommentOnPage(index, element){
	let isRated;
	if (me) {
		isRated = _.find(element.rating.positive, function(o) { 
			return o.username === me.username
		});
		if (!isRated) {
			isRated = _.find(element.rating.negative, function(o) { 
				return o.username === me.username
			});
		}
	}
	$('#commentsContainer').append(
		'<div class="oneEventDivCC" id="comment'+ element.id +'">'+
		'<img src="rest/users/image-by-username/' + (element.user && element.user.username)  + '/thumbnail"/>' +
			'<p>' + ((element.user && element.user.username) || "Anonymous")  + ', '+
			'<small>' + moment(element.createdAt).fromNow() + '</small>'+ '</p>'+
			'<p>' + 'Comment: ' + element.text + '</p>'+	
			'<div class="ratings">' +
				'<p><bold>Positive</bold>: ' + element.rating.positive.length + '</p>' +
				(
					me && !isRated ?
						'<button id="ratepos'+ element.id + '">rate positive</button>'
						:
						''
				) +
				'<p><bold>Negative</bold>: ' + element.rating.negative.length + '</p>' +
				(
					me && !isRated ?
						'<button id="rateneg'+ element.id + '">rate negative</button>'
						:
						''
				)+
			'</div>' + 
			(
				me && me.role==='admin' || (element.user && me && element.user.username === me.username) ?
				'<section>' +
					'<button id="' + element.id + '" class="delCommentButton">Delete</button>' +
				'</section>'
					:
					''
			)
			+
		'</div>'
		);
	$('#ratepos'+element.id).click(ratePositive.bind(this,element))
	$('#rateneg'+element.id).click(rateNegative.bind(this,element))
	$('#'+element.id).click(deleteComment.bind(this,element))
}

//sort comments by rating or date
function sortComments(comments, type) {
	comments = _.sortBy(comments, function(comment) {
		if (type==='date') {
			return moment(comment.createdAt);
		} else {
			let overallRating = 0;
			overallRating += comment.rating.positive.length;
			overallRating -= comment.rating.negative.length;
			console.log(overallRating)
			return overallRating;
		}
	});
	if (type==='rate') {
		comments = _.reverse(comments);
	}
	return comments;
}

//sort based on checked box
function onSort() {
	let type='rate'
	if ($("#date").is(':checked')) {
		type='date';
	}
	allComments = sortComments(allComments, type);
	renderComments(allComments);
}

function renderComments(comments) {
	$('#commentsContainer').empty();
	$.each(comments, function(index, element) {
		showCommentOnPage(index, element);
	});
}