import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';
import { AdminComponent } from './admin.component';
import { CategoryComponent } from './components/category/category.component';
import { CreateCategoryComponent } from './components/category/create-category/create-category.component';
import { UpdateCategoryComponent } from './components/category/update-category/update-category.component';
import { CommentsComponent } from './components/comments/comments.component';
import { UpdateCommentsComponent } from './components/comments/update-comments/update-comments.component';
import { CustomerDetailComponent } from './components/customer/customer-detail/customer-detail.component';
import { CustomerComponent } from './components/customer/customer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { DetailOrderComponent } from './components/order/detail-order/detail-order.component';
import { OrderComponent } from './components/order/order.component';
import { CreateProductComponent } from './components/product/create-product/create-product.component';
import { DetailProductComponent } from './components/product/detail-product/detail-product.component';
import { ProductComponent } from './components/product/product.component';
import { UpdateProductComponent } from './components/product/update-product/update-product.component';


const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path: '', component: AdminComponent,canActivate:[AuthGuardService], children:[
    {path:'', component: DashboardComponent},
    {path:'category', component: CategoryComponent},
    {path:'category/create-category', component: CreateCategoryComponent},
    {path:'category/update-category/:id', component: UpdateCategoryComponent},
    {path:'product', component: ProductComponent},
    {path:'product/create-product', component: CreateProductComponent},
    {path:'product/update-product/:id', component: UpdateProductComponent},
    {path:'product/detail-product/:id', component: DetailProductComponent},
    {path:'customer', component: CustomerComponent},
    {path: 'customer/customer-detail/:id', component: CustomerDetailComponent},
    {path:'comments', component: CommentsComponent},
    {path:'comments/update-comments/:id', component: UpdateCommentsComponent},
    {path:'order', component: OrderComponent},
    {path:'order/detail-order/:id', component: DetailOrderComponent}
    
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
