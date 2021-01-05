import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/_services/order/order.service';
import { State } from 'src/app/_models/order';
import { DatePipe } from '@angular/common';
import { ProductService } from 'src/app/_services/product/product.service';


@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss']
})
export class SellerHomeComponent implements OnInit {
  ok=false;
  public chartType: string = 'bar';
public chartDatasets: Array<any> = [ { data: [], label: 'Commande par Etat' } ];
public chartLabels: Array<any> = [];
public chartDatasets2: Array<any> = [ { data: [], label: 'Montant par commande' } ];
public chartLabels2: Array<any> = [];
public chartDatasets3: Array<any> = [ { data: [], label: 'Note par produit' } ];
public chartLabels3: Array<any> = [];
public chartDatasets4: Array<any> = [ { data: [], label: 'Avis par produit' } ];
public chartLabels4: Array<any> = [];

public chartColors: Array<any> = [
    { backgroundColor: ['rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)','rgba(255, 206, 86, 0.2)','rgba(75, 192, 192, 0.2)' ],
      borderColor: [ 'rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)'],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {responsive: true};
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
  constructor(private orderService:OrderService,public datepipe: DatePipe,private productService:ProductService) { }

  ngOnInit() {
    this.orderService.DashboradSellerOrdersByState().subscribe(res=>{
      this.chartDatasets[0].data=res.map(item=>{return item['value']})
      this.chartLabels=res.map(item=>{return item['label']})
    });
    this.orderService.DashboradSellerOrdersByAmount().subscribe(res=>{
      this.chartDatasets2[0].data=res.map(item=>{return item['value']})
      this.chartLabels2=res.map(item=>{return item['label']})
    });
    this.productService.DashboradSellerProductsByReviewsAverage().subscribe(res=>{
      this.chartDatasets3[0].data=res.map(item=>{return item['value']})
      this.chartLabels3=res.map(item=>{return item['label']})
    });
    this.productService.DashboradSellerProductsByReviews().subscribe(res=>{
      this.chartDatasets4[0].data=res.map(item=>{return item['value']})
      this.chartLabels4=res.map(item=>{return item['label']})
    });
  }
 

  

}
