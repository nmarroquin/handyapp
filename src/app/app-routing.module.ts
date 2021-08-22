import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ForumsComponent } from './features/forums/forums.component';
import { MessagesComponent } from './features/messages/messages.component';
import { DownloadsComponent } from './components/downloads/downloads.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { CategoryComponent } from './components/category/category.component';
import { ProductComponent } from './components/product/product.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';



const routes: Routes = 
[
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',         component: HomeComponent },
  { path: 'downloads',    component: DownloadsComponent },
  { path: 'categories',   component: CategoriesComponent },
  { path: 'category/:id', component: CategoryComponent },
  { path: 'product/:id',  component: ProductComponent },
  { path: 'about',        component: AboutComponent },
  { path: 'contact',      component: ContactComponent },
  { path: 'login',        component: LoginComponent },
  { path: 'register',     component: RegisterComponent },
  { path: 'cart',         component: CartComponent },
  { path: 'checkout',     component: CheckoutComponent },
  { path: 'confirmation', component: ConfirmationComponent },

  { path: 'forums',       component: ForumsComponent },
  { path: 'messages',     component: MessagesComponent },
  ];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true}/*, {scrollPositionRestoration: 'top', anchorScrolling: 'enabled', scrollOffset: [0, 64]}*/) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
