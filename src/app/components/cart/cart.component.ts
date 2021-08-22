import { Component, OnInit, Inject } from '@angular/core';
import { FormControl} from '@angular/forms';

import { ServicesService, Service, HandymanCart, CartItem } from '../../services/services.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit 
{
    _handymanCart: HandymanCart;
    
    constructor(private _cartService: CartService,
                private _servicesService: ServicesService,
                private _router: Router,
                private _dialog: MatDialog) 
    {
    }
    
    ngOnInit(): void 
    {
        this._handymanCart = this._cartService.getLocalStorageCart();
    }

    onDeleteClick(index: number)
    {
        this._cartService.removeItem(index);
        this._handymanCart.items[index].cantidad = 0;

        this._handymanCart = this._cartService.getLocalStorageCart();
    }

    contratarServicio()
    {
        console.log('check-out');
        this._router.navigate(['/checkout']);
    }

    public openProduct (id: string)
    {
        this._router.navigate(['/product', id]);
    }  
    
    public emptyCart()
    {
        const dialogRef = this._dialog.open(CartEmptyDialog);

        dialogRef.afterClosed().subscribe(result => {
          //console.log(`Dialog result: ${result}`);

          if (result && result === "Si")
          {
              localStorage.clear();
              this._handymanCart = this._cartService.getLocalStorageCart();
              this._cartService.onUpdate(this._handymanCart);
            }
  
        });
    }
}

@Component({
    selector: 'cart-empty-dialog',
    templateUrl: 'cart-empty.dialog.html',
  })
export class CartEmptyDialog 
{

    constructor(public dialogRef: MatDialogRef<CartEmptyDialog>, 
                @Inject(MAT_DIALOG_DATA) public data: string) 
    { }
    
    onClick(result): void 
    {
        this.dialogRef.close(result);
    }

}