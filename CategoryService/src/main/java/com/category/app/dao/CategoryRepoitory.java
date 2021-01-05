package com.category.app.dao;


import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import com.category.app.entities.Category;

public interface CategoryRepoitory extends MongoRepository<Category, String>,QuerydslPredicateExecutor<Category> {
    Long countByInHome(boolean inHome);
    List<Category> findByInHome(boolean inHome);
}
