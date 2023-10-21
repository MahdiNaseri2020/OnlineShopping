import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../comman/product';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/comman/cart-item';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  curentCategoryId: number = 0;
  products: Product[] = [];
  priviouCategoryId: number = 1;

  //propertice for pagination
  thePageNumber: number = 1;
  thePageSize: number = 10;
  theTotalElement: number = 0;

  priviousKeyword: string = '';

  constructor(
    private ProductService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    const hasSearchKeyword: boolean =
      this.route.snapshot.paramMap.has('keyword');
    if (hasSearchKeyword) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    // const theKeyword: string = this.route.snapshot.paramMap.get('keyword');
    const theKeyword: string = this.route.snapshot.params['keyword'];

    //if we have the different keyword then the privouse
    //we have to set the page number to 1

    if (this.priviousKeyword != theKeyword) {
      this.thePageNumber = 1;
    }

    this.ProductService.searchProductsPaginate(
      this.thePageNumber - 1,
      this.thePageSize,
      theKeyword
    ).subscribe(this.processResult());
  }

  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      this.curentCategoryId = this.route.snapshot.params['id'];
    } else {
      this.curentCategoryId = 1;
    }
    // if the privieuse category id is different to the current category id then resent the page number
    if (this.priviouCategoryId != this.curentCategoryId) {
      this.thePageNumber = 1;
    }
    this.ProductService.getProductListPaginate(
      this.thePageNumber - 1,
      this.thePageSize,
      this.curentCategoryId
    ).subscribe(this.processResult());
  }

  updatePageSize(pageSize: string) {
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  processResult() {
    return (data: any) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElement = data.page.totalElements;
    };
  }

  // working on shoping card
  addToCard(theProduct: Product){
    // console.log(`Adding to cart  ${theProduct.name} , ${theProduct.unitPrice}`);
    // TODO... do the real word
    const theCartItem = new CartItem(theProduct);
    this.cartService.addToCart(theCartItem);
  }
}
