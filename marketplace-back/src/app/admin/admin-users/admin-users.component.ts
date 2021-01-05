import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/_services/admin/admin.service';
import { Admin } from 'src/app/_models/admin';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { timeout } from 'q';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  @ViewChild('frame') public contentModal;
  @ViewChild('form') public formModal;
 admins:Admin[]=[];
 selectedadmin:Admin=new Admin();
 newUserFormGroup : FormGroup;
 addSuccess:Boolean=false;
 
  constructor(private adminService:AdminService) {
    this.newUserFormGroupBuild();
   }

  ngOnInit() {
    this.getAdmins();
  }
  getAdmins(){
    this.adminService.allAdmin().subscribe(admins=>{
      this.admins=admins;
      console.log(admins);
    });
  }
  newUserFormGroupBuild(){
    this.newUserFormGroup = new FormGroup({
    firstname: new FormControl('',[Validators.required,Validators.maxLength(10)]),
    lastname: new FormControl('',{
      validators:  [Validators.required,Validators.maxLength(10)],
     updateOn: 'blur'
    }),
    mail: new FormControl('', {
      validators:  [Validators.required,Validators.email],
     updateOn: 'blur'
    }),
    password: new FormControl('',{
      validators:  [ Validators.required, Validators.minLength(8)],
     updateOn: 'blur'
    }),

   });
 }
 addUser(){
  let admin  =  new Admin( this.newUserFormGroup.value ) ;
  this.newUserFormGroupBuild();
  admin.isActive=false;
  this.adminService.addAdmin(admin).subscribe(admin =>
    { console.log(admin);
      this.getAdmins();
      this.formModal.hide();
      this.addSuccess=true;
      setTimeout(() => {
        this.addSuccess=false
      }, 10000);
     }
      ); 
 }
 updateUser(active){
  this.selectedadmin.isActive=active;
  this.adminService.addAdmin(this.selectedadmin).subscribe(admin =>
    { console.log(admin);
      this.getAdmins();
      this.show(this.selectedadmin);
     }
      );
 }
 deleteUser(idAdmin){
   this.adminService.deleteAdmin(idAdmin).subscribe(admin=>{
     this.getAdmins();
   })
 }
  show(admin){
    this.adminService.getAdmin(admin.id).subscribe(admin=>{
      if(admin!=null){
      this.selectedadmin=admin;
      this.contentModal.show();
      }
    });
  }

}
