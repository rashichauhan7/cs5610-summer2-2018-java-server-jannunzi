package com.example.myapp.repository;


import org.springframework.data.repository.CrudRepository;

import com.example.myapp.model.Lesson;

public interface LessonRepository extends CrudRepository<Lesson, Integer>{}
