package webpro2016.project.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;

public class Rating implements Serializable {
	

	/**
	 * 
	 */
	private static final long serialVersionUID = 3989325213357999085L;
	private Collection<Person> positive;
	private Collection<Person> negative;
	

	public Rating() {
		super();
		positive = new ArrayList<Person>();
		negative = new ArrayList<Person>();
	}
	
	
	public Rating(ArrayList<Person> positive, ArrayList<Person> negative) {
		super();
		this.positive = positive;
		this.negative = negative;
	}
	

	public Collection<Person> getPositive() {
		return positive;
	}


	public void setPositive(Collection<Person> positive) {
		this.positive = positive;
	}


	public Collection<Person> getNegative() {
		return negative;
	}


	public void setNegative(Collection<Person> negative) {
		this.negative = negative;
	}


	public boolean addPositive(Person p) {
		if (isAlreadyInList(p)) {
			return false;
		}
		positive.add(p);
		return true;
	}
	
	public boolean addNegative(Person p) {
		if (isAlreadyInList(p)) {
			return false;
		}
		negative.add(p);
		return true;
	}
	
	
	private boolean isAlreadyInList(Person p) {
		return positive.contains(p) || negative.contains(p);
	}
	

}
