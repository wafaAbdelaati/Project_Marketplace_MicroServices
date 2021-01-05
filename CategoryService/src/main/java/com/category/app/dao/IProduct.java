package com.category.app.dao;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient(name="product-service",url = "${feign.client.url.ProductUrl}")
public interface IProduct {
	@RequestMapping(method = RequestMethod.GET, value = "/BySubCategory/{id}")
    List<Object> getProducts(@PathVariable("id") String id);
	@RequestMapping(method = RequestMethod.GET, value = "/BySubCategory/{id}/{page}/{sort}/{dir}")
    Object getProducts(@PathVariable("id") String id,@PathVariable("page") int page,@PathVariable("sort") String sort,@PathVariable("dir") String dir);
	@RequestMapping(method = RequestMethod.GET, value = "/ByCategory/{id}")
    List<Object> getProductsForCategory(@PathVariable("id") String id);
	@RequestMapping(method = RequestMethod.GET, value = "/ByCategory/{id}/{page}/{sort}/{dir}")
    Object getProductsForCategory(@PathVariable("id") String id,@PathVariable("page") int page,@PathVariable("sort") String sort,@PathVariable("dir") String dir);
	@RequestMapping(method = RequestMethod.GET, value = "/deleteBySubCategory/{id}")
    void deleteProducts(@PathVariable("id") String id);
	
	@RequestMapping(method = RequestMethod.GET, value = "/filterByKeywordCatIds/{keyWord}")
    List<String> getCategoriesIdByKeyword(@PathVariable("keyWord") String keyword);
	
	@RequestMapping(method = RequestMethod.GET, value = "/filterByKeywordCat/{keyWord}/{category}/{page}")
    Object getProductsByKeyWord(@PathVariable("keyWord") String keyWord,@PathVariable("category") String category,@PathVariable("page") int page);

}
