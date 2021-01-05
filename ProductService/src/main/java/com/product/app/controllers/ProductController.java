package com.product.app.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.product.app.dao.AmazonClient;
import com.product.app.dao.IFeature;
import com.product.app.dao.ISubCategory;
import com.product.app.dao.ImageRepository;
import com.product.app.dao.ProductRepository;
import com.product.app.dao.ReviewRepository;
import com.product.app.entities.Image;
import com.product.app.entities.*;
import com.product.app.entities.QProduct;
import com.product.app.entities.Review;
import com.product.app.exceptions.ImpossibleAjouterProduitException;
import com.product.app.exceptions.ProductNotFoundException;
import com.querydsl.core.types.dsl.BooleanExpression;

//import com.querydsl.core.types.dsl.BooleanExpression;
@RestController
public class ProductController {
	
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private ImageRepository imageRepository;
	
	@Autowired
	private ReviewRepository reviewRepository;
	
	@Autowired
	private IFeature iFeature;
	
	
	QProduct qProduct = new QProduct("product");
	
	
	/*
	* Method for adding a new  product 
	*/
	@PostMapping("/addProduct")
	public Product addProduct(@Valid @RequestBody Product product){
		List<Object> features = product.getFeatures();
		product.setFeatures(null);
		List<Image> images  = product.getImages();
		product.setImages(null);
		product.setDeleted(false);
		Product newProduct =productRepository.save(product);
		for(int i=0;i<images.size();i++) {
			images.get(i).setProduct(newProduct.getId());
		}
		iFeature.addFeatures(features, newProduct.getId());
		imageRepository.saveAll(images);
		return newProduct;
	}
	/*
	* Method for updating a  product 
	*/
	@PostMapping("/saveProduct")
	public Product saveProduct(@Valid @RequestBody Product product){
		
		Product newProduct =productRepository.save(product);
		if(newProduct == null) throw new ImpossibleAjouterProduitException("Impossible d'ajouter ce produit");
		return newProduct;
	}
	/*
	* Method for updating a  product's quantity 
	*/
	@RequestMapping("/updateProductQuantity")
	public Product updateQuantity(String id,int quantity,boolean add){
		Optional<Product> product = productRepository.findById(id);
		if(add) {
			product.get().setQuantity(product.get().getQuantity()-quantity);
		}
		else {
			product.get().setQuantity(product.get().getQuantity()+quantity);
		}
		Product newProduct =productRepository.save(product.get());
		return newProduct;
	}
	/*
	 * Method to add an existing product to home page
	 */
	@RequestMapping("/addProductToHome")
	public Product addProductToHome(String id,Boolean home) {

		Long productsInHome = productRepository.countByInHomeAndDeleted(true, false);
		if (home && productsInHome == 16) {
			return null;
		}
		Optional<Product> product = productRepository.findById(id);
		product.get().setInHome(home);

		return productRepository.save(product.get());
	}
	/*
	* Method for listing all products
	*/
	@RequestMapping("/allProducts")
	public List<Product> getProducts(){
		BooleanExpression  expression = this.qProduct.deleted.eq(false);
		List<Product> products =(List<Product>) productRepository.findAll(expression);
		if(products.isEmpty()) throw new ProductNotFoundException("Aucun produit n'est disponible");
		return products ;
	}
	/*
	* Method for listing all products - By Page
	*/
	@RequestMapping("/allProductsByPage")
	public Page<Product> getProductsByPage(int page){
		BooleanExpression  expression = this.qProduct.deleted.eq(false);
		Page<Product> products =productRepository.findAll(expression,PageRequest.of(page, 3, Sort.by("inHome").descending()));
		if(products.isEmpty()) throw new ProductNotFoundException("Aucun produit n'est disponible");
		return products ;
	}
	/*
	 * Method for listing all products in the menu
	 */
	@RequestMapping("/allProductsInHome")
	public List<Product> getProductsInHome() {
		List<Product> products = productRepository.findByInHomeAndDeleted(true, false);
		for (int i=0 ; i< products.size();i++) {
		List<Image> images = imageRepository.findByProduct(products.get(i).getId());
		products.get(i).setImages(images);
		}
		return products;
	}
	/*
	 * Method for listing all products not  in the menu
	 */
	@RequestMapping("/allProductsNotInHome")
	public List<Product> getProductsNotInHome() {
		List<Product> products = productRepository.findByInHomeAndDeleted(false, false);
		return products;
	}
	/*
	* Method for listing products by filter
	*/
	@RequestMapping("/filterByKeywordAll/{keyWord}/{page}")
	public Page<Product> filterBykeyWordAndPage(@PathVariable("keyWord") String keyWord,@PathVariable("page") int page){
		
		List<String> ids = iFeature.getFeaturesByKeyword(keyWord);
		BooleanExpression  expression = this.qProduct.deleted.eq(false);
		BooleanExpression  filterByKeyWord = this.qProduct.description.containsIgnoreCase(keyWord); 
		BooleanExpression  filterByKeyWord2 = this.qProduct.id.in(ids);
		Page<Product> products =(Page<Product>) productRepository.findAll((filterByKeyWord.or(filterByKeyWord2)).and(expression),new PageRequest(page,3));
		if(products.isEmpty()) throw new ProductNotFoundException("Aucun produit n'est disponible");
		for (int i=0 ; i< products.getContent().size();i++) {
			List<Object> features = iFeature.getFeatures(products.getContent().get(i).getId());
			products.getContent().get(i).setFeatures(features);
			List<Image> images = imageRepository.findByProduct(products.getContent().get(i).getId());
			products.getContent().get(i).setImages(images);
			}
		return products ;
	}
	/*
	* Method for searching products - Seller
	*/
	@RequestMapping("/search")
	public Page<Product> searchForProduct(String seller,String keyword, int page,String category,String subCategory){
		
		List<String> ids = iFeature.getFeaturesByKeyword(keyword);
		BooleanExpression  expression = this.qProduct.deleted.eq(false);
		BooleanExpression  filterByKeyWord0 = this.qProduct.designation.containsIgnoreCase(keyword);
		BooleanExpression  filterByKeyWord1 = this.qProduct.description.containsIgnoreCase(keyword); 
		BooleanExpression  filterByKeyWord2 = this.qProduct.id.in(ids);
		BooleanExpression  filterByKeyWord = filterByKeyWord1.or(filterByKeyWord2).or(filterByKeyWord0);
		if(!category.equals("0")) {
			BooleanExpression  filterByKeyWord3 ;
			if(subCategory.equals("0")) {
			filterByKeyWord3=this.qProduct.category.eq(category);}
			else {
			filterByKeyWord3=this.qProduct.subCategory.eq(subCategory);}
			
			filterByKeyWord = filterByKeyWord.and(filterByKeyWord3);
		}
		BooleanExpression  filterByKeyWord4 = this.qProduct.seller.eq(seller);
		Page<Product> products =(Page<Product>) productRepository.findAll(filterByKeyWord.and(filterByKeyWord4).and(expression),new PageRequest(page,3));
		if(products.isEmpty()) throw new ProductNotFoundException("Aucun produit n'est disponible");

		return products ;
	}
	
