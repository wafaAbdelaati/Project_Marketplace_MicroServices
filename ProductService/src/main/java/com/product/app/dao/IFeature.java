package com.product.app.dao;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;


@FeignClient(name="feature-service",url = "${feign.client.url.FeatureUrl}")
public interface IFeature {
	@RequestMapping(method = RequestMethod.GET, value = "/ByProduct/{id}")
    List<Object> getFeatures(@PathVariable("id") String id);
	@RequestMapping(method = RequestMethod.GET, value = "/deleteByProduct/{id}")
    void deteteFeatures(@PathVariable("id") String id);
	@RequestMapping(method = RequestMethod.GET, value = "/featuresByKeyword/{keyword}")
    List<String> getFeaturesByKeyword(@PathVariable("keyword") String keyword);
	@RequestMapping(method = RequestMethod.POST, value = "/addFeatures")
    List<Object> addFeatures(@RequestBody List<Object> features,@RequestParam String id);
}
