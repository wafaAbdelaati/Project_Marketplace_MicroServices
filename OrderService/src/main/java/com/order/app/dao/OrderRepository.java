package com.order.app.dao;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import com.order.app.entites.Order;
import com.order.app.entites.OrderDetail;

public interface OrderRepository extends MongoRepository<Order, String> ,QuerydslPredicateExecutor<Order> {
	List<Order> findByCustomer(String id);

}
