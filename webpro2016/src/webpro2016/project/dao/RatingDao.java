package webpro2016.project.dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.OutputStreamWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.StringTokenizer;

import webpro2016.project.model.Comment;
import webpro2016.project.model.Rating;

public class RatingDao {
	
	private HashMap<String, Rating> allRatings = new HashMap<String, Rating>();
	private static RatingDao instance = new RatingDao();
	
	//ratings are saved in "./Data/ratings.ser", we can edit that file
	private RatingDao() {
		BufferedReader in = null;
		try {
			File theDir = new File("./Data");

			if (!theDir.exists()) {
				 theDir.mkdir();
			}
			
			readRatingsFromFile(in);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (in != null) {
				try {
					in.close();
				} catch (Exception e) {
				}
			}
		}
	}
	
	public static RatingDao getInstance(){
		return instance;
	}
	
	//readRatingsFromFile
	private void readRatingsFromFile(BufferedReader in) {
		try (ObjectInputStream ois
			= new ObjectInputStream(new FileInputStream("./Data/ratings.ser"))) {

			allRatings = (HashMap<String, Rating>) ois.readObject();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	//saving ratings
	private boolean saveRatingsToFile(){
		try (ObjectOutputStream oos =
				new ObjectOutputStream(new FileOutputStream("./Data/ratings.ser"))) {
			oos.writeObject(allRatings);
			return true;
		} catch (Exception ex) {
			ex.printStackTrace();
			return false;
		}
	}

	public synchronized boolean addRating(Rating r){
//		allRatings.put(r, r);			
		if(saveRatingsToFile()){
			return true;
		}else{
			return false;
		}
		
	}

	public synchronized Rating getCommentRating(String commentId){;
		return allRatings.get(commentId);
	}
	 
}
