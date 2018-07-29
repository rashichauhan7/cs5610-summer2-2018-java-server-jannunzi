package com.example.myapp.repository;

import org.springframework.data.repository.CrudRepository;

import com.example.myapp.model.Widget;

public interface WidgetRepository extends CrudRepository<Widget, Integer>{

}
