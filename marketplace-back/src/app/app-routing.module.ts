import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminCategoriesComponent } from './admin/admin-categories/admin-categories.component';
import { AdminSigninComponent } from './admin/admin-signin/admin-signin.component';
import { AuthGuard } from './_services/auth/auth.guard';
import { AdminProfilComponent } from './admin/admin-profil/admin-profil.component';
import { AdminAddCategoryComponent } from './admin/admin-add-category/admin-add-category.component';
import { AuthGuard2 } from './_services/auth2/auth2.guard';
import { AdminSellersComponent } from './admin/admin-sellers/admin-sellers.component';
import { AdminCustomersComponent } from './admin/admin-customers/admin-customers.component';
import { AdminSettingsComponent } from './admin/admin-settings/admin-settings.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AuthGuard3 } from './_services/auth3/auth3.guard';
import { SellerSigninComponent } from './seller/seller-signin/seller-signin.component';
import { SellerComponent } from './seller/seller.component';
import { SellerHomeComponent } from './seller/seller-home/seller-home.component';
import { AuthGuardSeller } from './_services/sellerAuth/auth/auth.guard';
import { AuthGuardSeller2 } from './_services/sellerAuth/auth2/auth2.guard';
import { SellerProfilComponent } from './seller/seller-profil/seller-profil.component';
import { SellerProductsComponent } from './seller/seller-products/seller-products.component';
import { SellerProductDetailComponent } from './seller/seller-product-detail/seller-product-detail.component';
import { SellerAddProductComponent } from './seller/seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller/seller-update-product/seller-update-product.component';
import { SellerOrdersComponent } from './seller/seller-orders/seller-orders.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminSigninComponent,
    canActivate: [AuthGuard2]
  },
  {
    path: 'seller',
    component: SellerSigninComponent,
    canActivate:[AuthGuardSeller2]
  },
  {
    path: '',
    component: SellerSigninComponent,
    canActivate:[AuthGuardSeller2]
  },
  {
    path: 'seller',
    component: SellerComponent,
    
     children: [{
      path: 'home',
      component: SellerHomeComponent,
      canActivate: [AuthGuardSeller]
    }], 
  },
  {
    path: 'admin',
    component: AdminComponent,
    
     children: [{
      path: 'home',
      component: AdminHomeComponent,
      canActivate: [AuthGuard]
    }], 
  },
  {
    path: 'admin',
    component: AdminComponent,
    
     children: [{
      path: 'categories',
      component: AdminCategoriesComponent,
      canActivate: [AuthGuard]
    }], 
  },
  {
    path: 'admin',
    component: AdminComponent,
    
     children: [{
      path: 'newCategory',
      component: AdminAddCategoryComponent,
      canActivate: [AuthGuard]
    }], 
  },
  {
    path: 'admin',
    component: AdminComponent,
    
     children: [{
      path: 'account',
      component: AdminProfilComponent,
      canActivate: [AuthGuard]
    }], 
  },
  {
    path: 'seller',
    component: SellerComponent,
    
     children: [{
      path: 'account',
      component: SellerProfilComponent,
      canActivate: [AuthGuardSeller]
    }], 
  },
  {
    path: 'seller',
    component: SellerComponent,
    
     children: [{
      path: 'products',
      component: SellerProductsComponent,
      canActivate: [AuthGuardSeller]
    }], 
  },
  {
    path: 'seller',
    component: SellerComponent,
    
     children: [{
      path: 'orders',
      component: SellerOrdersComponent,
      canActivate: [AuthGuardSeller]
    }], 
  },
  {
    path: 'seller',
    component: SellerComponent,
    
     children: [{
      path: 'newProduct',
      component: SellerAddProductComponent,
      canActivate: [AuthGuardSeller]
    }], 
  },
  {
    path: 'seller',
    component: SellerComponent,
    
     children: [{
      path: 'updateProduct/:id',
      component: SellerUpdateProductComponent,
      canActivate: [AuthGuardSeller]
    }], 
  },
  {
    path: 'seller',
    component: SellerComponent,
    
     children: [{
      path: 'product/:id',
      component: SellerProductDetailComponent,
      canActivate: [AuthGuardSeller]
    }], 
  },
  {
    path: 'admin',
    component: AdminComponent,
    
     children: [{
      path: 'settings',
      component: AdminSettingsComponent,
      canActivate: [AuthGuard,AuthGuard3]
    }], 
  },
  {
    path: 'admin',
    component: AdminComponent,
    
     children: [{
      path: 'users',
      component: AdminUsersComponent,
      canActivate: [AuthGuard,AuthGuard3]
    }], 
  },
  {
    path: 'admin',
    component: AdminComponent,
    
     children: [{
      path: 'sellers',
      component: AdminSellersComponent,
      canActivate: [AuthGuard]
    }], 
  },
  {
    path: 'admin',
    component: AdminComponent,
    
     children: [{
      path: 'customers',
      component: AdminCustomersComponent,
      canActivate: [AuthGuard]
    }], 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
