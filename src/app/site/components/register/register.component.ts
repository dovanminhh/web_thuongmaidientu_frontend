import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  customer = new Customer();
  formRegister: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl('')
  });
  submitted = false;

  constructor(private customerService: CustomerService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formRegister = this.fb.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        phone: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        address: [
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
    return this.formRegister.controls;
  }
  register(){
    this.submitted = true;
    if(this.formRegister.invalid){return;}
    console.log(this.customer);
    this.customerService.createCustomer(this.formRegister.value).subscribe(data =>{
      sessionStorage.setItem('customer-login', JSON.stringify(data));
      this.router.navigate(['login']);
    }) 
  }
}
