import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  id!: number;
  product = new Product();
  categoryes: Category[] | undefined;
  public imgURL: any;
  images: any;

  constructor(private productServie: ProductService, private router: Router, private route: ActivatedRoute, private categoryService: CategoryService) { }

  host:string = 'http://localhost:8080/rest/admin/product/getImage/';

  ngOnInit(): void {
    this.getCategoryes();
    this.id = this.route.snapshot.params['id'];
    this.productServie.getProductById(this.id).subscribe(data =>{
      this.product = data;
    }, error => console.log(error));
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

  onSubmit(){
    this.productServie.updateProduct(this.id, this.product).subscribe(data => {
      this.goToProductList();
    },
    error => console.log(error));
  }

  goToProductList(){
    this.router.navigate(['/admin/product']);
  }

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
