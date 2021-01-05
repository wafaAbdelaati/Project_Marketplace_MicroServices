package com.order.app.entites;

import java.io.Serializable;

import javax.validation.constraints.NotNull;

import org.springframework.data.mongodb.core.mapping.Document;
@Document
public class OrderDetail implements Serializable {
   
	@org.springframework.data.annotation.Id
	private String id;
	private String order;
	@NotNull
	private String product;
	@NotNull
	private String seller;
	@NotNull
	private int quantity;
	@NotNull
	private double suggestedPrice;
	@NotNull
	private double approvedPrice;
	@NotNull
	private String state;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getOrder() {
		return order;
	}
	public void setOrder(String order) {
		this.order = order;
	}
	public String getProduct() {
		return product;
	}
	public void setProduct(String product) {
		this.product = product;
	}
	public String getSeller() {
		return seller;
	}
	public void setSeller(String seller) {
		this.seller = seller;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public double getSuggestedPrice() {
		return suggestedPrice;
	}
	public void setSuggestedPrice(double suggestedPrice) {
		this.suggestedPrice = suggestedPrice;
	}
	public double getApprovedPrice() {
		return approvedPrice;
	}
	public void setApprovedPrice(double approvedPrice) {
		this.approvedPrice = approvedPrice;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public OrderDetail() {
		super();
	}
	public OrderDetail(String order, String product, String seller, int quantity, double suggestedPrice,
			double approvedPrice, String state) {
		this.order = order;
		this.product = product;
		this.seller = seller;
		this.quantity = quantity;
		this.suggestedPrice = suggestedPrice;
		this.approvedPrice = approvedPrice;
		this.state = state;
	}
    	
	
	
	
	
	
}
