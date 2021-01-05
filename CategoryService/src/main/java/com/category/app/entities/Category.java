package com.category.app.entities;

import java.io.Serializable;
import java.util.List;

import javax.validation.constraints.NotNull;

import org.springframework.data.mongodb.core.mapping.Document;
@Document
public class Category implements Serializable {
	@org.springframework.data.annotation.Id
	private String id;
	@NotNull
	private String name;
	@NotNull
	private boolean inHome;
	private List <SubCategory> subCategories;
	private List<Object> products;
	private Object productsPage;
	public Category() {
		
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String designation) {
		this.name = designation;
	}
	public boolean isInHome() {
		return inHome;
	}
	public void setInHome(boolean inHome) {
		this.inHome = inHome;
	}
	public List <SubCategory> getSubCategories() {
		return subCategories;
	}
	public void setSubCategories(List <SubCategory> subCategories) {
		this.subCategories = subCategories;
	}
	public List<Object> getProducts() {
		return products;
	}
	public void setProducts(List<Object> products) {
		this.products = products;
	}
	public Object getProductsPage() {
		return productsPage;
	}
	public void setProductsPage(Object productsPage) {
		this.productsPage = productsPage;
	}
	public Category(String id, String name) {
		super();
		this.id = id;
		this.name = name;
	}
	public Category(String name) {
		super();
		this.name = name;
	}
	
	

}
