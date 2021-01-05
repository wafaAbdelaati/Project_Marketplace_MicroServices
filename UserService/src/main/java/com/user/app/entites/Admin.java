package com.user.app.entites;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;
@Document
public class Admin extends User implements Serializable {
	
	@org.springframework.data.annotation.Id
	private String id;
	private String role;
	private String address;
	
	public Admin() {
		super();
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}

	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public Admin(String firstname, String lastname, String phoneNumber, String birthDate, String mail,
			String password ,String id, String address) {
		super(firstname, lastname, phoneNumber, birthDate, mail, password);
		this.id = id;
		this.setAddress(address);
	}

	
	
}
