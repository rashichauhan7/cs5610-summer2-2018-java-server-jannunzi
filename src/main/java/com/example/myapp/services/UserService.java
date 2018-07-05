package com.example.myapp.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.myapp.model.User;
import com.example.myapp.repository.UserRepository;

@RestController

public class UserService {
	@Autowired
	UserRepository repository;
	@GetMapping("/api/user")
 public List<User> findAllUsers()
 {
	 return (List<User>) repository.findAll();
 }
}
