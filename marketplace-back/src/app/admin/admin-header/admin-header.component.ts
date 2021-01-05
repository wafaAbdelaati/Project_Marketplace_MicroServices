import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/_services/login/login.service';
import { Admin } from 'src/app/_models/admin';

@Component({
  selector: 'admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
 role:String="";
  constructor(private loginService:LoginService) { }

  ngOnInit() {
    this.role=this.loginService.getAdmin().role;
  }
  logout(){
  this.loginService.logout();
  }

}
