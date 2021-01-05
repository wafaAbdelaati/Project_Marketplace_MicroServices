import { Component, OnInit } from '@angular/core';
import { Product, PriceHistoryItem } from 'src/app/_models/product';
import { ProductService } from 'src/app/_services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { Feature } from 'src/app/_models/feature';
import { FeatureService } from 'src/app/_services/feature/feature.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.scss']
})
export class SellerUpdateProductComponent implements OnInit {
  updateSuccess:boolean=false;
  product:Product = new Product();
  collapse:number=1;
  chart:boolean=false;
  public chartType: string = 'line';
  public chartDatasets: Array<any> = [{ data: [], label: 'Prix' }];
  public chartLabels: Array<any> = [];
  public chartColors: Array<any> = [{ backgroundColor: 'rgba(0, 137, 132, .2)',borderColor: 'rgba(0, 10, 130, .7)', borderWidth: 2,} ];
  public chartOptions: any = {responsive: true};
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
  constructor(public datepipe: DatePipe,private productService:ProductService,private featureService :FeatureService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.chart=false;
    this.chartDatasets = [{ data: [], label: 'Prix' }];
    this.chartLabels= [];
    this.getProduct();
  }
  show(){
    this.updateSuccess=true;
        setTimeout(() => {
          this.updateSuccess=false;
        }, 10000);
  }
  addFeature(){
    this.product.features[this.product.features.length]=new Feature();
  }
  saveFeature(feature:Feature){
    if(feature.id === undefined){
      feature.product=this.product.id;
    } 
    this.featureService.saveFeature(feature).subscribe(feature=>{
      this.show();
      this.ngOnInit()})
  
  }
  saveProduct(){
    delete this.product.reviews;
    delete this.product.features;
    delete this.product.images;
    this.productService.saveProduct(this.product).subscribe(product=>{
      this.show();
      this.ngOnInit()})
  }
  savePrice(){
    var now = new Date().toJSON();
    let historyItem = new PriceHistoryItem(this.product.price,now);
    this.product.priceHistory.push(historyItem);
    this.saveProduct();
  }
  readUrlParams(callback) {
    this.route.queryParams.subscribe(queryParams => {
      this.route.params.subscribe(routeParams => {
        callback(routeParams, queryParams);
      });
    });
  }
  getProduct(){
    this.readUrlParams((routeParams, queryParams) => {
      let id = routeParams.id;
      this.productService.getProduct(id).subscribe(product=>{
        this.product=product;
       
        this.product.priceHistory.forEach(item=>{
          this.chartLabels.push(this.datepipe.transform(item.updateDate, 'fullDate'))
          this.chartDatasets[0].data.push(item.price)
        });
        this.chart=true;
      });
    });
  }
}
