package com.example.myapp.repository;


import org.springframework.data.repository.CrudRepository;

import com.example.myapp.model.Topic;

public interface TopicRepository extends CrudRepository<Topic, Integer>{}
