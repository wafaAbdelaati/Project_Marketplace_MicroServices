package com.order.app.entites;

import java.util.List;

public class Statistics {
    private String label;
    private Object value;
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	public Object getValue() {
		return value;
	}
	public void setValue(Object value) {
		this.value = value;
	}
	public Statistics(String label, Object value) {
		this.label = label;
		this.value = value;
	}
	
	
	public static double getSum(List<OrderDetail> details ) {
		double sum=0;
		for(int i=0;i<details.size();i++) {
			sum+=details.get(i).getApprovedPrice()*details.get(i).getQuantity();
		}
		return sum;
	}
	

}
