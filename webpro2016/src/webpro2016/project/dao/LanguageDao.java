package webpro2016.project.dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.Collection;
import java.util.HashMap;

import webpro2016.project.model.Language;

public class LanguageDao {
	
	
	private HashMap<String, Language> allLanguages = new HashMap<String, Language>();
	private static LanguageDao instance = new LanguageDao();

	//programming languages are saved in "./Data/languages.txt", we can edit that file
	private LanguageDao() {
		BufferedReader in = null;
		try {
			File theDir = new File("./Data");

			if (!theDir.exists()) {
				 theDir.mkdir();
			}
			
			File file = new File("./Data/languages.txt");
			
			if(file.exists()){
				in = new BufferedReader(new InputStreamReader(
	                      new FileInputStream(file), "UTF-8"));
	
				readLanguagesFromFile(in);
			}
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
	
	public static LanguageDao getInstance(){
		return instance;
	}

	//readLanguagesFromFile
	private void readLanguagesFromFile(BufferedReader in) {
		String line = "";
		try {
			while ((line = in.readLine()) != null) {
				line = line.trim();
				if (line.equals(""))
					continue;
				
				Language programmingLanguage = new Language(line);
				allLanguages.put(line, programmingLanguage);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
	
	//saving programming languages
	private boolean saveLanguagesToFile(){
		BufferedWriter out = null;
		try {
			out = new BufferedWriter(new OutputStreamWriter(
					new FileOutputStream("./Data/languages.txt"), "UTF-8"));
			String line;
			for (Language u : allLanguages.values()) {
				line = u.getName();
				out.write(line);
				out.newLine();
			}
			out.flush();
			out.close();
			return true;
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
	}
	
	public synchronized boolean isLanguageAvailable(String language){
		return !allLanguages.containsKey(language);
	}
	
	public synchronized boolean addLanguage(Language u){
		if (!allLanguages.containsKey(u.getName())) {
			allLanguages.put(u.getName(), u);
			if(saveLanguagesToFile()){
				return true;
			}else{
				return false;
			}
		}else {
			return false;
		}
	}
	
	public synchronized Language getLanguage(String name){
		return allLanguages.get(name);
	}
	
	public synchronized Collection<Language>getAllLanguages(){
		return allLanguages.values();
	}
	
}
