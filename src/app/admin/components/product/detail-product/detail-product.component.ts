import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Comments } from 'src/app/models/comments';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { CommentsService } from 'src/app/services/comments.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})

export class DetailProductComponent implements OnInit {
  id!: number;
  product = new Product();
  categoryes: Category[] | undefined;
  public imgURL: any;
  images: any;
  comments!: Comments[] | [];
  constructor(private categoryService: CategoryService, private productService: ProductService, private router: Router, private route: ActivatedRoute, private commentsService: CommentsService) { }

  host:string = 'http://localhost:8080/rest/admin/product/getImage/';

  ngOnInit(): void {
    this.getCategoryes();
    this.id = this.route.snapshot.params['id'];
    this.productService.getProductById(this.id).subscribe(data =>{
      this.product = data;
    }, error => console.log(error));
    this.commentsService.getCommentsByProduct(this.id).subscribe(data =>{
      this.comments = data;
    })
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


  
  onSubmit(){ }

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
  
}
