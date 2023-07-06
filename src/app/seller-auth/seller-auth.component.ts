import { Component } from '@angular/core';
import { SellerServiceService } from '../seller-service.service';
import { Router } from '@angular/router';
import { signIn, signup } from '../data-type';
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss']
})
export class SellerAuthComponent {
    showLogin=false;
    authError='';
    constructor( private sellerService:SellerServiceService, private router:Router){

    }
    ngOnInit():void {
      this.sellerService.reloadSeller();
    }
  signUp(data:signup) {
    console.warn(data);
     this.sellerService.userSignUp(data)
    // .subscribe((result)=>{
    //    this.router.navigateByUrlauth("seller-home");
    // });
  }
  signIn(data:signIn){
    // console.warn(data);
    this.authError="";
    this.sellerService.userLogin(data);
    this.sellerService.isloginFailed.subscribe((err)=>{
         if(err) {
          this.authError='email or password does not match';
         } 
    })
  }
  openLogin(){
     this.showLogin=!this.showLogin;
  }
}
