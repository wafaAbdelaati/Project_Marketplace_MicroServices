package com.user.app.dao;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient(name = "product-service", url = "${feign.client.url.ProductUrl}")
public interface IProduct {
	@RequestMapping(method = RequestMethod.GET, value = "/BySeller/{id}")
	List<Object> getProducts(@PathVariable("id") String id);
	@RequestMapping(method = RequestMethod.GET, value = "/reviewsByCustomer/{id}")
	List<Object> getReviewsByCustomer(@PathVariable("id") String id);
	@RequestMapping(method = RequestMethod.GET, value = "/deleteBySeller/{id}")
	void deleteProduct(@PathVariable("id") String id);
}
