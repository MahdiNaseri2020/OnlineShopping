import { Component, OnInit } from '@angular/core';
import { Product } from '../../comman/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/comman/cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product!: Product;
  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(()=> {
      this.handleProductDetails();
    })
  }


  handleProductDetails() {
   //get the ID from parmeter and convert is from string to number user '+' oprator
   const theProductId:number = +this.route.snapshot.paramMap.get('id')!;
   this.productService.getProduct(theProductId).subscribe(
     data =>{
       this.product = data;
     }
   )
  }

  addToCard(){
    const cartItem = new CartItem(this.product);
    this.cartService.addToCart(cartItem);
  }

}
