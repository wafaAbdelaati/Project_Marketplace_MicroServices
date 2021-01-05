package com.product.app.entities;

import java.io.Serializable;

import javax.validation.constraints.NotNull;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Image implements Serializable {
	
	@org.springframework.data.annotation.Id
	private String id;
	@NotNull
	private String name;
	@NotNull
	private String path;
	@NotNull
	private String product;
	
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

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String getProduct() {
		return product;
	}

	public void setProduct(String product) {
		this.product = product;
	}

	public Image() {
		// TODO Auto-generated constructor stub
	}

}
