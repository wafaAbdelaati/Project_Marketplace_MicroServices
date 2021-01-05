package com.feature.app.dao;



import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import com.feature.app.entities.Feature;

public interface FeatureRepository extends MongoRepository<Feature, String>,QuerydslPredicateExecutor<Feature>{
	
	public List<Feature> findByProduct(String id);

}
