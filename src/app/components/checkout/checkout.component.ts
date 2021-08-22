import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from '../../services/cart.service';
import { HandymanCart, ServicesService } from '../../services/services.service';
import { State, City, Zone } from '../../services/country.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { CountryService } from '../../services/country.service';
import { CheckoutService } from '../../services/checkout.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
    _frmCheckout: FormGroup;

    _depatamentos: State[] = [];
    _handymanCart: HandymanCart;
    loading = false;
    submitted = false;
    
    _currentState: State = { id:"", nombre:"", cities:[] };
    _currentCity: City =   { id:"", nombre:"", zones:[] };
    _currentZone: Zone =   { id:"", nombre:""};

    constructor(private _cartService: CartService,
                private _router: Router,
                private _dialog: MatDialog,
                private formBuilder: FormBuilder,
                private alertService: AlertService,
                private _servicesService: ServicesService,
                private _countryService: CountryService,
                private _checkoutService: CheckoutService,
          ) 
    {
        this.crearFormulario();
        this.cargarDatos();        
    }
    
    crearFormulario()
    {
        this._depatamentos = this._countryService.getStates();
        this._handymanCart = this._cartService.getLocalStorageCart();

        this._frmCheckout = this.formBuilder.group({
            nombre: ['', [Validators.required, Validators.minLength(6)]],
            email: ['', Validators.required],
            telefono: ['', Validators.required],
            direccion: ['', Validators.required],
            departamento: ['', Validators.required],
            municipio: ['', Validators.required],
            zona: ['', Validators.required],
            fecha: ['', Validators.required],
            hora: ['', Validators.required],
            comentarios: [''],
            metodoPago: ['', Validators.required],
            nit: ['', Validators.required],
            nombreFacturacion: ['', Validators.required],
        });
    }    

    cargarDatos()
    {
        this._frmCheckout.setValue({
            nombre: '',
            email: '',
            telefono: '',
            direccion: '',
            departamento: '09',
            municipio: '',
            zona: '',
            fecha: '',
            hora: '',
            comentarios: '',
            metodoPago: '1',
            nit: 'CF',
            nombreFacturacion: 'Consumidor final',
        });


        //Pruebas
        this._frmCheckout.setValue({
            nombre: 'Nery Marroquin',
            email: 'nery.marroquin@gmail.com',
            telefono: '59908957',
            direccion: 'Prados de San Cristobal Casa T22',
            departamento: '09',
            municipio: '',
            zona: '',
            fecha: '30/04/2021',
            hora: '15:00',
            comentarios: 'Prueba de CheckOut',
            metodoPago: '1',
            nit: 'CF',
            nombreFacturacion: 'Consumidor final',
        });        

        this.onStateChange("");        
    }

    limpiarFormulario()
    {
        this._frmCheckout.reset(); //borrar todo

        this._frmCheckout.reset({ //borra todo y pone valores por defecto
            nombre: ''
        }); 
    }

    ngOnInit(): void 
    {
    }    

    ngAfterContentInit()
    {
        //this._frmCheckout.controls.departamento.setValue("09");
        // this.f.departamento.setValue("09");
        //this.onStateChange("");
    }

    get validator_nombre()
    {
        return this._frmCheckout.get('nombre').invalid && this._frmCheckout.get('nombre').touched;
    }
    get validator_email()
    {
        return this._frmCheckout.get('email').invalid && this._frmCheckout.get('email').touched;
    }
    get validator_telefono()
    {
        return this._frmCheckout.get('telefono').invalid && this._frmCheckout.get('telefono').touched;
    }
    get validator_direccion()
    {
        return this._frmCheckout.get('direccion').invalid && this._frmCheckout.get('direccion').touched;
    }
    get validator_departamento()
    {
        return this._frmCheckout.get('departamento').invalid && this._frmCheckout.get('departamento').touched;
    }
    get validator_municipio()
    {
        return this._frmCheckout.get('municipio').invalid && this._frmCheckout.get('municipio').touched;
    }
    get validator_zona()
    {
        return this._frmCheckout.get('zona').invalid && this._frmCheckout.get('zona').touched;
    }
    get validator_fecha()
    {
        return this._frmCheckout.get('fecha').invalid && this._frmCheckout.get('fecha').touched;
    }
    get validator_hora()
    {
        return this._frmCheckout.get('hora').invalid && this._frmCheckout.get('hora').touched;
    }
    get validator_comentarios()
    {
        return this._frmCheckout.get('comentarios').invalid && this._frmCheckout.get('comentarios').touched;
    }
    get validator_metodoPago()
    {
        return this._frmCheckout.get('metodoPago').invalid && this._frmCheckout.get('metodoPago').touched;
    }
    get validator_nit()
    {
        return this._frmCheckout.get('nit').invalid && this._frmCheckout.get('nit').touched;
    }
    get validator_nombreFacturacion()
    {
        return this._frmCheckout.get('nombreFacturacion').invalid && this._frmCheckout.get('nombreFacturacion').touched;
    }

    onStateChange(event)
    {
        let departamento = this._frmCheckout.controls.departamento.value;

        this._currentState = this._countryService.getStateById(departamento)[0];

        this._frmCheckout.controls.municipio.setValue(this._currentState.cities[0].id);
        this.onCityChange("");

     }
    
     onCityChange(event)
     {
         let municipio = this._frmCheckout.controls.municipio.value;

         this._currentCity = this._countryService.getCityById(this._currentState.cities, municipio)[0];

         this._frmCheckout.controls.zona.setValue(this._currentCity.zones[0].id);
     }

     onSubmit() 
     {
         if (this._frmCheckout.invalid) 
         {
             Object.values( this._frmCheckout.controls ).forEach( control => {
                 control.markAsTouched();
             });
 
             return;
         }
 
         this.loading = true;

         this._checkoutService.efectuarCheckout( this._frmCheckout.value )
              .pipe(first())
              .subscribe(
                  data => {
                    console.log('La Solicitud de trabajo fue enviada exitósamente.');
                    this.alertService.success('La Solicitud de trabajo fue enviada exitósamente.');
                    this.limpiarFormulario();
                    this.loading = false;
                    // this._router.navigate(['/confirmation']);
                    //this.router.navigate([this.returnUrl]);
                  },
                  error => {
                      console.log('Ocurrió un error al enviar la Solicitud de trabajo, por favor comunicate al teléfono: 5990-8957');
                      this.alertService.error('Ocurrió un error al enviar la Solicitud de trabajo, por favor comunicate al teléfono: 5990-8957');
                      this.loading = false;
                     });

     }        

}
