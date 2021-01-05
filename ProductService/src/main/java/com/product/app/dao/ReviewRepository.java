package com.product.app.dao;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import com.product.app.entities.Product;
import com.product.app.entities.Review;


public interface ReviewRepository extends MongoRepository<Review, String>,QuerydslPredicateExecutor<Review> {

	
	public List<Review> findByProduct(String id);
	public List<Review> findByCustomer(String id);

}
