import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { AuthGuard } from './auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { ProductDetailPageComponent } from './product-detail-page/product-detail-page.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';

const routes:Routes=[
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'seller-auth',
    component:SellerAuthComponent

  },
  {
         path:'seller-add-product',
         component:SellerAddProductComponent,
         canActivate:[AuthGuard]
  },
 
  {
    path:'seller-home',
    component:SellerHomeComponent,
    canActivate:[AuthGuard]
  },
  {
           path:'search/:query',
           component:SearchPageComponent,
          //  canActivate:[AuthGuard]
  },
  {
    path:'seller-update-product/:id',
    component:SellerUpdateProductComponent,
    canActivate:[AuthGuard]
  },{
    path:'product-details/:id',
    component:ProductDetailPageComponent
  },{
    path:'user-auth',
    component:UserAuthComponent
  },
  {
    path:'cart',
    component:CartPageComponent
  },
  {
    path:'checkout',
    component:CheckoutPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
