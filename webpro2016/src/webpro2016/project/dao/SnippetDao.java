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
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.StringTokenizer;
import java.util.Timer;
import java.util.TimerTask;

import webpro2016.project.model.Person;
import webpro2016.project.model.Language;
import webpro2016.project.model.Snippet;

public class SnippetDao {
	private HashMap<String, Snippet> allSnippets = new HashMap<String, Snippet>();
	private static SnippetDao instance = new SnippetDao();

	private Timer timer;
	
	//snippets are saved in "./Data/snippets.ser", we can edit that file
	private SnippetDao() {
		timer = new Timer(true);
		BufferedReader in = null;
		try {
			File theDir = new File("./Data");

			if (!theDir.exists()) {
				 theDir.mkdir();
			}
			
			readSnippetsFromFile(in);
			
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
	
	public static SnippetDao getInstance(){
		return instance;
	}

	//readSnippetsFromFile
	private void readSnippetsFromFile(BufferedReader in) {
		try (ObjectInputStream ois
			= new ObjectInputStream(new FileInputStream("./Data/snippets.ser"))) {

			allSnippets = (HashMap<String, Snippet>) ois.readObject();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	//save snippets
	private boolean saveSnippetsToFile(){
		try (ObjectOutputStream oos =
				new ObjectOutputStream(new FileOutputStream("./Data/snippets.ser"))) {
			oos.writeObject(allSnippets);
			return true;
		} catch (Exception ex) {
			ex.printStackTrace();
			return false;
		}
	}
	
	//add new snippets
	public synchronized boolean addSnippet(Snippet u){
		allSnippets.put(u.getId(), u);
		if(saveSnippetsToFile()){
			//auto deleting new snippets in 10sec	
			timer.schedule(new AutoDeleteSnippet(u.getId()), u.getLasts());
			return true;
		}else{
			return false;
		}
	}
	
	//remove existing snippets (manually)
	public synchronized boolean removeSnippet(String id){
		allSnippets.remove(id);
		if (saveSnippetsToFile()) {
			return true;
		} else {
			return false;
		}
	}
	
	public synchronized Snippet getSnippet(String id){
		return allSnippets.get(id);
	}
	
	
	public synchronized Collection<Snippet>getAllSnippets(){
		return allSnippets.values();
	}
	
	public synchronized Collection<Snippet> filterSnippets(String description){
		HashMap<String, Snippet> result = new HashMap<String, Snippet>();
		for (Snippet p : allSnippets.values()) {
			if (p.getDescription().contains(description)) {
				result.put(p.getId(), p);
			}
		}
		return result.values();
	}
	
	
	public synchronized boolean updateSnippet(Snippet u){
		if (allSnippets.containsKey(u.getId())) {
			allSnippets.remove(u.getId());
			allSnippets.put(u.getId(), u);
			if(saveSnippetsToFile()){
				return true;
			}else{
				return false;
			}
		}else {
			return false;
		}	
	}
	
}


class AutoDeleteSnippet extends TimerTask {

    private final String id;

    //auto deleting functions in 10sec
    AutoDeleteSnippet ( String id )
    {
    	this.id = id;
    }

    public void run() {
      SnippetDao.getInstance().removeSnippet(this.id);
    }
}

