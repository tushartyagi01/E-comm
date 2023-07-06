import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SellerProductService } from '../services/seller-product.service';
import { Cart, productInfo } from '../data-type';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.scss']
})
export class ProductDetailPageComponent {
      product:undefined | productInfo;
      productQuantity:number=1;
      removeCart=false;
      constructor(private route:ActivatedRoute,private sellerProduct:SellerProductService){}
      ngOnInit(){
         let productId=this.route.snapshot.paramMap.get('id');
         console.warn(productId);
         if(productId){
          this.sellerProduct.getProduct(productId).subscribe((result)=>{
                  this.product=result;
                  console.warn(this.product);
          })
         }
        
         let cartData= localStorage.getItem('localCart');
         if(productId && cartData) {
            let items= JSON.parse(cartData);
            items= items.filter((item:productInfo)=>productId= item.id.toString());
            if(items.length){
                this.removeCart=true;
            }
            else{
                this.removeCart=false;
            }
         }
         this.sellerProduct.removeCart.subscribe((result)=>{
                   this.removeCart=result;
         })
         let user= localStorage.getItem('user');
         if(user){
          let userId=JSON.parse(user)[0].id;
           this.sellerProduct.getCartList(userId);
           this.sellerProduct.cartData.subscribe((result)=>{
             let item= result.filter((item:productInfo)=>{
                      return productId?.toString()===item.productId?.toString()
              })
              if(item.length){
                this.removeCart=true;
              }
           })
           
         }

      }
      handleQuantity(str:string){
        if(str=='min'){
            if(this.productQuantity>1){
                   this.productQuantity-=1;
            }
        }
        if(str=='add'){
            if(this.productQuantity<20){
                   this.productQuantity+=1;
            }
        }
     }
     removeToCart(productId:number){
          this.sellerProduct.removeToCart(productId);
          console.warn("product detain remove")
     }
     addToCart(){
      // console.warn("hello");
       if(this.product){
          this.product.quantity=this.productQuantity;
       }
       if(!localStorage.getItem('user') && this.product){
             this.sellerProduct.localAddtoCart(this.product);
       }
       else{       
        let user =localStorage.getItem('user');
        console.log(user);
        let userId:number ;
        if(user && this.product){
          // userId=1;
            userId=JSON.parse(user)[0].id;
          // let user1= JSON.parse(user);
       // console.log( "user id is:",JSON.parse(user).id);
          // console.log(user1[0].id);
          // console.warn("userID",userId);
          let cartData:Cart={
            ...this.product,
            userId:userId,
            productId:this.product?.id
            
           }
           delete cartData.id;
           this.sellerProduct.addToCart(cartData).subscribe((result)=>{
                   if(result){
                    //  alert("product added successfully");
                    this.sellerProduct.getCartList(userId);
                    this.removeCart=true;
                   }
           })
        console.warn(cartData);
        }
      
        console.warn("user logged in ");
       
       
       }
     }
      
}
