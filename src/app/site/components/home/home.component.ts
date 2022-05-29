import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cartItem } from 'src/app/models/cartItem';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productSale: Product[] = [];
  productNewHome: Product[] = [];
  pro = new Product();
  cartItems: Array<cartItem> = new Array<cartItem>(); 
  total: number = 0;
   math = Math;
   id!: number;

  constructor(private productService: ProductService, private route: ActivatedRoute, private cartService: CartService) { }

  host:string = 'http://localhost:8080/rest/admin/product/getImage/';

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.productService.getProductById(this.id).subscribe(data =>{
      this.pro = data;
      // console.log(data);
    })
    this.findBestSalePrice();
    this.findByHomeProduct();
  }

  findBestSalePrice(){
    this.productService.findBestSalePrice().subscribe(
      (response: Product[]) => {
        this.productSale = response;
      }
    )
  }

  findByHomeProduct(){
    this.productService.findByHomeProduct().subscribe(
      (response : Product[]) => {
        this.productNewHome = response;
        console.log(response);
      }
    )
  }

  addToCart(product: Product) {
    const theCartItem = new cartItem(product);
    this.cartService.addToCart(theCartItem);
  }

}
