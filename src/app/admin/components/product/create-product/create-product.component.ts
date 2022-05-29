import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  product = new Product();
  categoryes:  Category[] | undefined;
  public imgURL: any;
  images: any;
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    image: new FormControl(''),
    quantity: new FormControl(''),
    price: new FormControl(''),
    sale_price: new FormControl(''),
    description: new FormControl(''),
    insurance: new FormControl(''),
    objCat: new FormControl(''),
    status: new FormControl(''),
  });
  submitted = false;

  constructor(private productService: ProductService, private categoryService: CategoryService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getCategoryes();
    this.form = this.fb.group(
      {
        name: ['',[Validators.required, Validators.minLength(6)]],
        image: ['',[Validators.required]],
        quantity: ['',[Validators.required]],
        price: ['',[Validators.required, Validators.min(1000)]],
        sale_price: ['',[Validators.required]],
        description: ['',[Validators.required]],
        insurance: ['',[Validators.required]],
        objCat: ['',[Validators.required]],
        status: [, Validators.required],
        
      }
    );
  }

  get f(): {[key: string]: AbstractControl} {
    return this.form.controls;
  }

  goToProductList(){
    this.router.navigate(['/admin/product']);
  }

  onSubmit(){
    this.submitted = true;
    if (this.form.invalid) {return;}
    const formData = new FormData();
    formData.append('file', this.images);
    formData.append('pro', JSON.stringify(this.form.value));
    
    this.productService.createProduct(formData).subscribe(
      (response) => {
        console.log(response);
        this.goToProductList();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    )
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

  onselectFile(event: any){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
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
