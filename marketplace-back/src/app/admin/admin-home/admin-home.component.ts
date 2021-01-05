import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/_services/category/category.service';
import { SellerService } from 'src/app/_services/seller/seller.service';
import { CustomerService } from 'src/app/_services/customer/customer.service';
import { ProductService } from 'src/app/_services/product/product.service';
import { OrderService } from 'src/app/_services/order/order.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
public customersCount:number=0;
public sellersCount:number=0;
public productsCount:number=0;
public ordersCount:number=0;
  ok=false;
  public chartType: string = 'polarArea';
public chartDatasets: Array<any> = [  { data: [], label: '' } ];
public chartLabels: Array<any> = [];
public chartDatasets2: Array<any> = [ { data: [], label: '' } ];
public chartLabels2: Array<any> = [];
public chartDatasets3: Array<any> = [ { data: [], label: 'Produits par Vendeur' } ];
public chartLabels3: Array<any> = [];
public chartDatasets4: Array<any> = [ { data: [], label: 'Commandes par Vendeur' } ];
public chartLabels4: Array<any> = [];
public chartDatasets5: Array<any> = [ { data: [], label: 'Commandes par Client' } ];
public chartLabels5: Array<any> = [];
public chartDatasets6: Array<any> = [ { data: [], label: 'Avis par Client' } ];
public chartLabels6: Array<any> = [];
public chartColors: Array<any> = [
  { backgroundColor: ['rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)','rgba(255, 206, 86, 0.2)','rgba(75, 192, 192, 0.2)' ],
    borderColor: [ 'rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)'],
    borderWidth: 2,
  }
];

public chartOptions: any = {responsive: true};
public chartClicked(e: any): void { }
public chartHovered(e: any): void { }
  constructor(private catgeoryService:CategoryService,private sellerService:SellerService,private customerService:CustomerService,
    private productService:ProductService,private orderService:OrderService) { }

  ngOnInit() {
    this.catgeoryService.DashboradProductsByCategories().subscribe(res=>{
      this.chartDatasets[0].data=res.map(item=>{return item['value']})
      this.chartLabels=res.map(item=>{return item['label']})
    });
    this.catgeoryService.DashboradSubCategoriesByCategories().subscribe(res=>{
      this.chartDatasets2[0].data=res.map(item=>{return item['value']})
      this.chartLabels2=res.map(item=>{return item['label']})
    });
    this.sellerService.DashboradProductsBySellers().subscribe(res=>{
      this.chartDatasets3[0].data=res.map(item=>{return item['value']})
      this.chartLabels3=res.map(item=>{return item['label']})
    });
    this.sellerService.DashboradOrdersBySellers().subscribe(res=>{
      this.chartDatasets4[0].data=res.map(item=>{return item['value']})
      this.chartLabels4=res.map(item=>{return item['label']})
    });
    this.customerService.DashboradOrdersByCustomers().subscribe(res=>{
      this.chartDatasets5[0].data=res.map(item=>{return item['value']})
      this.chartLabels5=res.map(item=>{return item['label']})
    });
    this.customerService.DashboradReviewsByCustomers().subscribe(res=>{
      this.chartDatasets6[0].data=res.map(item=>{return item['value']})
      this.chartLabels6=res.map(item=>{return item['label']})
    });
    this.sellerService.DashboradSellersCount().subscribe(res=>{
      this.sellersCount=res;
    });
    this.customerService.DashboradCustomersCount().subscribe(res=>{
      this.customersCount=res;
    });
    this.productService.DashboradProductsCount().subscribe(res=>{
      this.productsCount=res;
    });
    this.orderService.DashboradOrdersCount().subscribe(res=>{
      this.ordersCount=res;
    });

  }

}
