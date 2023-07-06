import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Cart, productInfo } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class SellerProductService {
   cartData = new  EventEmitter<productInfo[] | []>( );
   removeCart= new EventEmitter<boolean>(false);
  constructor(private http:HttpClient) { }
  
  addProduct(data:productInfo){
      this.http.post("http://localhost:3000/products",data,{observe:'response'}).subscribe((result:any)=>{
         console.warn("result",result.body);
        if(result ){
          alert("product added successfully")
        }else{
          console.warn("product not added ");
        }
       
      })
  }
  ProductList(){
   return this.http.get<productInfo[]>("http://localhost:3000/products");
  }
  deleteProduct(id:number){
    return this.http.delete(`http://localhost:3000/products/${id}`);
    console.log("item is deleted",id);
  }
  getProduct(id:string){
    return this.http.get<productInfo>(`http://localhost:3000/products/${id}`)
  }
  updateProduct(product:productInfo){
    // console.warn(product);
    console.warn(product.id)
    return this.http.put<productInfo>(`http://localhost:3000/products/${product.id}`,product);
  }
  searchProduct(query:string){
     return  this.http.get<productInfo[]>(`http://localhost:3000/products?q=${query}`);
  }
  removeToCart(productId:number){
    let cartItems= localStorage.getItem('localCart');
    if(cartItems){
      let items:productInfo[]= JSON.parse(cartItems);
       let delProduct=items.filter((item:productInfo)=> productId===item.id);
       items= items.filter((item:productInfo) => productId!==item.id);
      console.warn(items);
      if(delProduct.length){
      alert("product deleted successfully");
      localStorage.setItem('localCart',JSON.stringify(items));
      this.cartData.emit(items);
      this.removeCart.emit(false);
      
    }
   
  }
}
  localAddtoCart(data:productInfo){

       let cartItems:productInfo[]=[];
       let localCart= localStorage.getItem('localCart');
       console.log("bye");
       if(!localCart) {
         localStorage.setItem('localCart', JSON.stringify([data]))
         console.warn("added successfully",data);
       }
       else{
        cartItems=JSON.parse(localCart);
        if (!Array.isArray(cartItems)) { // Check if cartItems is an array
          cartItems = []; // If not, initialize it as an empty array
        }
        cartItems.push(data);
         localStorage.setItem('localCart',JSON.stringify(cartItems));
         alert("data added successfully")
       }
       this.cartData.emit(cartItems);
  }
  addToCart(data:Cart){
    return this.http.post("http://localhost:3000/cart",data);
  }
  getCartList(userId: number){
    return this.http.get<productInfo[]>(`http://localhost:3000/cart?userId=${userId}`,{observe:'response'}).subscribe((result)=>{
      if(result && result.body){
        console.warn("data from cart",result.body);
        this.cartData.emit(result.body);
      }
         
    });

  }
  currentCart(){
    let user= localStorage.getItem('user');
    let userId= user && JSON.parse(user)[0].id;
    
      return this.http.get<Cart[]>(`http://localhost:3000/cart?userId=${userId}`);


    
  }
}
