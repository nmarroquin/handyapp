import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../services/services.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit 
{
    
    @Input() item_product:Service;
    
    constructor(private _router:Router) 
    { }
    
    ngOnInit(): void 
    {
    }
    
    public openProduct ()
    {
        this._router.navigate(['/product', this.item_product.id]);
    }  
    
}
