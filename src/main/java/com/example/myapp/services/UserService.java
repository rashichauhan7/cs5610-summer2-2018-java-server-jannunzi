package com.example.myapp.services;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.myapp.model.User;
import com.example.myapp.repository.UserRepository;

@RestController

public class UserService {
	@Autowired
	UserRepository repository;
	@GetMapping("/api/user")
	public Iterable<User> findAllUsers(
			@RequestParam(name="username", required=false) String username)
	{
		if(username != null)
			return repository.findUserByUsername(username);
		else
			return (List<User>) repository.findAll();
	}

	@PostMapping("/api/user")
	public void createUser(@RequestBody User user)
	{
		repository.save(user);
	}
	@PostMapping("/api/register")
	public User register(@RequestBody User user, HttpSession session)
	{
		
		User newuser =  repository.save(user);
		session.setAttribute("currentUser", newuser);
		return newuser;
	}


	@DeleteMapping("/api/user/{userId}")
	public void deleteUser(@PathVariable("userId") int userId)
	{
		repository.deleteById(userId);
	}

	@GetMapping("/api/user/{userId}")
	public User findUserById(@PathVariable("userId") int userId)
	{
		Optional<User> data = repository.findById(userId);
		if(data.isPresent())
			return data.get();
		return null;
	}

	@PutMapping("/api/user/{userId}")
	public User updateUser(@PathVariable("userId") int userId, @RequestBody User newuser)
	{
		Optional<User> data = repository.findById(userId);
		if(data.isPresent())
		{
			User user = data.get();
			user.setFirstName(newuser.getFirstName());
			user.setLastName(newuser.getLastName());
			user.setRole(newuser.getRole());
			user.setDate(newuser.getDate());
			user.setEmail(newuser.getEmail());
			user.setPhone(newuser.getPhone());
			return repository.save(user);
			
		}
		return null;
	}


	@GetMapping("/api/profile")
	public User profile(HttpSession session) {
			Object currentUser =  session.getAttribute("currentUser"); 
			User e = new User();
			if(currentUser == null)
				return e;   
		System.out.println(currentUser.toString());
		return (User) currentUser;
	}
	
	@PostMapping("/api/logout")
	public void logout(HttpSession session) {
	    session.invalidate();
	}


}
