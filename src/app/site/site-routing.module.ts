import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardHomeService } from '../services/auth-guard-home.service';
import { AuthGuardService } from '../services/auth-guard.service';
import { AboutComponent } from './components/about/about.component';
import { BlogComponent } from './components/blog/blog.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ContactComponent } from './components/contact/contact.component';
import { DetailComponent } from './components/detail/detail.component';
import { FaqComponent } from './components/faq/faq.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { RegisterComponent } from './components/register/register.component';
import { ShopComponent } from './components/shop/shop.component';
import { SiteComponent } from './site.component';

const routes: Routes = [
  {path:'', component: SiteComponent, children:[
    {path: '', component: HomeComponent},
    {path: 'blog', component: BlogComponent},
    {path: 'about', component: AboutComponent},
    {path: 'contact', component: ContactComponent},
    {path:'faq', component: FaqComponent},
    {path:'login', component: LoginComponent},
    {path:'register',component: RegisterComponent},
    {path:'cart',component: CartComponent},
    {path:'my-account', component: MyAccountComponent},
    {path:'checkout', component: CheckoutComponent, canActivate: [AuthGuardHomeService]},
    {path:'detail/:id',component: DetailComponent},
    {path: 'shop', component: ShopComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
