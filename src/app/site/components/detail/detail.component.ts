import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { cartItem } from 'src/app/models/cartItem';
import { Category } from 'src/app/models/category';
import { Comments } from 'src/app/models/comments';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { CommentsService } from 'src/app/services/comments.service';
import { ProductService } from 'src/app/services/product.service';
declare var JSON: JSON;


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  id!: number;
  product = new Product();
  productNewHome: Product[] = [];
  categoryes: Category[] | undefined;
  public imgURL: any;
  images: any;
  cartItems: Array<cartItem> = new Array<cartItem>(); 
  cartItemss: cartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  comments!: Comments[] | [];
  customerInfor: any = sessionStorage.getItem('customer-login');
  customer = JSON.parse(this.customerInfor);
  commentes: Comments [] = [];

  constructor(private commentsService: CommentsService,private fb: FormBuilder,private categoryService: CategoryService, private productService: ProductService, private router: Router, private route: ActivatedRoute, private cartService: CartService, private commentService: CommentsService) { 
    var jsonInStorege = sessionStorage.getItem('cart');
    if(jsonInStorege){
      this.cartItems = JSON.parse(jsonInStorege);
    }
  }
  infoForm = this.fb.group({
    note : [''],
    start : ['5'],
    status: [0],
    objCus: [''],
    objProduct: [''],

  });

  
  host:string = 'http://localhost:8080/rest/admin/product/getImage/';

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.productService.getProductById(this.id).subscribe(data =>{
      this.product = data;
    }, error => console.log(error));
    this.commentService.getCommentsByProduct(this.id).subscribe((data:Comments[]) => {
      this.comments = data;
    })  
    ;console.log(this.comments);
    this.getCategoryes();
    this.listCartDetail();
    this.findByHomeProduct();
   
  }

  private getCategoryes(){
    this.categoryService.getCategoryesList().subscribe(
      (response: Category[]) =>{
        this.categoryes= response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  onSubmit(){}

  onselectFile(event: any){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      console.log(file);  
      this.images = file;

      var reader = new FileReader();
      this.imgURL = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }
    };
  }

  addToCart() {
    console.log(`Adding to cart:  ${this.product.name}, ${this.product.price}`);
    const theCartItem = new cartItem(this.product);
    this.cartService.addToCart(theCartItem);
  }

  incrementQuantity(product: cartItem){
    this.cartService.addToCart(product);
  }
  decrementQuantity(product: cartItem){
    this.cartService.decrementQuantity(product);
  }
 
  listCartDetail(){
    this.cartItems = this.cartService.cartItems;
    this.cartService.totalPrice.subscribe(data => 
      this.totalPrice = data
    );
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    )
    this.cartService.computeCartTotals();
  }

  findByHomeProduct(){
    this.productService.findByHomeProduct().subscribe(
      (response : Product[]) => {
        this.productNewHome = response;
        console.log(response);
      }
    )
  }
  insertComment(){
    this.infoForm.controls['objCus'].setValue(this.customer);
    this.infoForm.controls['objProduct'].setValue(this.product)
    this.commentService.createComments(this.infoForm.value).subscribe(data => {
      this.ngOnInit();
      console.log(this.insertComment);
    })
    
  }

  public getCommentsList(){
    this.commentsService.getCommentsList().subscribe(
      (response: Comments[]) => {
        this.commentes = response;
      }
    )
  }

  updateStatusComments(id: number){
    this.commentsService.getCommentsById(id).subscribe(
      data =>{
        if(data.status == 0){
          data.status = 1
          this.commentsService.updateComments(id,data).subscribe(
            res => {
              this.ngOnInit();
            }
          )
        }else{
          data.status = 0
          this.commentsService.updateComments(id,data).subscribe(
            res => {
              this.ngOnInit();
            }
          )
        }

      }
    )
  }

}
