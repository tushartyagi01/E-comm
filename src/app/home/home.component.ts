import { Component } from '@angular/core';
import { SellerProductService } from '../services/seller-product.service';
import { productInfo } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
   products:undefined | productInfo[];
   constructor(private  sellerProduct: SellerProductService,private router:Router){}
   ngOnInit(){
    this.productList();
   }
   productList(){
    this.sellerProduct.ProductList().subscribe((result)=>{
      console.warn(result);
         if(result){
          this.products=result;
         }
    })
   }
   navigateToProduct(id:number){
    this.router.navigate([`product-details/${id}`]);
   }

}
