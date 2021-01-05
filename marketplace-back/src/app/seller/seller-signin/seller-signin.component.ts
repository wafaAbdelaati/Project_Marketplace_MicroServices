import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Seller } from 'src/app/_models/seller';
import { SellerService } from 'src/app/_services/seller/seller.service';
import { LoginService } from 'src/app/_services/login/login.service';
import { CustomValidators } from 'src/app/_Validators/custom-validators';

@Component({
  selector: 'app-seller-signin',
  templateUrl: './seller-signin.component.html',
  styleUrls: ['./seller-signin.component.scss']
})
export class SellerSigninComponent implements OnInit {
  @ViewChild('alert') alert: ElementRef;
  success:boolean=false;
  signup:boolean=false;
  error:boolean=false;
  error2:boolean=false;
  signinFormGroup : FormGroup;
  signupFormGroup : FormGroup;
  constructor(private sellerService:SellerService,private loginService:LoginService) { }

  ngOnInit() {
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
   phoneNumber: new FormControl('',{
    validators:  [Validators.required,Validators.maxLength(8), CustomValidators.patternValidator(/\d/, {hasNumber: true})]
  }),
   mail: new FormControl('', {
     validators:  [Validators.required,Validators.email],
    updateOn: 'blur'
   }),
   password: new FormControl('',{
     validators:  [ Validators.required, Validators.minLength(8), CustomValidators.patternValidator(/\d/, {hasNumber: true}),
      CustomValidators.patternValidator(/[a-zA-Z]/, { hasSmallCase: true}),],
    updateOn: 'blur'
   }),
   isActive: new FormControl(false),
   

  });
}
signin(){
  this.error = false;this.error2=false;
  let seller = new Seller(this.signinFormGroup.value);
   
  this.sellerService.findSeller(seller).subscribe(seller =>{ 
    console.log(seller);
  if (seller != null){
    if(seller.isActive === false){this.error2=true;}
    else{this.loginService.loginSeller(seller,false,true); this.signinFormGroupBuild();}
    }
  else { this.error=true;} 
  
  })
}
signUp(){
  let seller  =  new Seller( this.signupFormGroup.value ) ;
  this.signupFormGroupBuild();
  this.sellerService.addSeller(seller).subscribe(seller =>
    { console.log(seller);
      this.success=true;
     }
      ); 
  
}
closeAlert() {
  this.alert.nativeElement.classList.remove('show');
}

}
