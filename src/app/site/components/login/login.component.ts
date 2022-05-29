import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  customer = new Customer();
  formCustomer: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;

  constructor(private customerService: CustomerService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formCustomer = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ]
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formCustomer.controls;
  }

  loginCus(){
    this.submitted = true;
    if(this.formCustomer.invalid){return;}
    console.log(this.customer);
    this.customerService.loginCustomer(this.formCustomer.value).subscribe(data =>{
      sessionStorage.setItem('customer-login',JSON.stringify(data) );
      this.router.navigate(['']);
    });
    console.log(JSON.stringify(this.formCustomer.value, null, 2));
  }

  
  
}
