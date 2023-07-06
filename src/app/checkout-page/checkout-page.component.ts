import { Component } from '@angular/core';
import { SellerProductService } from '../services/seller-product.service';
import { Cart } from '../data-type';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent {
  // cartItems:Cart[]|undefined;
  totalPrice:number=0;
  constructor(private sellerProduct:SellerProductService){}
  ngOnInit(){
    this.sellerProduct.currentCart().subscribe((result)=>{
      // console.log(result);
      //  this.cartItems=result;
       let price:number=0;
       result.forEach((item)=>{
        console.log(item);
           price=price+(+item.price);
       })
       this.totalPrice=price+price/5-price/10+30;
  });

}
orderNow(data:any){
  console.warn(data);
}
}