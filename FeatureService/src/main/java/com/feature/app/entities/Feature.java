package com.feature.app.entities;

import java.io.Serializable;

import javax.validation.constraints.NotNull;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Feature implements Serializable {
	@org.springframework.data.annotation.Id
	private String id;
	@NotNull
	private String name;
	@NotNull
	private String value;
	private String product;
	public Feature()
	{
		super();
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public Feature(String name, String value, String product) {
		super();
		this.name = name;
		this.value = value;
		this.product = product;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public String getProduct() {
		return product;
	}
	public void setProduct(String product) {
		this.product = product;
	}
	
}
