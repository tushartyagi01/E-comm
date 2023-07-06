import { Component } from '@angular/core';
import { SellerProductService } from '../services/seller-product.service';
import { productInfo } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss']
})
export class SellerAddProductComponent {
  constructor(private sellerProduct:SellerProductService){}
    addProduct(data :productInfo){
      this.sellerProduct.addProduct(data);
    }
}
