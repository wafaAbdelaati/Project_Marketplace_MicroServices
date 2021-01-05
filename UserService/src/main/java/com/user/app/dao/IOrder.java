package com.user.app.dao;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient(name = "order-service", url = "${feign.client.url.OrderUrl}")
public interface IOrder {
	@RequestMapping(method = RequestMethod.GET, value = "/OrdersBySeller/{id}")
	List<Object> getOrdersForSeller(@PathVariable("id") String id);
	@RequestMapping(method = RequestMethod.GET, value = "/OrdersByCustomer/{id}")
	List<Object> getOrdersForCustomer(@PathVariable("id") String id);
}
