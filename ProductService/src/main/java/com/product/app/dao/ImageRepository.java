package com.product.app.dao;


import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.product.app.entities.Image;


public interface ImageRepository extends MongoRepository<Image, String> {

	
	public List<Image> findByProduct(String id);
	void deleteByProduct(String id);
}
