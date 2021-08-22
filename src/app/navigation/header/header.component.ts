import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { HandymanCart } from '../../services/services.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit 
{
    @Output() public sidenavToggle = new EventEmitter();
    
    private _cartSubsciption: Subscription;
    _cart: HandymanCart;
    _validItems: number;

    constructor(private _cartService: CartService) 
    { 
        this._validItems = 0;
    }
    
    ngOnInit(): void 
    {
        this._cartSubsciption = this._cartService.getCart()
        .subscribe(cart => {
            this._cart = cart;

            if (!this._cart)
            this._cart = this._cartService.getLocalStorageCart();

            if (this._cart)
                this._validItems = this._cart.validItems;
        });

        if (!this._cart)
            this._cart = this._cartService.getLocalStorageCart();

        if (this._cart)
            this._validItems = this._cart.validItems;
    }

    ngOnDestroy() 
    {
        this._cartSubsciption.unsubscribe();
    }

    onToggleSidenav = () => {
      console.log('toggle');
        this.sidenavToggle.emit();
    }        
}
