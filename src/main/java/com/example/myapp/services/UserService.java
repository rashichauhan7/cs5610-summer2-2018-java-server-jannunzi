package com.example.myapp.services;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	
	@PostMapping("/api/user")
	public void createUser(@RequestBody User user)
	{
		repository.save(user);
	}
	@PostMapping("/api/register")
	public User register(@RequestBody User user)
	{
		return repository.save(user);
	}
	
	@DeleteMapping("/api/user/{userId}")
	public void deleteUser(@PathVariable("userId") int userId)
	{
		repository.deleteById(userId);
	}
	
	
	//	@GetMapping("/api/profile")
	//	public User profile(HttpSession session) {
	//	User currentUser = (User)
	//	session.getAttribute("currentUser");    
	//	return currentUser;
	//	}

}
