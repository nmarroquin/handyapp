import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { first } from 'rxjs/operators';

import { ContactService } from '../../services/contact.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit 
{
    _frmContacto:FormGroup;
    loading = false;

    constructor( 
        private _formBuilder:FormBuilder,
        private contactService: ContactService,
        private alertService: AlertService
         ) 
    { 
        this.crearFormulario();
        this.cargarDatos();
    }

    crearFormulario()
    {
        this._frmContacto = this._formBuilder.group({
            nombre: ['', [Validators.required, Validators.minLength(5)]],
            telefono: ['', [Validators.required]],
            correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
            asunto: ['', [Validators.required, Validators.minLength(5)]],
            mensaje: ['', [Validators.required, Validators.minLength(5)]]
        });
    }

    cargarDatos()
    {
        this._frmContacto.setValue({
            nombre: '',
            telefono: '',
            correo: '',
            asunto: '',
            mensaje: ''
        });
    }

    limpiarFormulario()
    {
        this._frmContacto.reset(); //borrar todo

        this._frmContacto.reset({ //borra todo y pone valores por defecto
            nombre: ''
        }); 
    }

    ngOnInit(): void 
    {
    }

    get validator_nombre()
    {
        return this._frmContacto.get('nombre').invalid && this._frmContacto.get('nombre').touched;
    }
    get validator_telefono()
    {
        return this._frmContacto.get('telefono').invalid && this._frmContacto.get('telefono').touched;
    }
    get validator_correo()
    {
        return this._frmContacto.get('correo').invalid && this._frmContacto.get('correo').touched;
    }
    get validator_asunto()
    {
        return this._frmContacto.get('asunto').invalid && this._frmContacto.get('asunto').touched;
    }
    get validator_mensaje()
    {
        return this._frmContacto.get('mensaje').invalid && this._frmContacto.get('mensaje').touched;
    }

    onSubmit() 
    {
        if (this._frmContacto.invalid) 
        {
            Object.values( this._frmContacto.controls ).forEach( control => {
                control.markAsTouched();
            });

            return;
        }

        this.loading = true;
        this.contactService.enviarMensaje( this._frmContacto.value )//this.f.username.value, this.f.password.value)
             .pipe(first())
             .subscribe(
                 data => {
                    console.log('Tu mensaje ha sido enviado exitosamente, pronto nos comunicaremos contigo.');
                    this.alertService.success('Tu mensaje ha sido enviado exitosamente, pronto nos comunicaremos contigo.');
                    this.limpiarFormulario();
                    this.loading = false;
                    //this.router.navigate([this.returnUrl]);
                 },
                 error => {
                     console.log('Ocurrió un error al enviar tu mensaje, por favor comunicate al teléfono: 5990-8957');
                     this.alertService.error('Ocurrió un error al enviar tu mensaje, por favor comunicate al teléfono: 5990-8957');
                     this.loading = false;
                    });
    }    

}
