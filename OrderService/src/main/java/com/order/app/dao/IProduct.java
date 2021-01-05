package com.order.app.dao;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient(name="product-service",url = "${feign.client.url.ProductUrl}")
public interface IProduct {
	@RequestMapping(method = RequestMethod.GET, value = "/updateProductQuantity")
    Object updateProductQuantity(@RequestParam("id") String id,@RequestParam("quantity") int quantity,@RequestParam("add")boolean add);



}
