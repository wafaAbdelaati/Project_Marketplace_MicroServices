package com.user.app.entites;

import java.util.List;


import javax.validation.constraints.*;

public class User {
	@NotNull
	@Size(min=1,max=10)
    private String firstname;
	@NotNull
	@Size(min=1,max=10)
    private String lastname;
	@NotNull
	@Size(min=8,max=8)
    private String phoneNumber;
    private String birthDate;
    @NotNull
    @Email
    private String mail;
    @NotNull
    @Size(min=8,max=20)
    private String password;
    private Boolean isActive;
    private List<Object> orders;
	public User() {
		
	}
	public String getFirstname() {
		return firstname;
	}
	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}
	public String getLastname() {
		return lastname;
	}
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public String getBirthDate() {
		return birthDate;
	}
	public void setBirthDate(String birthDate) {
		this.birthDate = birthDate;
	}
	public String getMail() {
		return mail;
	}
	public void setMail(String mail) {
		this.mail = mail;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Boolean getIsActive() {
		return isActive;
	}
	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}
	public List<Object> getOrders() {
		return orders;
	}
	public void setOrders(List<Object> orders) {
		this.orders = orders;
	}
	public User(String firstname, String lastname, String phoneNumber, String birthDate, String mail,
			String password) {
		super();
		this.firstname = firstname;
		this.lastname = lastname;
		this.phoneNumber = phoneNumber;
		this.birthDate = birthDate;
		this.mail = mail;
		this.password = password;
	}
	
}
