import { EventEmitter, Injectable } from '@angular/core';
import { signIn, signup } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
   invalidUserAuth= new EventEmitter<boolean>(false);
  constructor(private http:HttpClient,private router :Router) { }


    userSignUp(userData:signup){
      //  console.warn(userData);
        this.http.post("http://localhost:3000/users",userData,{observe:'response'}).subscribe((result)=>{
             console.warn(result);
             if(result){
                 localStorage.setItem('user',JSON.stringify(result.body));
                this.router.navigate(['home']);
             }
        })
    }
     userAuthReload(){
      if(localStorage.getItem('user')){
        this.router.navigate(['home'])
      }
     }
     userSignIn(data:signIn){
       this.http.get(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,{observe:'response'}).subscribe((result:any)=>{
                 if(result  && result.body?.length){
                  this.invalidUserAuth.emit(false);
                   localStorage.setItem('user',JSON.stringify(result.body));
                    alert("login Seccessfull");
                    this.router.navigate(['home'])
                 }
                 else {
                      this.invalidUserAuth.emit(true);
                 }
       })
     }
}