	/*
	* Method for listing products by keyword and category
	*/
	@RequestMapping("/filterByKeywordCat/{keyWord}/{category}/{page}")
	public Page<Product> filterBykeyWordAndPageAndCategory(@PathVariable("keyWord") String keyWord,@PathVariable("category") String category,@PathVariable("page") int page){
		
		List<String> ids = iFeature.getFeaturesByKeyword(keyWord);
		BooleanExpression  expression = this.qProduct.deleted.eq(false);
		BooleanExpression  filterByKeyWord = this.qProduct.description.containsIgnoreCase(keyWord); 
		BooleanExpression  filterByKeyWord2 = this.qProduct.id.in(ids);
		BooleanExpression  filterByKeyWord3 = this.qProduct.category.eq(category);
		Page<Product> products =(Page<Product>) productRepository.findAll((filterByKeyWord.or(filterByKeyWord2)).and(filterByKeyWord3).and(expression),new PageRequest(page,3));
		if(products.isEmpty()) throw new ProductNotFoundException("Aucun produit n'est disponible");
		for (int i=0 ; i< products.getContent().size();i++) {
			List<Object> features = iFeature.getFeatures(products.getContent().get(i).getId());
			products.getContent().get(i).setFeatures(features);
			List<Image> images = imageRepository.findByProduct(products.getContent().get(i).getId());
			products.getContent().get(i).setImages(images);
			}
		return products ;
	}
	/*
	* Method for listing categories id's belonging to products by filter
	*/
	@RequestMapping("/filterByKeywordCatIds/{keyWord}")
	public List<String> filter(@PathVariable("keyWord") String keyWord){
		List<String> ids = iFeature.getFeaturesByKeyword(keyWord);
		BooleanExpression  expression = this.qProduct.deleted.eq(false);
		BooleanExpression  filterByKeyWord = this.qProduct.description.containsIgnoreCase(keyWord); 
		BooleanExpression  filterByKeyWord2 = this.qProduct.id.in(ids);
		List<Product> products =(List<Product>) productRepository.findAll((filterByKeyWord.or(filterByKeyWord2)).and(expression));
		if(products.isEmpty()) throw new ProductNotFoundException("Aucun produit n'est disponible");
		List<String> idsC = products.stream().map(Product::getCategory).collect(Collectors.toList());
		return idsC ;
	}
	/*
	* Method to retrieve a product by id
	*/
	@RequestMapping("/getProduct/{id}")
	public Optional<Product> getProduct(@PathVariable("id") String id){		
     
		Optional<Product> product= productRepository.findById(id);
		if(!product.isPresent())  throw new ProductNotFoundException("Le produit correspondant à l'id " + id + " n'existe pas");
	   List<Object> features = iFeature.getFeatures(id);
	   List<Image> images = imageRepository.findByProduct(id);
	   List<Review> reviews = reviewRepository.findByProduct(id);
	   product.get().setFeatures(features);
	   product.get().setImages(images);
	   product.get().setReviews(reviews);
		return product;
    
	}
	/*
	* Method for listing all products belonging to a given sub-category
	*/
	@GetMapping("/BySubCategory/{id}")
	public List<Product> getBySubCategory(@PathVariable("id") String id) {
		List<Product> products =this.productRepository.findBySubCategoryAndDeleted(id, false);
		for (int i=0 ; i< products.size();i++) {
			List<Image> images = imageRepository.findByProduct(products.get(i).getId());
			products.get(i).setImages(images);}
		return products ;

	}
	/*
	* Method for listing all products belonging to a given sub-category by page
	*/
	@GetMapping("/BySubCategory/{id}/{page}/{sort}/{dir}")
	public Page<Product> getBySubCategoryByPage(@PathVariable("id") String id,@PathVariable("page") int page,@PathVariable("sort") String sort,@PathVariable("dir") String dir) {
		Pageable sorted = null;
		if(dir.equalsIgnoreCase("asc")) {sorted = PageRequest.of(page, 3, Sort.by(sort).ascending());}
		else {sorted = PageRequest.of(page, 3, Sort.by(sort).descending());}
		Page<Product> products =this.productRepository.findBySubCategoryAndDeleted(id, sorted,false);
		for (int i=0 ; i< products.getContent().size();i++) {
			List<Image> images = imageRepository.findByProduct(products.getContent().get(i).getId());
			products.getContent().get(i).setImages(images);}
		return products ;

	}
	/*
	* Method for listing all products belonging to a given seller
	*/
	@GetMapping("/BySeller/{id}")
	public List<Product> getBySeller(@PathVariable("id") String id) {
		List<Product> products =this.productRepository.findBySellerAndDeleted(id, false);
		for (int i=0 ; i< products.size();i++) {
			List<Review> reviews = reviewRepository.findByProduct(products.get(i).getId());
			products.get(i).setReviews(reviews);}
		return products ;

	}
	/*
	* Method for listing all products belonging to a given seller by page
	*/
	@GetMapping("/BySeller")
	public Page<Product> getBySellerByPage( String id,int page) {
		Pageable pageable = PageRequest.of(page, 3);
		Page<Product> products =this.productRepository.findBySellerAndDeleted(id,pageable,false);
		return products ;

	}
	/*
	* Method for listing all products belonging to a given category by page sorted by price
	*/
	@GetMapping("/ByCategory/{id}/{page}/{sort}/{dir}")
	public Page<Product> getByCategory(@PathVariable("id") String id,@PathVariable("page") int page,@PathVariable("sort") String sort,@PathVariable("dir") String dir) {
		Pageable sorted = null;
		if(dir.equalsIgnoreCase("asc")) {sorted = PageRequest.of(page, 3, Sort.by(sort).ascending());}
		else {sorted = PageRequest.of(page, 3, Sort.by(sort).descending());}
		Page<Product> products =this.productRepository.findByCategoryAndDeleted(id,sorted,false);
		for (int i=0 ; i< products.getContent().size();i++) {
			List<Image> images = imageRepository.findByProduct(products.getContent().get(i).getId());
			products.getContent().get(i).setImages(images);
			}
		return products ;

	}
	/*
	* Method for listing all products belonging to a given category
	*/
	@GetMapping("/ByCategory/{id}")
	public List<Product> getByCategory(@PathVariable("id") String id) {
		List<Product> products =this.productRepository.findByCategoryAndDeleted(id,false);
		for (int i=0 ; i< products.size();i++) {
			List<Image> images = imageRepository.findByProduct(products.get(i).getId());
			products.get(i).setImages(images);
			}
		return products ;

	}
	/*
	* Method for deleting all products belonging to a given sub-category
	*/
	@GetMapping("/deleteBySubCategory/{id}")
	public void deleteBySubCategory(@PathVariable("id") String id) {
		List<Product> products =this.productRepository.findBySubCategory(id);
		this.productRepository.deleteAll(products);

	}
	/*
	* Method for deleting all products belonging to a given seller
	*/
	@GetMapping("/deleteBySeller/{id}")
	public void deleteBySeller(@PathVariable("id") String id) {
		List<Product> products =this.productRepository.findBySeller(id);
		this.productRepository.deleteAll(products);
	}
	/*
	 * Method for deleting a product 
	 */
	@RequestMapping("/deleteProduct/{id}")
	public Boolean deleteProduct(@PathVariable("id") String id ) {
		Optional<Product> product = productRepository.findById(id);
		product.get().setDeleted(true);
		productRepository.save(product.get());
		return true;
	}
	/*
	 *  Method for deleting a product permanent 
	 */
	@DeleteMapping("/deleteProductP")
	public Boolean deleteProductP(String id ) {
		productRepository.deleteById(id);
		iFeature.deteteFeatures(id);
	    imageRepository.deleteByProduct(id);
		return true;
	}
	/*
	 * Method for retrieving product' Count - Statistics 
	 */
	@RequestMapping("/DashboradProductsCount")
	public long DashboradProductsCount() {
		return  productRepository.countByDeleted(false);	
	}
	/*
     * Method for retrieving review's count of  a seller's product - Statistics 
	 */
	@RequestMapping("/DashboradSellerProductsByReviews")
	public List<Statistics> DashboradSellerProductsByReviews(String id) {
		List<Statistics> result = new ArrayList<Statistics>();
		List<Product> products =this.productRepository.findBySellerAndDeleted(id, false);
		for (int i=0 ; i< products.size();i++) {
			List<Review> reviews = reviewRepository.findByProduct(products.get(i).getId());
			Statistics obj = new Statistics(products.get(i).getDesignation(),reviews.size());
		      result.add(obj);
			}
		

		return result;
	}
	/*
	 * Method for retrieving review's average of  a seller's product - Statistics 
	 */
	@RequestMapping("/DashboradSellerProductsByReviewsAverage")
	public List<Statistics> DashboradSellerProductsByReviewsAverage(String id) {
		List<Statistics> result = new ArrayList<Statistics>();
		List<Product> products =this.productRepository.findBySellerAndDeleted(id, false);
		for (int i=0 ; i< products.size();i++) {
			Integer avearge  = this.averageReviewsByProduct(products.get(i).getId());
			Statistics obj = new Statistics(products.get(i).getDesignation(),avearge);
		      result.add(obj);
			}
		

		return result;
	}
	/* Image */
	
