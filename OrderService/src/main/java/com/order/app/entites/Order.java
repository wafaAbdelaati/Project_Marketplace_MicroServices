package com.order.app.entites;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.*;

import org.springframework.data.mongodb.core.mapping.Document;
@Document
public class Order implements Serializable {
   
	@org.springframework.data.annotation.Id
	private String id;
	@NotNull
	private Date orderDate;
	@NotNull
	private String customer;
	@NotNull
	private String state;
	private double amount;
	
	@NotEmpty
	private List<OrderDetail> details;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public Date getOrderDate() {
		return orderDate;
	}
	public void setOrderDate(Date orderDate) {
		this.orderDate = orderDate;
	}
	public String getCustomer() {
		return customer;
	}
	public void setCustomer(String customer) {
		this.customer = customer;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public List<OrderDetail> getDetails() {
		return details;
	}
	public void setDetails(List<OrderDetail> details) {
		this.details = details;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public Order() {
		super();
	}
	public Order(String id, Date orderDate, String customer, String state) {
		this.id = id;
		this.orderDate = orderDate;
		this.customer = customer;
		this.state = state;
	}
	
	
	
	
}
