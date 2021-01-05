package com.product.app.dao;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import com.product.app.entities.Product;


public interface ProductRepository extends MongoRepository<Product, String>,QuerydslPredicateExecutor<Product> {

	
	public List<Product> findBySubCategory(String id);
	public List<Product> findBySubCategoryAndDeleted(String id,boolean deleted);
	public Page<Product> findBySubCategory(String id,Pageable page);
	public Page<Product> findBySubCategoryAndDeleted(String id,Pageable page,boolean deleted);
	public List<Product> findByCategory(String id);
	public List<Product> findByCategoryAndDeleted(String id,boolean deleted);
	public Page<Product> findByCategory(String id,Pageable page);
	public Page<Product> findByCategoryAndDeleted(String id,Pageable page,boolean deleted);
	public List<Product> findBySeller(String id);
	public List<Product> findBySellerAndDeleted(String id,boolean deleted);
	public Page<Product> findBySeller(String id,Pageable page);
	public Page<Product> findBySellerAndDeleted(String id,Pageable page,boolean deleted);
	Long countByInHome(boolean inHome);
    List<Product> findByInHome(boolean inHome);
	Long countByInHomeAndDeleted(boolean inHome,boolean deleted);
    List<Product> findByInHomeAndDeleted(boolean inHome,boolean deleted);
    Long countByDeleted(boolean deleted);
}
