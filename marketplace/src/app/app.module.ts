import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA  } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'; // <-- #1 import module
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AccountComponent } from './account/account.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { SignupComponent } from './signup/signup.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { AccountAddressComponent } from './account-address/account-address.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { AccountOrdersComponent } from './account-orders/account-orders.component';
import { NegotiateComponent } from './negotiate/negotiate.component';
import { OrderComponent } from './order/order.component';
import { AccountReviewsComponent } from './account-reviews/account-reviews.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    FooterComponent,
    HeaderComponent,
    AccountComponent,
    CategoryComponent,
    ProductComponent,
    SignupComponent,
    AccoutSettingsComponent,
    AccountAddressComponent,
    SearchResultComponent,
    AccountOrdersComponent,
    NegotiateComponent,
    OrderComponent,
    AccountReviewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule, 
    RxReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
