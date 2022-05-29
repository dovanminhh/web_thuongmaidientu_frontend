import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { CategoryComponent } from './components/category/category.component';
import { CreateCategoryComponent } from './components/category/create-category/create-category.component';
import { UpdateCategoryComponent } from './components/category/update-category/update-category.component';
import { UpdateProductComponent } from './components/product/update-product/update-product.component';
import { CreateProductComponent } from './components/product/create-product/create-product.component';
import { ProductComponent } from './components/product/product.component';
import { DetailProductComponent } from './components/product/detail-product/detail-product.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerDetailComponent } from './components/customer/customer-detail/customer-detail.component';
import { CommentsComponent } from './components/comments/comments.component';
import { UpdateCommentsComponent } from './components/comments/update-comments/update-comments.component';
import { OrderComponent } from './components/order/order.component';
import { DetailOrderComponent } from './components/order/detail-order/detail-order.component';


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    LoginComponent,
    CategoryComponent,
    CreateCategoryComponent,
    UpdateCategoryComponent,
    UpdateProductComponent,
    CreateProductComponent,
    ProductComponent,
    DetailProductComponent,
    CustomerComponent,
    CustomerDetailComponent,
    CommentsComponent,
    UpdateCommentsComponent,
    OrderComponent,
    DetailOrderComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class AdminModule { }
