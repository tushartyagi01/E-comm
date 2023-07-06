import { Component } from '@angular/core';
import { SellerProductService } from '../services/seller-product.service';
import { Cart, priceSummary } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent {
    cartItems:Cart[]|undefined;
    priceSummary:priceSummary={
      price:0,
      discount:0,
      tax:0,
      total:0,
      delivery:0
    }
   constructor(private sellerProduct:SellerProductService,private router:Router){}
   ngOnInit(){
       
          this.sellerProduct.currentCart().subscribe((result)=>{
            // console.log(result);
             this.cartItems=result;
             let price:number=0;
             result.forEach((item)=>{
              console.log(item);
                 price=price+(+item.price);
             })
             this.priceSummary.price=price;
             this.priceSummary.discount=price/10;
             this.priceSummary.tax=price/5;
             this.priceSummary.delivery=30;
             this.priceSummary.total=price+this.priceSummary.discount+this.priceSummary.delivery+this.priceSummary.tax;
          });
         

        
   }
   navigateToCheckout(){
              this.router.navigate(['/checkout']);
   }
  
}
