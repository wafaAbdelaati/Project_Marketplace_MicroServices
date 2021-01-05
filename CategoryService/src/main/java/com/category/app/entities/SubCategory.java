package com.category.app.entities;

import java.io.Serializable;
import java.util.List;

import javax.validation.constraints.NotNull;

import org.springframework.data.domain.Page;
import org.springframework.data.mongodb.core.mapping.Document;
@Document
public class SubCategory implements Serializable {
	@org.springframework.data.annotation.Id

	private String id;
	@NotNull
	private String name;
	@NotNull
	private String category;

	private List<Object> products;
	
	private Object productsPage;
	public SubCategory() {
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
	public void setName(String name) {
		this.name = name;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
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
	public SubCategory(String name, String category) {
		super();
		this.name = name;
		this.category = category;
	}
	public SubCategory(String id, String name, String category) {
		super();
		this.id = id;
		this.name = name;
		this.category = category;
	}
	
	
}
