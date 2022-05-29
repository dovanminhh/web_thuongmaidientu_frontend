import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteRoutingModule } from './site-routing.module';
import { SiteComponent } from './site.component';
import { HomeComponent } from './components/home/home.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { DetailComponent } from './components/detail/detail.component';
import { ShopComponent } from './components/shop/shop.component';
import { BlogComponent } from './components/blog/blog.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { FaqComponent } from './components/faq/faq.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './components/cart/cart.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxStarRatingModule } from 'ngx-star-rating';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    SiteComponent,
    HomeComponent,
    DetailComponent,
    ShopComponent,
    BlogComponent,
    AboutComponent,
    ContactComponent,
    FaqComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    MyAccountComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    SiteRoutingModule,
    CarouselModule,
    ReactiveFormsModule,
    FormsModule,
    NgxStarRatingModule,
    MatSnackBarModule,
    MatIconModule
    ]
})
export class SiteModule { }
