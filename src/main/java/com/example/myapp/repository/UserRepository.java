package com.example.myapp.repository;

import org.springframework.data.repository.CrudRepository;

import com.example.myapp.model.User;

public interface UserRepository extends CrudRepository<User, Integer>{

}
