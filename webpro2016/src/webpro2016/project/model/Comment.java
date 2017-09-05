package webpro2016.project.model;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class Comment implements Serializable {
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -963291825708691010L;
	
	
		@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="YYYY-MM-dd HH:mm", timezone="GMT")
		private String id;		
		private Person user;
		private String text;
		private Snippet snippet;
		private Date createdAt;
		private Rating rating;
		
		
		public Comment() {
			super();
			rating = new Rating();
			createdAt = new Date();
		}

		public Comment(String id, String text, Person user, Date createdAt, Snippet snippet, Rating rating) {
			super();
			this.id = id;			
			this.user = user;
			this.text = text;
			this.snippet = snippet;
			this.createdAt = createdAt;			
			this.rating = rating;
		}
		
		
		
		public String getId() {
			return id;
		}

		public void setId(String id) {
			this.id = id;
		}

		public Person getUser() {
			return user;
		}
		
		public void setUser(Person user) {
			this.user = user;
		}
		
		public String getText() {
			return text;
		}
		
		public void setText(String text) {
			this.text = text;
		}

		public Snippet getSnippet() {
			return snippet;
		}

		public void setSnippet(Snippet snippet) {
			this.snippet = snippet;
		}
		
		public Date getCreatedAt() {
			return createdAt;
		}
		public void setCreatedAt(Date createdAt) {
			this.createdAt = createdAt;
		}

		public Rating getRating() {
			return rating;
		}

		public void setRating(Rating rating) {
			this.rating = rating;
		}
		
}
