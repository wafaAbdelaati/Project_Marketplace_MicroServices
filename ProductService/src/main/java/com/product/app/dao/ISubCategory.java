package com.product.app.dao;



import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient(name="category-service",url = "http://category-service:8902")
public interface ISubCategory {
	@RequestMapping(method = RequestMethod.GET, value = "/getSubCategory/{id}")
    Object getSubCategory(@PathVariable("id") String id);
}
