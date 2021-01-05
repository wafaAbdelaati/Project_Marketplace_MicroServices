package com.order.app.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.order.app.dao.IProduct;
import com.order.app.dao.OrderDetailRepository;
import com.order.app.dao.OrderRepository;
import com.order.app.entites.*;
import com.querydsl.core.types.dsl.BooleanExpression;


@RestController
public class OrderController {

	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired
	private OrderDetailRepository orderDetailRepository;	
	
	@Autowired
	private IProduct iProduct;
	
	QOrder qOrder = new QOrder("order");
	
	
	
	/*
	 * Method to count orders 
	 */
	@RequestMapping("/OrderCount")
	public String Count() {
		return  "Le nombre des commandes est"+orderRepository.count()	;
	}
	/*
	 * Method for adding a new Order
	 */
	@PostMapping("/saveOrder")
	public Order saveOrder(@Valid @RequestBody Order order) {
		try {
        // get the order's details list 
		List<OrderDetail> details = order.getDetails();
		// set the order's details list to null (So that dosen't be save)
		order.setDetails(null);
		// calculate the amount
		double amount = 0;
		for (int i=0 ; i< details.size();i++) {
			amount+=(details.get(i).getApprovedPrice())*(details.get(i).getQuantity());	
		}
		order.setAmount(amount);
		// save the order
		Order newOrder = orderRepository.save(order);
		
		for (int i=0 ; i< details.size();i++) {
			// set the order's generated id for each detail
			details.get(i).setOrder(newOrder.getId());	
		}
		
		// save the order's details
		orderDetailRepository.saveAll(details);
		return newOrder;
		}
		catch(Exception e) {
			return null;
		}
	}
	/*
	 * Method to update an order
	 */
	@PostMapping("/updateOrder")
	public boolean updateOrder(@RequestBody OrderDetail orderDetail){
		// update 
		orderDetailRepository.save(orderDetail);
		Optional<Order> order = orderRepository.findById(orderDetail.getOrder());
		// get the order's details
				List<OrderDetail> details = orderDetailRepository.findByOrder(order.get().getId());
		// calculate the amount
		double amount = 0;
		for (int i=0 ; i< details.size();i++) {
			amount+=(details.get(i).getApprovedPrice())*(details.get(i).getQuantity());	
		}
		order.get().setAmount(amount);
		// save the order
		orderRepository.save(order.get());
		//update
		return true;
		

	}
	/*
	 * Method to update an order'state
	 */
	@RequestMapping("/updateOrderState")
	public Order updateOrderState(String id,String state){
		//get the order by id
		Optional<Order> order = orderRepository.findById(id);
		//set the order's state
		order.get().setState(state);
		//update
		return orderRepository.save(order.get());
		

	}
	/*
	 * Method to update an order'detail state
	 */
	@RequestMapping("/updateOrderDetailState")
	public boolean updateOrderDetailState(String id,String state){
		//get the order's detail by id
		Optional<OrderDetail> orderDetail = orderDetailRepository.findById(id);
		//set the order's  detail state
		orderDetail.get().setState(state);
		orderDetailRepository.save(orderDetail.get());
		//update the order's state
		Optional<Order> order = orderRepository.findById(orderDetail.get().getOrder());
		 Long count = orderDetailRepository.countByOrderAndState(order.get().getId(), order.get().getState());
		
		 if(count == 0) {
			 order.get().setState(state);
			 orderRepository.save(order.get());
		 }
		return  true;

	}
	/*
	 * Method for listing all orders
	 */
	@RequestMapping("/allOrders")
	public List<Order> getOrders() {
		// get all the orders 
		List<Order> orders = orderRepository.findAll();
		for (int i=0 ; i< orders.size();i++) {
			//get the order's detail for each order
			List<OrderDetail> details = orderDetailRepository.findByOrder(orders.get(i).getId());
			//set the order's detail for each order
			orders.get(i).setDetails(details);
		}
		//return the list of orders
		return orders;

	}
	/*
	 * Method to retrieve an order by id
	 */
	@RequestMapping("/getOrder/{id}")
	public Optional<Order> getOrder(@PathVariable("id") String id){
		//get the order by id
		Optional<Order> order = orderRepository.findById(id);
		// get the order's details
		List<OrderDetail> details = orderDetailRepository.findByOrder(order.get().getId());
		//set the order's details
		order.get().setDetails(details);
		//return the order
		return order;

	}
	/*
	 * Method to delete an order 
	 */
	@RequestMapping("/deleteOrder/{id}")
	public void deleteOrder(@PathVariable("id") String id){
		//get the order by id
		Optional<Order> order = orderRepository.findById(id);
		// get the order's details
		List<OrderDetail> details = orderDetailRepository.findByOrder(order.get().getId());
		// update products quantity
		for (int i=0 ; i< details.size();i++) {
			iProduct.updateProductQuantity(details.get(i).getProduct(), details.get(i).getQuantity(), false);
		}
		//delete order
		orderDetailRepository.deleteAll(details);
		orderRepository.delete(order.get());

	}
	/*
	 * Method to delete an order's detail
	 */
	@RequestMapping("/deleteOrderDetail/{id}")
	public void deleteOrderDetail(@PathVariable("id") String id){
		//get the order and the order's details by id
		Optional<OrderDetail> orderDetail = orderDetailRepository.findById(id);
		Optional<Order> order = orderRepository.findById(orderDetail.get().getOrder());
		// update the order's amount
		double amount = order.get().getAmount() - orderDetail.get().getApprovedPrice()*orderDetail.get().getQuantity();
		order.get().setAmount(amount);
		orderRepository.save(order.get());

		//delete the order'detail
		orderDetailRepository.delete(orderDetail.get());
		
		// update the product quantity
		iProduct.updateProductQuantity(orderDetail.get().getProduct(), orderDetail.get().getQuantity(), false);


	}
	/*
	 * Method for listing all orders by customer's id
	 */
	@RequestMapping("/OrdersByCustomer/{id}")
	public List<Order> getOrdersByCustomer(@PathVariable("id") String id) {
		//get the orders of a specific customer
		List<Order> orders = orderRepository.findByCustomer(id);
		for (int i=0 ; i< orders.size();i++) {
			//get the order's detail for each order
			List<OrderDetail> details = orderDetailRepository.findByOrder(orders.get(i).getId());
			//set the order's detail for each order
			orders.get(i).setDetails(details);
		}
		//return the list of orders
		return orders;

	}
	/*
	 * Method for listing all orders by seller's id
	 */
	@RequestMapping("/OrdersBySeller/{id}")
	public List<Order> getOrdersBySeller(@PathVariable("id") String id) {
		//get all order's details of a specific seller
		List<OrderDetail> alldetails = (List<OrderDetail>)orderDetailRepository.findBySeller(id);
		// Retrieve ids of orders f
		List<String> ids = alldetails.stream().map(OrderDetail::getOrder).collect(Collectors.toList());
		//get the orders by ids
		List<Order> orders = (List<Order>) orderRepository.findAllById(ids);
		for (int i=0 ; i< orders.size();i++) {
			//get the order's detail for each order
			List<OrderDetail> details = orderDetailRepository.findBySellerAndOrder(id, orders.get(i).getId());
			//set the order's detail for each order
			orders.get(i).setDetails(details);
		}
		//return the list of orders
		return orders;

	}
	/*
	 * Method for getting an order by seller's id
	 */
	@RequestMapping("/OrderBySeller")
	public Optional<Order> getOrderBySeller(String id,String seller) {

		Optional<Order> order =  orderRepository.findById(id);
		
			//get the order's detail 
			List<OrderDetail> details = orderDetailRepository.findBySellerAndOrder(seller, order.get().getId());
			//set the order's detail 
			order.get().setDetails(details);
		
		//return the order
		return order;

	}
	/*
	 * Method for getting order's count - statistics
	 */
	@RequestMapping("/DashboradOrdersCount")
	public long DashboradOrdersCount() {
		return  orderRepository.count()	;
	}
	/*
	 * Method for getting seller's orders count by State  - statistics
	 */
	@RequestMapping("/DashboradSellerOrdersByState")
	public List<Statistics> DashboradSellerOrdersByState(String id) {
		List<Statistics> result = new ArrayList<Statistics>();
		//get all order's details of a specific seller
		List<OrderDetail> alldetails = (List<OrderDetail>)orderDetailRepository.findBySeller(id);
		List<String> ids = alldetails.stream().map(OrderDetail::getOrder).collect(Collectors.toList());
		Map<String, String> mymap = new HashMap<String, String>() {
			{
				put("init", "En cours de negociation");
				put("progress", "En cours");
				put("validated", "Validée");
				put("ended", "Archivée");
			}
		};
		for (Map.Entry<String, String> entry : mymap.entrySet()) {
			BooleanExpression  expression = this.qOrder.id.in(ids);
			BooleanExpression  expression2 = this.qOrder.state.eq(entry.getKey());
			long count = orderRepository.count(expression.and(expression2));
			Statistics obj = new Statistics(entry.getValue(),count);
		      result.add(obj);
		}   		
		return result;
	}
	/*
	 * Method for getting seller's orders count by Amount  - statistics
	 */
	@RequestMapping("/DashboradSellerOrdersByAmount")
	public List<Statistics> DashboradSellerOrdersByAmount(String id) {
		List<Statistics> result = new ArrayList<Statistics>();
		//get all order's details of a specific seller
		List<Order> orders = this.getOrdersBySeller(id);
		 for(int i=0;i<orders.size();i++) {
			 Statistics obj = new Statistics("Commande "+(i+1),Statistics.getSum(orders.get(i).getDetails()));
		      result.add(obj); 
		 }
		
		return result;
	}
}
