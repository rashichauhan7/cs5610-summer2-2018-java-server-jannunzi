package com.example.myapp.repository;

import org.springframework.data.repository.CrudRepository;

import com.example.myapp.model.Hello;

public interface HelloRepository extends CrudRepository<Hello, Integer>{

}
