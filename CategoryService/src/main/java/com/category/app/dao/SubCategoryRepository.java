package com.category.app.dao;


import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.category.app.entities.SubCategory;

@RepositoryRestResource
public interface SubCategoryRepository extends MongoRepository<SubCategory, String> {
	List<SubCategory> findByCategory(String id);
	void deleteByCategory(String id);
}
