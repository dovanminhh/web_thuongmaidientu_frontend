import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  category = new Category();
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    status: new FormControl('')
  });
  submitted = false;

  constructor(private categoryService: CategoryService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        status: ['0', Validators.required]
        
      }
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {return;}
    this.categoryService.createCategory(this.form.value).subscribe(data =>{
      this.router.navigate(['/admin/category']);
    })
  }

  }



  // form = this.fb.group(
  //   {
  //     name: ['', Validators.required],
  //     status: ['', Validators.required],
  //   }
  // );

  // get f(){
  //   return this.form.controls;
  // }

  // onSubmit(){
  //   this.categoryService.createCategory(this.form.value).subscribe(data => {
  //     console.log(data);
      
  //   },
  //   error => console.log(error));
  // }



