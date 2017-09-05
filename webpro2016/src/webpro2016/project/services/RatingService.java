package webpro2016.project.services;

import java.util.Date;

import javax.ws.rs.Consumes;
import javax.ws.rs.CookieParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Cookie;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.NewCookie;
import javax.ws.rs.core.Response;

import webpro2016.project.dao.CommentDao;
import webpro2016.project.dao.PersonDao;
import webpro2016.project.dao.SessionDao;
import webpro2016.project.model.Comment;
import webpro2016.project.model.Person;
import webpro2016.project.model.Rating;

@Path("/ratings")
public class RatingService {

	private CommentDao commentDao = CommentDao.getInstance();
	private SessionDao sDao = SessionDao.getInstance();
	private PersonDao uDao = PersonDao.getInstance();
	
	@POST
	@Path("/positive/{commentId}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addPositiveRating(@CookieParam("ssid") Cookie cookie, @PathParam("commentId") String commentId
			){
		Person u = null;
		if (cookie != null) {
	    	String loggedIn = sDao.getUsernameBySessionId(cookie.getValue());
	    	if (loggedIn == null) {
	    		NewCookie newCookie = new NewCookie("ssid", "deleted", "/", null, 0, null, 0, new Date(0), false, false);
	    		return Response.status(Response.Status.UNAUTHORIZED).cookie(newCookie).build();
	    	}
	    	u = uDao.getUser(loggedIn);
	    	if ( u == null ){
	    		NewCookie newCookie = new NewCookie("ssid", "deleted", "/", null, 0, null, 0, new Date(0), false, false);
	    		return Response.status(Response.Status.UNAUTHORIZED).cookie(newCookie).build();
	    	}
	    }else{
	    	return Response.status(Response.Status.UNAUTHORIZED).build();
	    }
		

		Comment comment = commentDao.getComment(commentId);
		Rating rating = comment.getRating();
		boolean success = rating.addPositive(u);
		comment.setRating(rating);
		System.out.println(success);
		if (success) {
			success = commentDao.updateComment(comment);
			if (success) {
				return Response.ok(comment).build();
			} else {
				return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
			}
		} else {
			return Response.status(Response.Status.BAD_REQUEST).build();
		}	
	}

	@POST
	@Path("/negative/{commentId}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addNegativeRating(@CookieParam("ssid") Cookie cookie, @PathParam("commentId") String commentId
			){
		Person u = null;
		if (cookie != null) {
	    	String loggedIn = sDao.getUsernameBySessionId(cookie.getValue());
	    	if (loggedIn == null) {
	    		NewCookie newCookie = new NewCookie("ssid", "deleted", "/", null, 0, null, 0, new Date(0), false, false);
	    		return Response.status(Response.Status.UNAUTHORIZED).cookie(newCookie).build();
	    	}
	    	
	    	u = uDao.getUser(loggedIn);
	    	if ( u == null ){
	    		NewCookie newCookie = new NewCookie("ssid", "deleted", "/", null, 0, null, 0, new Date(0), false, false);
	    		return Response.status(Response.Status.UNAUTHORIZED).cookie(newCookie).build();
	    	}
	    }else{
	    	return Response.status(Response.Status.UNAUTHORIZED).build();
	    }

		
		Comment comment = commentDao.getComment(commentId);
		Rating rating = comment.getRating();
		boolean success = rating.addNegative(u);
		comment.setRating(rating);
		if (success) {
			success = commentDao.updateComment(comment);
			if (success) {
				return Response.ok(comment).build();
			} else {
				return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
			}

		} else {
			return Response.status(Response.Status.BAD_REQUEST).build();
		}	
	}
}
