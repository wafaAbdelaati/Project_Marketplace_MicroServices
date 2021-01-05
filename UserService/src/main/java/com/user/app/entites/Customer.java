package com.user.app.entites;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;
@Document
public class Customer extends User implements Serializable {
	
	@org.springframework.data.annotation.Id
	private String id;
	private String gender;
	private String address;
	private String deliveryAddress;
	private List<Object> reviews;
	
	public Customer() {
		super();
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getDeliveryAddress() {
		return deliveryAddress;
	}
	public void setDeliveryAddress(String deliveryAddress) {
		this.deliveryAddress = deliveryAddress;
	}
	public List<Object> getReviews() {
		return reviews;
	}
	public void setReviews(List<Object> reviews) {
		this.reviews = reviews;
	}
	public Customer(String firstname, String lastname, String phoneNumber, String birthDate, String mail,
			 String password, String id, String gender, String address, String deliveryAddress) {
		super(firstname, lastname, phoneNumber, birthDate, mail, password);
		this.id = id;
		this.gender = gender;
		this.address = address;
		this.deliveryAddress = deliveryAddress;
	}
	
}
