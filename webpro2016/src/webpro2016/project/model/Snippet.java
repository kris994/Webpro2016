package webpro2016.project.model;

import java.util.Date;
import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonFormat;

public class Snippet implements Serializable {


	/**
	 * 
	 */
	private static final long serialVersionUID = 7199787560962007664L;
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="YYYY-MM-dd HH:mm", timezone="GMT")
	private String id;
	private String description;
	private String code;
	private Language language;
	private Person user;
	private String repository;
	private Date createdAt;
	private int lasts;
	private boolean commentsEnabled;
	
	
	public Snippet() {
		super();
		this.createdAt = new Date();
		this.lasts = 100000; // 100 seconds to delete
		this.commentsEnabled = true;
	}
	
	public Snippet(String id, String description, String code, Language language, String repository, Person person, Date createdAt, boolean commentsEnabled) {
		super();
		this.id = id;
		this.description = description;
		this.code = code;
		this.language = language;
		this.user = person;
		this.repository = repository;
		
		
		this.lasts = 100000; // 100 seconds to delete
		this.createdAt = createdAt;
		this.commentsEnabled = commentsEnabled;
	}

	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public Language getLanguage() {
		return language;
	}

	public void setLanguage(Language language) {
		this.language = language;
	}

	public Person getUser() {
		return user;
	}

	public void setUser(Person user) {
		this.user = user;
	}
	
	public String getRepository() {
		return repository;
	}

	public void setRepository(String repository) {
		this.repository = repository;
	}

	public int getLasts() {
		return lasts;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public boolean isCommentsEnabled() {
		return commentsEnabled;
	}

	public void setCommentsEnabled(boolean commentsEnabled) {
		this.commentsEnabled = commentsEnabled;
	}
	
	
}
