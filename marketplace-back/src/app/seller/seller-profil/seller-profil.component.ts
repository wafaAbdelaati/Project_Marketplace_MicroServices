import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/_services/login/login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Seller } from 'src/app/_models/seller';
import { SellerService } from 'src/app/_services/seller/seller.service';
import { Validator } from 'src/app/_Validator/validator';
import { CustomValidators } from 'src/app/_Validators/custom-validators';

@Component({
  selector: 'app-seller-profil',
  templateUrl: './seller-profil.component.html',
  styleUrls: ['./seller-profil.component.scss']
})
export class SellerProfilComponent implements OnInit {
  settingFormGroup : FormGroup ;
  passwordUpdate:Boolean=false;
  seller:Seller = new Seller();
  constructor(private loginService : LoginService,private sellerService:SellerService) {
    this.settingFormGroupBuild();
   }

  ngOnInit() {
    this.sellerService.getSeller(this.loginService.getSeller().id).subscribe(seller=>{
      this.seller=seller;this.settingFormGroupBuild();
    })
  }
  settingFormGroupBuild(){
    this.settingFormGroup = new FormGroup({
    firstname: new FormControl(this.seller.firstname,[Validators.required,Validators.maxLength(10)]),
    lastname: new FormControl(this.seller.lastname,[Validators.required,Validators.maxLength(10)]),
    phoneNumber: new FormControl(this.seller.phoneNumber,{
      validators:  [Validators.required,Validators.maxLength(8), CustomValidators.patternValidator(/\d/, {hasNumber: true})]
    }),
    mail: new FormControl({value: this.seller.mail, disabled: true}),
    birthDate: new FormControl(this.seller.birthDate,[Validators.required]),
    address: new FormControl(this.seller.address,[Validators.required]),
    companyName: new FormControl(this.seller.companyName,[Validators.required]),
    password: new FormControl('',{
      validators:  [ CustomValidators.patternValidator(/\d/, {hasNumber: true}),
       CustomValidators.patternValidator(/[a-zA-Z]/, { hasSmallCase: true}),],
     updateOn: 'blur'
    })
 
   });
  }
  change(){
    
   this.passwordUpdate = true;
  }
  update(){
    if(!this.passwordUpdate){this.settingFormGroup.value.password = this.seller.password}
    this.seller = Object.assign(this.seller,new Seller( this.settingFormGroup.value ) ) ;
    delete this.seller.orders; delete this.seller.products;
    this.sellerService.addSeller(this.seller).subscribe(seller => {console.log(seller);
      this.loginService.loginSeller(seller,this.loginService.rememberMe(),false)
    });
  }
}
