package webpro2016.project.model;
import java.io.Serializable;

public class Language implements Serializable {


	/**
	 * 
	 */
	private static final long serialVersionUID = 7891605150269404228L;
	
	
	private String name;
	
	public Language() {
		super();
	}
	
	
	public Language(String name) {
		super();
		this.name = name;
	}
	
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
