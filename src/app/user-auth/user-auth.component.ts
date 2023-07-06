import { Component } from '@angular/core';
import {  Cart, productInfo, signIn, signup } from '../data-type';
import { UsersService } from '../services/users.service';
import { SellerProductService } from '../services/seller-product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent {
  showLogIn:boolean=true;
    constructor(private userService:UsersService,private sellerProduct:SellerProductService){}
    ngOnInit(){
       this.userService.userAuthReload();
       let user= localStorage.getItem('user');
       let userId= user && JSON.parse(user).id;
       this.sellerProduct.getCartList(userId);
    }
    userSignUp(value:signup){
        this.userService.userSignUp(value);
    }
    userSignIn(data:signIn){
               this.userService.userSignIn(data);
    }
    openLogIn(){
      // console.warn("hello");
      this.showLogIn =!this.showLogIn
      this.userService.invalidUserAuth.subscribe((result)=>{
                  console.warn("wrong credential",result);
            if(result){
              alert("please enter valid credentials");
            }
            else{
              this.localToRemoteCart();
              
              
            }
            
      })
      
    }
    localToRemoteCart(){
             let data= localStorage.getItem('localCart');
             let cartDataList:productInfo[]= data && JSON.parse(data);
             let user= localStorage.getItem('user');
             let userId= user && JSON.parse(user).id;
             cartDataList && cartDataList.forEach((product:productInfo,index:number)=>{
                 let cartData: Cart ={
                  ...product,
                  productId:product.id,
                  userId
                }
                delete cartData.id;
                setTimeout(()=>{
                  this.sellerProduct.addToCart(cartData).subscribe((result)=>{
                    if(result){
                     alert("all product added suucessfully");
                    }
             })
             
                },3000);
                if(cartDataList.length===index+1){
                  localStorage.removeItem('localCart')
              }
              
               
             });
             
             
    }
}
