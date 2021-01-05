import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/_services/login/login.service';

@Component({
  selector: 'seller-header',
  templateUrl: './seller-header.component.html',
  styleUrls: ['./seller-header.component.scss']
})
export class SellerHeaderComponent implements OnInit {

  constructor(private loginService:LoginService) { }

  ngOnInit() {
  }
  logout(){
    this.loginService.logoutSeller();
    }

}
