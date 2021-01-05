package com.category.app.controllers;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.category.app.dao.CategoryRepoitory;
import com.category.app.dao.IProduct;
import com.category.app.dao.SubCategoryRepository;
import com.category.app.entities.Category;
import com.category.app.entities.SubCategory;
import com.category.app.entities.QCategory;
import com.category.app.entities.Statistics;
import com.category.app.exceptions.CategoryNotFoundException;
import com.querydsl.core.types.dsl.BooleanExpression;

@RestController
public class CategoryController {

	@Autowired
	private CategoryRepoitory categoryRepository;

	@Autowired
	private SubCategoryRepository subCategoryRepository;

	@Autowired
	private IProduct iProduct;
	
	QCategory qCategory = new QCategory("category");
    
	/*
	 * Method for adding a new category
	 */
	@PostMapping("/addCategory")
	public Category addCategory(@Valid @RequestBody Category category) {
		List<SubCategory> subCategories = category.getSubCategories();
		category.setSubCategories(null);
		Category newCategory = categoryRepository.save(category);
		for (int i=0 ; i< subCategories.size();i++) {
			// set the category generated id for each subCategory
			subCategories.get(i).setCategory(newCategory.getId());	
		}
		subCategoryRepository.saveAll(subCategories);
		return newCategory;

	}
	/*
	 * Method for updating a category
	 */
	@PostMapping("/saveCategory")
	public Category saveCategory(@Valid @RequestBody Category category) {
		
		return categoryRepository.save(category);

	}
	/*
	 * Method for calculating the number of  products for each category - Statistics 
	 */
	@RequestMapping("/DashboradProductsByCategories")
	public List<Statistics> DashboradProductsByCategories() {
		List<Statistics> result = new ArrayList<Statistics>();
		List<Category> categories = categoryRepository.findAll();
		for (int i=0 ; i< categories.size();i++) {
			List<Object> products = iProduct.getProductsForCategory(categories.get(i).getId());
			Statistics obj = new Statistics(categories.get(i).getName(),products.size());
		      result.add(obj);
			}

		return result;
	}
	/*
	 *   Method for calculating the number of  subCategories for each category - Statistics 
	 */
	@RequestMapping("/DashboradSubCategoriesByCategories")
	public List<Statistics> DashboradSubCategoriesByCategories() {
		List<Statistics> result = new ArrayList<Statistics>();
		
		List<Category> categories = categoryRepository.findAll();
		for (int i=0 ; i< categories.size();i++) {
			List<SubCategory> subCategories = subCategoryRepository.findByCategory(categories.get(i).getId());
			Statistics obj = new Statistics(categories.get(i).getName(),subCategories.size());
		      result.add(obj);
			}
       
		return result;
	}
	/*
	 * Method to  retrieve one category by Id
	 */
	@RequestMapping("/getCategory/{id}")
	public Optional<Category> getCategory(@PathVariable("id") String id) {

		Optional<Category> category = categoryRepository.findById(id);
		List<SubCategory> subCategories = subCategoryRepository.findByCategory(id);
		List<Object> products = iProduct.getProductsForCategory(id);
		category.get().setProducts(products);
		category.get().setSubCategories(subCategories);
		return category;
	}
	/*
	 * Method to retrieve one category by  id - Products By Page
	 */
	@RequestMapping("/getCategory/{id}/{page}/{sort}/{dir}")
	public Optional<Category> getCategory(@PathVariable("id") String id,@PathVariable("page") int page,@PathVariable("sort") String sort,@PathVariable("dir") String dir) {

		Optional<Category> category = categoryRepository.findById(id);
		List<SubCategory> subCategories = subCategoryRepository.findByCategory(id);
		Object productsPage = iProduct.getProductsForCategory(id,page,sort,dir);
		category.get().setProductsPage(productsPage);
		category.get().setSubCategories(subCategories);
		return category;
	}
	/*  Method to retrieve categories that has products filtered by Keyword   */
	@RequestMapping("/filterByKeyword/{keyWord}")
	public List<Category> filterBykeyWord(@PathVariable("keyWord") String keyWord){
		
		List<String> ids = iProduct.getCategoriesIdByKeyword(keyWord);
		BooleanExpression  filterByKeyWord = this.qCategory.id.in(ids);
		List<Category> categories =(List<Category>) categoryRepository.findAll((filterByKeyWord));
		for (int i=0 ; i< categories.size();i++) {
		    Object productsPage = iProduct.getProductsByKeyWord(keyWord, categories.get(i).getId(), 0);
			categories.get(i).setProductsPage(productsPage);
			List<SubCategory> subCategories = subCategoryRepository.findByCategory(categories.get(i).getId());
			categories.get(i).setSubCategories(subCategories);
			}
		return categories ;
	}
	/*  Method to retrieve categories that has products filtered by Keyword - Products By Page   */
	@RequestMapping("/filterByKeywordAndCategory/{keyWord}/{id}/{page}")
	public Optional<Category> filterBykeyWordAndCategory(@PathVariable("keyWord") String keyWord ,@PathVariable("id") String id,@PathVariable("page") int page){
		
		Optional<Category> category = categoryRepository.findById(id);
		List<SubCategory> subCategories = subCategoryRepository.findByCategory(id);
		Object productsPage = iProduct.getProductsByKeyWord(keyWord, id, page);
		category.get().setProductsPage(productsPage);
		category.get().setSubCategories(subCategories);
		return category ;
	}
	
