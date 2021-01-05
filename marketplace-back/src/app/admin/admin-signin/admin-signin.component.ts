import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_services/admin/admin.service';
import { Admin } from 'src/app/_models/admin';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/_services/login/login.service';

@Component({
  selector: 'app-admin-signin',
  templateUrl: './admin-signin.component.html',
  styleUrls: ['./admin-signin.component.scss']
})
export class AdminSigninComponent implements OnInit {
  first:boolean = false ;
  error:boolean=false;
  error2:boolean=false;
  superAdmin:Admin = new Admin();
  signinFormGroup : FormGroup;
  signupFormGroup : FormGroup;
  constructor(private adminService:AdminService,private loginService:LoginService) { }

  ngOnInit() {
    
    this.adminService.getSuperAdmin().subscribe(admin=> {
      console.log(admin);
      (admin==null)?this.first=true:this.first=false;
    });
   this.signupFormGroupBuild();
   this.signinFormGroupBuild();
  }
  signinFormGroupBuild(){
     this.signinFormGroup = new FormGroup({
      mail: new FormControl(''),
      password: new FormControl(''),
    });

  
  }
  signupFormGroupBuild(){
    this.signupFormGroup = new FormGroup({
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
 signin(){
  this.error = false;
  this.error2=false;
 let admin  =  new Admin( this.signinFormGroup.value ) ;
  this.adminService.FindAdmin(admin).subscribe(admin =>{ 
    console.log(admin);
  if (admin != null){
    if(admin.isActive === false){this.error2=true;}
    else{this.loginService.login(admin,false,true);}
    }
  else { this.error=true;} 
  
  })
}
signup(){
  let admin  =  new Admin( this.signupFormGroup.value ) ;
  this.adminService.addSuperAdmin(admin).subscribe(admin =>
    { console.log(admin);
      this.loginService.login(admin,false,true )
     }
      ); 
  
}
}
