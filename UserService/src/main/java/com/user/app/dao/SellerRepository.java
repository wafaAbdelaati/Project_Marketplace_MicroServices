package com.user.app.dao;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.user.app.entites.Seller;

public interface SellerRepository extends MongoRepository<Seller, String> {
  Seller  findByMailAndPassword(String mail,String password);
}
