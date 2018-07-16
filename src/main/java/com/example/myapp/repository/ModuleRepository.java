package com.example.myapp.repository;

import org.springframework.data.repository.CrudRepository;
import com.example.myapp.model.Module;

public interface ModuleRepository
  extends CrudRepository<Module, Integer>{}

