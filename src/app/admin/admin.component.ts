import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  adminInfor: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.adminInfor = sessionStorage.getItem('user-login');
  }

  logOut(){
    sessionStorage.removeItem('user-login');
    this.router.navigate(['/admin/login']);
  }
}
