package com.category.app.config;

import java.io.IOException;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.xmlpull.v1.XmlPullParserException;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
    public Docket api() throws IOException, XmlPullParserException {
    
        return new Docket(DocumentationType.SWAGGER_2)
        .apiInfo(apiInfo())
          .select()
          .apis(RequestHandlerSelectors.basePackage("com.category.app.controllers"))
          .paths(PathSelectors.any())
          .build();
}

 // Describe your apis
 private ApiInfo apiInfo() {
     return new ApiInfoBuilder()
     .title("Category Service APIs")

     .description("This page lists all the rest apis for Category Service App.")
     .version("1.0-SNAPSHOT")
     .build();
 }
 
}
