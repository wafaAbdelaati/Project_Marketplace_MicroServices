import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { DatePipe } from '@angular/common'
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'; // <-- #1 import module
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { AdminComponent } from './admin/admin.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { FooterComponent } from './footer/footer.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminSidebarComponent } from './admin/admin-sidebar/admin-sidebar.component';
import { AdminCategoriesComponent } from './admin/admin-categories/admin-categories.component';
import { AdminSigninComponent } from './admin/admin-signin/admin-signin.component';
import { AdminProfilComponent } from './admin/admin-profil/admin-profil.component';
import { AdminAddCategoryComponent } from './admin/admin-add-category/admin-add-category.component';
import { AdminSellersComponent } from './admin/admin-sellers/admin-sellers.component';
import { AdminCustomersComponent } from './admin/admin-customers/admin-customers.component';
import { AdminSettingsComponent } from './admin/admin-settings/admin-settings.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { SellerComponent } from './seller/seller.component';
import { SellerSigninComponent } from './seller/seller-signin/seller-signin.component';
import { SellerHeaderComponent } from './seller/seller-header/seller-header.component';
import { SellerHomeComponent } from './seller/seller-home/seller-home.component';
import { SellerSidebarComponent } from './seller/seller-sidebar/seller-sidebar.component';
import { SellerProfilComponent } from './seller/seller-profil/seller-profil.component';
import { SellerProductsComponent } from './seller/seller-products/seller-products.component';
import { SellerProductDetailComponent } from './seller/seller-product-detail/seller-product-detail.component';
import { SellerAddProductComponent } from './seller/seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller/seller-update-product/seller-update-product.component';
import { SellerOrdersComponent } from './seller/seller-orders/seller-orders.component';
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AdminHeaderComponent,
    FooterComponent,
    AdminHomeComponent,
    AdminSidebarComponent,
    AdminCategoriesComponent,
    AdminSigninComponent,
    AdminProfilComponent,
    AdminAddCategoryComponent,
    AdminSellersComponent,
    AdminCustomersComponent,
    AdminSettingsComponent,
    AdminUsersComponent,
    SellerComponent,
    SellerSigninComponent,
    SellerHeaderComponent,
    SellerHomeComponent,
    SellerSidebarComponent,
    SellerProfilComponent,
    SellerProductsComponent,
    SellerProductDetailComponent,
    SellerAddProductComponent,
    SellerUpdateProductComponent,
    SellerOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule, 
    RxReactiveFormsModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [CookieService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
