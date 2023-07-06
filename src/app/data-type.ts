export interface signup{
    name:string,
    email:string,
    password:string,
    id:number
}
export interface signIn{
    email:string,
    password:string,
    id:number
}
export interface productInfo{
    productName:string,
    productCategory:string,
    price:number
    quantity:undefined|number,
    productDescription:string,
    productImage:string,
    productColor:string,
    id:number,
    productId:number |undefined
}
export interface Cart {
    productName:string,
    productCategory:string,
    price:number
    quantity:undefined|number,
    productDescription:string,
    productImage:string,
    productColor:string,
    id:undefined | number
    userId:number,
    productId:undefined | number

}
export interface priceSummary{
    price:number,
    discount:number
    tax:number,
    delivery:number,
    total :number
}