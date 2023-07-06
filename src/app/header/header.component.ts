import { Component } from '@angular/core';
import {Router} from '@angular/router'
import { SellerProductService } from '../services/seller-product.service';
import { productInfo } from '../data-type';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  menuType="default";
  sellerName:string = "";
  userName:string="";
  cartItem:number=0;
  searchResult: undefined | productInfo[];
  constructor(private router:Router,private sellerProduct:SellerProductService) {
     
  }
  ngOnInit(){
    this.router.events.subscribe((val:any)=>{
       console.warn(val.url);
       if(val.url){
        if(localStorage.getItem('seller') && val.url.includes('seller')) {
          // console.warn("in seller area");
          this.menuType="seller";
          let sellerStore=localStorage.getItem('seller');
          let sellerData= sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName=sellerData.name;
        }
        else if(localStorage.getItem('user')){
            let userStore= localStorage.getItem('user');
            let userData= userStore && JSON.parse(userStore)[0];
            this.userName=userData.name;
            this.menuType='user';

        }
        else{
          // console.warn("outside seller");
          this.menuType="default";
        }
       }
       
    })
    let cartData= localStorage.getItem('localCart');
    if(cartData){
       this.cartItem= JSON.parse(cartData).length;
    }
    this.sellerProduct.cartData.subscribe((result:any)=>{
        this.cartItem= result.body.length ;
    })
    // this.userName=localStorage.getItem('user');
  }
  logOut(){
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }
  searchProduct(query:KeyboardEvent){
        if(query){
          const element= query.target as HTMLInputElement;
          this.sellerProduct.searchProduct(element.value).subscribe((result)=>{
            //  console.warn(result);
              if(result.length>5){
                    result.length=5;
              }
              if(result){
                this.searchResult=result;
              }
          })
        }
  }
  hideSearch(){
    this.searchResult=undefined;
  }
  submitSearch(query:string){
    console.warn(query);
    this.router.navigate([`search/${query}`]);
   
  }
  redirectToProduct(id:number){
      this.router.navigate([`product-details${id}`])
  }
  userLogOut(){
    localStorage.removeItem('user');
    this.router.navigate(['/user-auth']);
  }
}
