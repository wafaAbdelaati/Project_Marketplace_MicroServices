package com.product.app.entities;

import java.io.Serializable;
import java.util.List;

import javax.validation.constraints.NotNull;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Product implements Serializable {

	@org.springframework.data.annotation.Id
	private String id;
	@NotNull
	private String designation;
	@NotNull
	private String description;
	@NotNull
	private int quantity;
	@NotNull
	private double price;
	@NotNull
	private List<Object> priceHistory;
	@NotNull
	private boolean inHome;
	@NotNull
	private String seller;
	@NotNull
	private String subCategory;
	@NotNull
	private String category;
	@NotNull
	private boolean deleted;
	
	private List<Object> features;
	
	private List<Image> images;
	
	private List<Review> reviews;

	public Product() {
		super();
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getDesignation() {
		return designation;
	}
	public void setDesignation(String designation) {
		this.designation = designation;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantite) {
		this.quantity = quantite;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double prix) {
		this.price = prix;
	}
	public boolean isInHome() {
		return inHome;
	}
	public void setInHome(boolean inHome) {
		this.inHome = inHome;
	}
	public boolean isDeleted() {
		return deleted;
	}
	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}
	public List<Object> getPriceHistory() {
		return priceHistory;
	}
	public void setPriceHistory(List<Object> priceHistory) {
		this.priceHistory = priceHistory;
	}
	public String getSubCategory() {
		return subCategory;
	}
	public void setSubCategory(String sousCategorie) {
		this.subCategory = sousCategorie;
	}
	public List<Object> getFeatures() {
		return features;
	}
	public void setFeatures(List<Object> caracteristiques) {
		this.features = caracteristiques;
	}
	public List<Image> getImages() {
		return images;
	}
	public void setImages(List<Image> images) {
		this.images = images;
	}
	public String getSeller() {
		return seller;
	}
	public void setSeller(String seller) {
		this.seller = seller;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public List<Review> getReviews() {
		return reviews;
	}
	public void setReviews(List<Review> reviews) {
		this.reviews = reviews;
	}
	public Product(String id, String designation, String description, int quantity, double price, String subCategory) {
		super();
		this.id = id;
		this.designation = designation;
		this.description = description;
		this.quantity = quantity;
		this.price = price;
		this.subCategory = subCategory;
	}
	
	
	
	

}
