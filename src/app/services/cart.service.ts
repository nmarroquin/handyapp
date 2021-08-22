import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HandymanCart, Service, CartItem } from './services.service';
import { Variant } from './variant.service';


@Injectable({
    providedIn: 'root'
  })
export class CartService 
{
    private subject = new Subject<any>();
      
    constructor() 
    {
    }

    getCart(): Observable<any> 
    {
        return this.subject.asObservable();
    }

    getLocalStorageCart()
    {
        let _cart: HandymanCart;

        _cart = JSON.parse( localStorage.getItem('handyman_cart') );

        if (!_cart)
            _cart = { items: [], total: 0, validItems: 0, totalItems: 0, personalizado: false };

        return _cart;
    }

    addItem(cantidad: number, service: Service, variante: Variant, sumar: number, personalizadoDetalle: boolean, comentarios: string)
    {
        let _cart: HandymanCart;
        let _item: CartItem;

        _cart = JSON.parse( localStorage.getItem('handyman_cart') );

        if (!_cart)
            _cart = { items: [], total: 0, validItems: 0, totalItems: 0, personalizado: false };

        _item = { 
            cantidad, 
            service,
            variante,
            comentarios
        };

        _cart.items.push(_item);
        _cart.validItems = this.calcValidItems( _cart.items );
        _cart.total = this.calcTotal ( _cart.items );
        _cart.totalItems = this.calcTotalItems( _cart.items );
        _cart.personalizado = this.calcPersonalizado( _cart.items);

        localStorage.setItem('handyman_cart', JSON.stringify(_cart));

        this.onUpdate( _cart );
    }

    calcValidItems (items: CartItem[])
    {
        let validItems = 0;

        items.forEach(item => {
            if (item.cantidad > 0)
                validItems++;
        });

        return validItems;
    }

    calcTotalItems (items: CartItem[])
    {
        console.log('items ', items.length);

        return items.length;
    } 

    calcPersonalizado (items: CartItem[])
    {
        let personalizado = false;

        items.forEach(item => {
            if (item.cantidad > 0 && (item.service.personalizado || item.variante.personalizado))
                personalizado = true;
        });

        return personalizado;
    } 

    calcTotal (items: CartItem[])
    {
        let total = 0;

        items.forEach(item => {
            if (item.cantidad > 0)
            {
                let precio = +item.service.precio;
                let sumar = +item.variante.sumar;
                total += (item.cantidad * (precio + sumar));
            }
        });

        return total;
    }

    removeItem(index: number)
    {
        let _cart: HandymanCart;
        let _item: CartItem;

        _cart = JSON.parse( localStorage.getItem('handyman_cart') );

        if (!_cart)
            _cart = { items: [], total: 0, validItems: 0, totalItems: 0, personalizado: false };

        _cart.items[index].cantidad = 0;
        _cart.validItems = this.calcValidItems( _cart.items );
        _cart.total = this.calcTotal ( _cart.items );
        _cart.totalItems = this.calcTotalItems( _cart.items );
        _cart.personalizado = this.calcPersonalizado( _cart.items);

        localStorage.setItem('handyman_cart', JSON.stringify(_cart));

        console.log(_cart);

        this.onUpdate( _cart );
    }



    // getAlert(): Observable<any> 
    // {
    //     return this.subject.asObservable();
    // }
  
    //   success(message: string, keepAfterRouteChange = false) {
    //       this.keepAfterRouteChange = keepAfterRouteChange;
    //       this.subject.next({ type: 'success', text: message });
    //   }
  
    //   error(message: string, keepAfterRouteChange = false) {
    //       this.keepAfterRouteChange = keepAfterRouteChange;
    //       this.subject.next({ type: 'error', text: message });
    //   }
  
    //   clear() {
    //       // clear by calling subject.next() without parameters
    //       this.subject.next();
    //   }

    onUpdate(cart: HandymanCart)
    {
        this.subject.next(cart);                
    }
  
}
  