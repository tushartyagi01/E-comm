import { Component } from '@angular/core';
import { productInfo } from '../data-type';
import { ActivatedRoute, Router } from '@angular/router';
import { SellerProductService } from '../services/seller-product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.scss']
})
export class SellerUpdateProductComponent {
    productData: undefined | productInfo;
   constructor(private route:ActivatedRoute,private router:Router, private sellerProduct:SellerProductService){}
   ngOnInit(){
    let productId= this.route.snapshot.paramMap.get('id');
    productId && this.sellerProduct.getProduct(productId).subscribe((result)=>{
          // console.warn(result)
          // letproductInfo=
          this.productData=result;
    });
   
   }
    updateProduct(data:productInfo){
      // console.warn(data);
      
      // this.productData && data.id =this.productData?.id;
      if(this.productData){
        data.id= this.productData.id;
      }
      this.sellerProduct.updateProduct(data
        ).subscribe((result)=>{
          if(result){
            alert("product updated successfully");
            this.router.navigate(['seller-home']);
          }
      });
    }
}
