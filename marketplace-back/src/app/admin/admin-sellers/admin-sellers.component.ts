import { Component, OnInit, ViewChild } from '@angular/core';
import { SellerService } from 'src/app/_services/seller/seller.service';
import { Seller } from 'src/app/_models/seller';

@Component({
  selector: 'app-admin-sellers',
  templateUrl: './admin-sellers.component.html',
  styleUrls: ['./admin-sellers.component.scss']
})
export class AdminSellersComponent implements OnInit {
  @ViewChild('frame') public contentModal;
  sellers:Seller[]=[];
  selectedSeller:Seller=new Seller();
  constructor(private sellerService:SellerService) { }

  ngOnInit() {
    this.getSellers();
  }
  getSellers(){
    this.sellerService.allSellers().subscribe(sellers=>{
      this.sellers=sellers
    })
  }
  show(seller){
    this.sellerService.getSeller(seller.id).subscribe(seller=>{
      this.selectedSeller=seller;
    this.contentModal.show();
    });
    
  }
  change(active){
    this.sellerService.updateSellerAccount(this.selectedSeller.id,active).subscribe(seller=>{
      this.getSellers();
      this.show(this.selectedSeller)
    });
  }

}
