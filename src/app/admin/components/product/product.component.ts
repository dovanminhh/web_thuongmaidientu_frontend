import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  products ?: Array<any>;
  pageNo: any = 0;
  pageSize: any = 7;
  listPage ?: Array<any>;
  name: any;
  

  host:string = 'http://localhost:8080/rest/admin/product/getImage/';

  constructor(private productService: ProductService, private router: Router, private fb: FormBuilder) { }

  searchForm = this.fb.group({
    search: ['']
  });

  searchProduct(){
    this.productService.findProductByName(this.searchForm.controls['search'].value).subscribe(
      (response: Product[]) => {
        this.products = response;
      }
    );
  }

  ngOnInit(): void {
    this.getProducts();
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

  detailProduct(id: number){
    this.router.navigate(['admin/product/detail-product', id]);
  }

  updateProduct(id: number){
    this.router.navigate(['admin/product/update-product', id]);
  }

  deleteProduct(id: number){
    this.productService.deleteProduct(id).subscribe( data => {
      this.getProducts();
    })
  }
  
}
