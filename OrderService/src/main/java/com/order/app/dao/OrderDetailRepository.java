package com.order.app.dao;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.order.app.entites.OrderDetail;

public interface OrderDetailRepository extends MongoRepository<OrderDetail, String> {
	
	List<OrderDetail> findByOrder(String id);
	Long countByOrderAndState(String id,String state);
	List<OrderDetail> findBySeller(String id);
	List<OrderDetail> findBySellerAndOrder(String seller,String order);

}
