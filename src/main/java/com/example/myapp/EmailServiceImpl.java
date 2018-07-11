package com.example.myapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSender;
import org.springframework.stereotype.Component;
import com.example.myapp.JavaMailSimpleMailSender;


public class EmailServiceImpl {

    public void sendSimpleMessage(
      String to, String subject, String text) {
    	 System.out.println(to);
        SimpleMailMessage message = new SimpleMailMessage(); 
        message.setTo(to); 
        message.setSubject(subject); 
        message.setText(text);
        message.setFrom("coursemanger06@gmail.com");
        MailSender sender = new JavaMailSimpleMailSender().getMailSender();
        try {
        sender.send(message);
        } catch (MailException e) {
        e.printStackTrace();
        }
      
    }
}