	/*
	* Method for adding a new image to an existing product
	*/
	@PostMapping("/saveImage")
	public Image saveImage(@RequestBody Image image){
		return imageRepository.save(image);
		
	}
	/*
	* Method for listing all images
	*/
	@RequestMapping("/allImages")
	public List<Image> getImages(){
		return imageRepository.findAll();
		
	}
	
  /* Review */
	
	/*
	* Method for adding a new Review to an existing product
	*/
	@PostMapping("/saveReview")
	public Review saveReview(@Valid @RequestBody Review review){
		return reviewRepository.save(review);
		
	}
	/*
	* Method for listing reviews of a customer 
	*/
	@RequestMapping("/reviewsByCustomer/{id}")
	public List<Review> getReviwesByCustomer(@PathVariable("id") String id){
		return reviewRepository.findByCustomer(id);
		
	}
	/*
	* Method for calculating the average of reviews for a product
	*/
	@RequestMapping("/averageReviewsByProduct/{id}")
	public Integer averageReviewsByProduct(@PathVariable("id") String id){
		Integer average=0;
		 List<Review> reviews = reviewRepository.findByProduct(id);
		 for(int i=0;i<reviews.size();i++) {
			 average+=reviews.get(i).getNote();
		 }
		 if(average !=0) {
			 average=(Integer) average /(Integer) reviews.size();
		 }
		return (Integer)average;
		
	}
}
