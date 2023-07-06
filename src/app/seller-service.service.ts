import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { signIn, signup } from './data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SellerServiceService {
  isUserLoggedIn= new BehaviorSubject<boolean>(false);
  isloginFailed=new EventEmitter<any>();
  constructor(private http:HttpClient,private router:Router) { }

  userSignUp(data :signup){
     console.warn("service call");
     return this.http.post("http://localhost:3000/seller",data,{observe:'response'}).subscribe((result)=>{
         this.isUserLoggedIn.next(true);
         localStorage.setItem('seller',JSON.stringify(result.body));
         
         this.router.navigate(['seller-home']);
         console.log(result);
     });
  }
  reloadSeller(){
    if(localStorage.getItem('seller')) {
      console.log("reloading")
      this.isUserLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }
  userLogin(data:signIn){
          // console.warn(data);
          //api call will be done here for login
          this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
          {observe:'response'}
          ).subscribe((result:any)=>{
                // console.log(result.body);
                if(result && result.body && result.body.length){
                     alert("login successful");
                     localStorage.setItem('seller',JSON.stringify(result.body));
                     this.router.navigate(['seller-home']);
                }
                else {
                  console.warn("login failed");
                  this.isloginFailed.emit(true);
                }
          })
  }
}
