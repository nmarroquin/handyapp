import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Material Components
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

//Components
import { HomeComponent } from './components/home/home.component';
import { ForumsComponent } from './features/forums/forums.component';
import { MessagesComponent } from './features/messages/messages.component';
import { HeaderComponent } from './navigation/header/header.component';
import { FooterComponent } from './navigation/footer/footer.component'; 
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { AboutComponent } from './components/about/about.component';
import { BannerComponent } from './components/banner/banner.component';
import { DownloadsComponent } from './components/downloads/downloads.component';
import { ContactComponent } from './components/contact/contact.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryComponent } from './components/category/category.component';
import { ProductComponent } from './components/product/product.component';
import { ProductCardComponent } from './components/product/product-card.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './components/cart/cart.component';

//Scrolling
import { Router, Scroll } from '@angular/router';
import { ViewportScroller, CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

//Services
import { CategoriesService, Category } from './services/categories.service';
import { ServicesService } from './services/services.service';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { MatNativeDateModule } from '@angular/material/core';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ForumsComponent,
    MessagesComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    AboutComponent,
    BannerComponent,
    DownloadsComponent,
    ContactComponent,
    CategoriesComponent,
    CategoryComponent,
    ProductComponent,
    ProductCardComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    CheckoutComponent,
    ConfirmationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatBadgeModule,
    MatNativeDateModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
      CategoriesService,
      ServicesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule 
{ 

    constructor(router: Router, viewportScroller: ViewportScroller) 
    {
        router.events.pipe(
            filter((e): e is Scroll => e instanceof Scroll)
        ).subscribe(e => 
        {
            if (e.position) 
            {
                // backward navigation
                //console.log('backward navigation');
                viewportScroller.scrollToPosition(e.position);
            } 
            else if (e.anchor) 
            {
                // anchor navigation
                //console.log('anchor navigation');
                viewportScroller.scrollToAnchor(e.anchor);
            } 
            else 
            {
                // forward navigation
                //console.log('forward navigation');
                viewportScroller.scrollToPosition([0, 0]);
            }
        });
    }
    
}
