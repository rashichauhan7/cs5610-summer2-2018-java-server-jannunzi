package com.example.myapp.services;

import java.util.ArrayList;
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
import com.example.myapp.EmailServiceImpl;
@RestController

public class UserService {
	@Autowired
	UserRepository repository;
	@GetMapping("/api/user")
	public Iterable<User> findAllUsers(
			@RequestParam(name="username", required=false) String username, @RequestParam(name="role", required=false) String role)
	{
		if(username != null)
			return repository.findUserByUsername(username);
		else
			if(role != null)
				return repository.findUserByRole(role);
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
			if(newuser.getFirstName()!= null)
				user.setFirstName(newuser.getFirstName());
			if(newuser.getLastName()!= null)
				user.setLastName(newuser.getLastName());
			if(newuser.getPassword()!= null)
				user.setPassword(newuser.getPassword());
			if(newuser.getRole()!= null)
				user.setRole(newuser.getRole());
			if(newuser.getDate()!= null)
				user.setDate(newuser.getDate());
			if(newuser.getEmail()!= null)
				user.setEmail(newuser.getEmail());
			if(newuser.getPhone()!= null)
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

	@PostMapping("/api/login")
	public List<User> login(@RequestBody User user, HttpSession session)
	{

		List<User> e = new ArrayList<User>();
		System.out.println(e);
		List<User> users = (List<User>) repository.findUserByCredentials(user.getUsername(), user.getPassword());
		if(users.size() == 0)
			return e;
		else
		{
			session.setAttribute("currentUser", users.get(0));
			return users;
		}

	}

	@PostMapping("/api/logout")
	public void logout(HttpSession session) {
		session.invalidate();
	}

	@PostMapping("/api/forgotpassword")
	public void forgotPassword(@RequestBody User user)
	{
		String email = user.getEmail();
		String pass = user.getPassword();
		String subject = "Password";
		String text = pass;
		new EmailServiceImpl().sendSimpleMessage(email, subject , text);
	}
}
