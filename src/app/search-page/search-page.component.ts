import { Component } from '@angular/core';
import { SellerProductService } from '../services/seller-product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { productInfo } from '../data-type';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent {
       searchResult:undefined | productInfo[];
      
       constructor(private sellerProduct:SellerProductService,private route:ActivatedRoute,private router:Router){}
       ngOnInit(){
          //  let query= this.route.snapshot.paramMap.get('query')
          //  console.warn(query);
          // query &&  this.sellerProduct.searchProduct(query).subscribe((result)=>{
          //        this.searchResult=result;
          // });
          this.searchProduct();
       }
       searchProduct(){
        let query= this.route.snapshot.paramMap.get('query')
        console.warn(query);
       query &&  this.sellerProduct.searchProduct(query).subscribe((result)=>{
              
              this.searchResult=result;

       });
       }
       navigateToProduct(id:number){
        this.router.navigate([`product-details/${id}`]);
       }
      
}
