package com.user.app.dao;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.user.app.entites.Customer;

public interface CustomerRepository extends MongoRepository<Customer, String> {
   Customer findByMailAndPassword(String mail,String password);
}
