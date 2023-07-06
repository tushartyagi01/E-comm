import { Component } from '@angular/core';
import { SellerProductService } from '../services/seller-product.service';
import { productInfo} from '../data-type';
import { Router } from '@angular/router';
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss']
})
export class SellerHomeComponent {
  productList: undefined| productInfo[];
   constructor(private sellerProduct:SellerProductService, private router:Router){}
   ngOnInit(){
        this.showProduct();
   }
   showProduct(){
    this.sellerProduct.ProductList().subscribe((result)=>{
      //  console.warn(result.body);
      this.productList=result
    })
   }
   deleteProduct(id:number){
     this.sellerProduct.deleteProduct(id).subscribe((result)=>{
            if(result){
              alert("product is delelted");
              this.showProduct();
            }
            else{
              console.log("error occured")
            }
     });
   }
   updateProduct(id:number){
      this.router.navigate([`seller-update-product/${id}`]);
    
   }
}
