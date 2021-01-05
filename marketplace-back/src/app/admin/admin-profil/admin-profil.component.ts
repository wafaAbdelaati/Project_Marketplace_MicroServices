import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/_services/login/login.service';
import { Admin } from 'src/app/_models/admin';
import { AdminService } from 'src/app/_services/admin/admin.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin-profil',
  templateUrl: './admin-profil.component.html',
  styleUrls: ['./admin-profil.component.scss']
})
export class AdminProfilComponent implements OnInit {

  constructor(private loginService : LoginService ,private adminService:AdminService) { }
  admin:Admin = new Admin();
  settingFormGroup : FormGroup ;
  passwordUpdate:Boolean=false;
  ngOnInit() {
    this.settingFormGroupBuild();
    this.adminService.getAdmin(this.loginService.getAdmin().id).subscribe(admin => {
      console.log(admin)
      this.admin = admin;this.settingFormGroupBuild();
    });
  }
  settingFormGroupBuild(){
    this.settingFormGroup = new FormGroup({
    firstname: new FormControl(this.admin.firstname),
    lastname: new FormControl(this.admin.lastname),
    phoneNumber: new FormControl(this.admin.phoneNumber),
    mail: new FormControl({value: this.admin.mail, disabled: true}),
    birthDate: new FormControl(this.admin.birthDate),
    address: new FormControl(this.admin.address),
    password: new FormControl('')
 
   });
  }
  change(){
    
   this.passwordUpdate = true;
  }
  update(){
    if(!this.passwordUpdate){this.settingFormGroup.value.password = this.admin.password}
    this.admin = Object.assign(this.admin,new Admin( this.settingFormGroup.value ) ) ;
    (this.admin.role === 'super-admin')?
    this.adminService.addSuperAdmin(this.admin).subscribe(admin => this.loginService.login(admin,this.loginService.rememberMe(),false)):
    this.adminService.addAdmin(this.admin).subscribe(admin => this.loginService.login(admin,this.loginService.rememberMe(),false));
  }

}
