import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ServicesService, Service, HandymanCart, CartItem } from '../../services/services.service';
import { CategoriesService, Category } from '../../services/categories.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { VariantService, Variant } from '../../services/variant.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit 
{
    productForm: FormGroup;
    _service_id: string;
    _service:    Service;
    _variants:   Variant[];
    _variante:   Variant;
    _category:   Category;
    _contratar:  boolean;

    _cantidad:number;
    _precioTotal:number;
    _precio:number;
    _sumar:number;
    _personalizado:boolean;
    _personalizadoDetalle:boolean;
    _comentarios:string;

    get formControls() { return this.productForm.controls; }
    
    constructor(private _router:Router,
                private formBuilder: FormBuilder,
                private _activatedRoute:ActivatedRoute,
                private _servicesService:ServicesService,
                private _variantService:VariantService,
                private _categoriesService:CategoriesService,
                private _cartService:CartService) 
    { 
        this._activatedRoute.params.subscribe( params => {

            this._service_id = params['id'];

            this.loadService(this._service_id);
        });

        this._category = { id:'0', nombre:'', descripcion:'', icon:'', image:'', estado:'1'};

        this.productForm = this.formBuilder.group({
            varianteId: [(this._variante ? this._variante.id : ''), Validators.required],
            cantidad: [1, Validators.required],
            precioTotal: ['', Validators.required],
            comentarios: [''],
        });    
    }

    async loadService(id: string)
    {
        let loading = true;
        let errorMessage = '';

        await this._servicesService.getService(id).toPromise()
            .then( service => {

                this._service = service;
                this.loadCategory( this._service.categoria );
                this.loadVariants();

            })
            .catch( error => console.error('No se pudo cargar el servicio.', error) );
    }  

    async loadVariants()
    {
        if (this._service)
        {
            await this._variantService.getVariantsByService(this._service.id).toPromise()
            .then( variants => {
                this._variants = variants;
                if (this._variants && this._variants.length > 0)
                    this._variante = this._variants[0];
            })
            .catch( error => console.error('No se pudieron cargar las variantes.', error) );

            if (this._service.variantes == 0)
                this._variante = { servicio: this._service.id, id: this._service.id, nombre: this._service.nombre, sumar: 0.00, personalizado: false };

            this.productForm.controls['varianteId'].setValue( this._variante.id );
        }

        this.onChange_varianteId(null);
    }

    async loadCategory(id: string)
    {
        let loading = true;
        let errorMessage = '';

        this._category = await this._categoriesService.getCategory(id).toPromise()
            .catch( error => console.error('No se pudo cargar la categoría.') );
    }    
    
    ngOnInit(): void 
    {
        this._cantidad = 1;
        this._sumar = 0;
        this._precioTotal = 0;

        if (this._service)
            this._precioTotal = this._service.precio;
    }

    contratarServicio()
    {
        this._contratar = true;
        this._comentarios = this.formControls.comentarios.value;

        if (this._service.variantes == 0)
            this._variante = { servicio: this._service.id, id: this._service.id, nombre: this._service.nombre, sumar: 0.00, personalizado: false };
        
        this._cartService.addItem(this._cantidad, this._service, this._variante, this._sumar, this._personalizadoDetalle, this._comentarios);

        this._router.navigateByUrl('/cart');    
    }
    
    onChange_varianteId(event)
    {
        if (this._service)
        {
            this._cantidad = this.formControls.cantidad.value;

            if (this._variants)
                this._variante = this._variants.find(variante => variante.id == this.formControls.varianteId.value );
            

            if (this._variante)
            {
                this._sumar = +this._variante.sumar;
                this._precio = +this._service.precio;
                this._personalizadoDetalle = this._variante.personalizado;
        
                this._precioTotal = this._cantidad * (this._precio + this._sumar);
            }
        }
    }


}
