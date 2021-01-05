package com.user.app.dao;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.user.app.entites.Admin;
import com.user.app.entites.Seller;

public interface AdminRepository extends MongoRepository<Admin, String> {
	
	Admin findOneByRole(String role);
	List<Admin> findByRole(String role);
	Admin findByMailAndPassword(String mail,String password);

}
