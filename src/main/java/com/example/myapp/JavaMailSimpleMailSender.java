package com.example.myapp;

import java.util.Properties;


import org.springframework.mail.MailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

public class JavaMailSimpleMailSender extends EmailServiceImpl{
	protected MailSender getMailSender() {
		
		 Properties props = new Properties();  
		 String from = "coursemanager06@gmail.com";
		 String password = "eahdtpdmjsfkdgcw";
		 props.put("mail.smtp.auth","true");
		props.put("mail.smtp.starttls.enable", "true");
		  props.setProperty("mail.transport.protocol", "smtp");     
		    props.setProperty("mail.host", "smtp.gmail.com");  
		    props.put("mail.smtp.auth", "true");  
		    props.put("mail.smtp.port", "465");  
		    props.put("mail.debug", "true");  
		    props.put("mail.smtp.socketFactory.port", "465");  
		    props.put("mail.smtp.socketFactory.class","javax.net.ssl.SSLSocketFactory");  
		    props.put("mail.smtp.socketFactory.fallback", "false");  
		    
		    JavaMailSenderImpl sender = new JavaMailSenderImpl();
			sender.setHost("smtp.gmail.com");
			sender.setPort(587);
			sender.setUsername("coursemanager06@gmail.com");
			sender.setPassword("eahdtpdmjsfkdgcw");
			sender.setJavaMailProperties(props);
		return sender;
	}
} 