	/*
	 * Method to add an existing category to home page menu
	 */
	@RequestMapping("/addCategoryToMenu")
	public Category addCategoryToMenu(String id,Boolean inhome) {
       if(inhome) {
    	   Long categoriesInMenu = categoryRepository.countByInHome(true);
   		if (categoriesInMenu == 16) {
   			return null;
   		} 
       }
		Optional<Category> category = categoryRepository.findById(id);
		category.get().setInHome(inhome);

		return categoryRepository.save(category.get());
	}

	/*
	 * Method to retrieve the list of categories by ids
	 */
	@RequestMapping("CategoriesByIds")
	public List<Category> getCategoriesByIds(String ids) {
		List<String> idList = Arrays.asList(ids.split(",")); 
		List<Category> categories = (List<Category>) categoryRepository.findAllById(idList);
		
		return categories;
	}
	/*
	 * Method to retrieve the list of SubCategories by ids
	 */
	@RequestMapping("SubCategoriesByIds")
	public List<SubCategory> getSubCategoriesByIds(String ids) {
		List<String> idList = Arrays.asList(ids.split(",")); 
		List<SubCategory> subcategories = (List<SubCategory>) subCategoryRepository.findAllById(idList);
		
		return subcategories;
	}
	/*
	 * Method for listing all categories
	 */
	@RequestMapping("/allCategories")
	public List<Category> getCategories() {
		List<Category> categories = categoryRepository.findAll();
		if (categories.isEmpty())
			throw new CategoryNotFoundException("Aucune categorie n'est disponible");
		return categories;
	}
	/*
	 * Method for listing all categories in the menu
	 */
	@RequestMapping("/allCategoriesInMenu")
	public List<Category> getCategoriesInMenu() {
		List<Category> categories = categoryRepository.findByInHome(true);
		return categories;
	}
	/*
	 * Method for listing all categories not  in the menu
	 */
	@RequestMapping("/allCategoriesNotInMenu")
	public List<Category> getCategoriesNotInMenu() {
		List<Category> categories = categoryRepository.findByInHome(false);
		return categories;
	}
	/*
	 * Method of adding a new sub category to a category
	 */
	@PostMapping("/saveSubCategory")
	public SubCategory saveSubCategory(@Valid @RequestBody SubCategory subCategory) {
		Category category = categoryRepository.findById(subCategory.getCategory()).orElse(null);
		if (category == null)
			throw new CategoryNotFoundException(
					"La categorie correspondante à l'id " + subCategory.getCategory() + " n'existe pas");
		return subCategoryRepository.save(subCategory);

	}

	/*
	 * Method to retrieve a sub-category by  id
	 */
	@RequestMapping("/getSubCategory/{id}")
	public Optional<SubCategory> getSubCategory(@PathVariable("id") String id) {

		Optional<SubCategory> subCategory = subCategoryRepository.findById(id);
		List<Object> products = iProduct.getProducts(id);
		subCategory.get().setProducts(products);
		return subCategory;
	}
	/*
	 * Method to retrieve a sub-category by  id - Products By Page
	 */
	@RequestMapping("/getSubCategory/{id}/{page}/{sort}/{dir}")
	public Optional<SubCategory> getSubCategory(@PathVariable("id") String id,@PathVariable("page") int page,@PathVariable("sort") String sort,@PathVariable("dir") String dir) {

		Optional<SubCategory> subCategory = subCategoryRepository.findById(id);
		Object productsPage = iProduct.getProducts(id,page,sort,dir);
			subCategory.get().setProductsPage(productsPage);
		return subCategory;
	}

	/*
	 * Method for listing all sub categories belonging to a given category
	 */
	@RequestMapping("/getByCategory/{id}")
	public List<SubCategory> getByCategory(@PathVariable("id") String id) {

		List<SubCategory> subCategories = subCategoryRepository.findByCategory(id);

		return subCategories;
	}

	/*
	 * Method for listing all sub categories
	 */
	@RequestMapping("/allSubCategories")
	public List<SubCategory> getSubCategories() {
		List<SubCategory> subCatgories = subCategoryRepository.findAll();
		if (subCatgories.isEmpty())
			throw new CategoryNotFoundException("Aucune sous categorie n'est disponible");
		return subCatgories;
	}
	/*
	 * Method for deleting a subCategory
	 */
	@DeleteMapping("/deleteSubCategory")
	public Boolean deleteSubCategory(String id ) {
		subCategoryRepository.deleteById(id);
	
		return true;
	}
	/*
	 * Method for deleting a Category
	 */
	@DeleteMapping("/deleteCategory")
	public Boolean deleteCategory(String id ) {
		categoryRepository.deleteById(id);
		subCategoryRepository.deleteByCategory(id);
	
		return true;
	}
}
