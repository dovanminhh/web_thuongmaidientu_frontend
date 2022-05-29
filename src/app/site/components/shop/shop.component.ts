import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { cartItem } from 'src/app/models/cartItem';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
declare var JSON: JSON;

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  host:string = 'http://localhost:8080/rest/admin/product/getImage/';
  
  categoryes!: Category[] | [];
  product: Product[] = [];
  cartItems: Array<cartItem> = new Array<cartItem>(); 
  pro = new Product();
  productNew : Product[] = [];
  id!:number;
  products ?: Array<any>;
  pageNo: any = 0;
  pageSize: any = 7;
  listPage ?: Array<any>;
  min: any = 0;
  max: any = 0;
  productes !: Array<any>;

  // rating = 0;
  // startCount = 5;
  // ratingArr: boolean[] = [];
  // snackBarDuration =1000;
  // response = [
  //   'you broke my heart!',
  //   'Really?',
  //   'We will do better next time.',
  //   'Glad you like it!',
  //   'Thank you so much!'
  // ]

  constructor(private categoryService: CategoryService,private productService: ProductService, private router: Router, private route: ActivatedRoute, private cartService: CartService, private fb: FormBuilder, /*private snackBar: MatSnackBar */) {
    // this.ratingArr = Array(this.startCount).fill(false);
   }

  

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.productService.getProductById(this.id).subscribe(data =>{
      this.pro = data;
      // console.log(data);
    })

    this.getCategoryes();
    this.getProducts();
    this.findByCategory(this.id);
    this.findNewProductTop();
    // console.log(this.cartItems);
  }

  // returnStar(i: number){
  //   if(this.rating >= i + 1){
  //     return 'star';
  //   }else{
  //     return 'star_border';
  //   }
  // }
  // onClick(i: number){
  //   this.rating = i + 1;
  //   this.snackBar.open(this.response[i], '', {
  //     duration: this.snackBarDuration,
  //     panelClass: ['snack-bar']
  //   });
  // }

  public getCategoryes(){
    this.categoryService.getCategoryesList().subscribe(
      (response: Category[]) => {
        this.categoryes = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  private getProducts(){
    this.productService.paginate(this.pageNo, this.pageSize).subscribe(
      (response: any) => {
        this.products = response['content'];
        this.listPage = new Array(response['totalPages']);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  listNumber(y: any){
    this.pageNo = y;
    this.getProducts();
  }
  
  findByCategory(id: any){
    this.productService.getProductByCategoryId(id).subscribe(
      (response: Product[]) => {
        this.products = response;
        // console.log(response);
      }
    )
  }

  searchForm = this.fb.group({
    search: ['']
  });

  findProductByName(){
    this.productService.findProductByName(this.searchForm.controls['search'].value).subscribe(
      (response: Product[]) => {
        this.products = response;
        // console.log(response);
      }
    )
  }

  // ADD TO CART METHODS
  addToCart(product: Product) {
    const theCartItem = new cartItem(product);
    this.cartService.addToCart(theCartItem);
  }

  findNewProductTop(){
    this.productService.findNewProduct().subscribe(
      (response : Product[]) => {
        this.productNew = response;
        // console.log(response);
      }
    )
  }

  findByPriceBetween(min: number, max: number){
    this.productService.findByPriceBetween(min, max).subscribe(
      (response : any) =>{
        this.min = response;
        this.max = response;
        this.products = response;
        console.log(response);
      }
    ) 
  }
  
}
