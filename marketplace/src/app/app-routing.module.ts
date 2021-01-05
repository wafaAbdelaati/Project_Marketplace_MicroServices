import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { AccountComponent } from './account/account.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { SignupComponent } from './signup/signup.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { AccountAddressComponent } from './account-address/account-address.component';
import { SearchResultComponent } from './search-result/search-result.component';
import {AccountOrdersComponent} from './account-orders/account-orders.component';
import { AuthGuard } from './_services/auth/auth.guard';
import { NegotiateComponent } from './negotiate/negotiate.component';
import { OrderComponent } from './order/order.component';
import { AccountReviewsComponent } from './account-reviews/account-reviews.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
},
  {
    path: 'home',
    component: HomeComponent
},
{
  path: 'cart',
  component: CartComponent
},
{
  path: 'cart/negotiate',
  component: NegotiateComponent,
  canActivate: [AuthGuard]
},
{
  path: 'cart/order',
  component: OrderComponent,
  canActivate: [AuthGuard]
},
{
  path: 'account',
  component: AccountComponent,
  canActivate: [AuthGuard]
  
},
{
  path: 'account/settings',
  component: AccoutSettingsComponent,
  canActivate: [AuthGuard]
  
},
{
  path: 'account/address',
  component: AccountAddressComponent,
  canActivate: [AuthGuard]
  
},
{
  path: 'account/reviews',
  component: AccountReviewsComponent,
  canActivate: [AuthGuard]
  
},

{
  path: 'account/orders',
  component: AccountOrdersComponent,
  canActivate: [AuthGuard]
  
},
{
  path: 'category/:type/:id',
  component: CategoryComponent
},
{
  path: 'product/:id',
  component: ProductComponent
},
{
  path: 'signup',
  component: SignupComponent
},
{
  path: 'search/:keyword',
  component: SearchResultComponent
},
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
