import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryes: Category[] = [];
  name: any;

  constructor(private categoryService: CategoryService, private router: Router, private fb: FormBuilder) { }

  searchForm = this.fb.group({
    search: ['']
  });

  Search(){
    this.categoryService.findCategoryByName(this.searchForm.controls['search'].value).subscribe(
      (response: Category[]) => {
        this.categoryes = response;
      }
    );
  }

  ngOnInit(): void {
    this.getCategoryes();
  }

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

  updateCategory(id: number){
    this.router.navigate(['admin/category/update-category', id]);
  }

  deleteCategory(id: number){
    this.categoryService.deleteCategory(id).subscribe(data => {
      this.getCategoryes();
    })
  }

}
