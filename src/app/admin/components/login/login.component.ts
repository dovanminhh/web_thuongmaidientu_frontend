import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup = new FormGroup({});
  login = new Login();
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    
  });
  submitted = false;

  constructor(private adminloginservice: LoginService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group(
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
    return this.form.controls;
  }
  
  onSubmit(){
    this.submitted = true;
    if(this.form.invalid){return;}
    sessionStorage.setItem('user-login',this.form.value.email);
    console.log(this.login);
    this.adminloginservice.loginAdmin(this.form.value).subscribe(data => {
      this.router.navigate(['/admin']);
    });
    console.log(JSON.stringify(this.form.value, null, 2));
  }
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

}
