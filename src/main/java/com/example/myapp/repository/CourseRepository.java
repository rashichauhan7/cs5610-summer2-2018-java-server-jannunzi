package com.example.myapp.repository;

import org.springframework.data.repository.CrudRepository;
import com.example.myapp.model.Course;

public interface CourseRepository
extends CrudRepository<Course, Integer> { }

