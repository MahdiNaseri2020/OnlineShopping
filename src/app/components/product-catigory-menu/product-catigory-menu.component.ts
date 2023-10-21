import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../../comman/product-category';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-catigory-menu',
  templateUrl: './product-catigory-menu.component.html',
  styleUrls: ['./product-catigory-menu.component.css']
})
export class ProductCatigoryMenuComponent implements OnInit {

  productCategories: ProductCategory[] =[];
  constructor(private ProductService: ProductService) { }

  ngOnInit(): void {
    this.listProductCategories();
  }


  listProductCategories() {
    this.ProductService.getProductCategories().subscribe(
      data => {
        this.productCategories = data;
      }
    )
  
  }

}
