import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppSettings } from '../app.settings';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService 
{
    
    constructor( private http:HttpClient ) 
    { }
    
    efectuarCheckout(userParams: any): Observable<any>
    {
        let nombre = userParams.nombre;
        let email = userParams.email;
        let telefono = userParams.telefono;
        let direccion = userParams.direccion;
        let departamento = userParams.departamento;
        let municipio = userParams.municipio;
        let zona = userParams.zona;
        let fecha = userParams.fecha;
        let hora = userParams.hora;
        let comentarios = userParams.comentarios;
        let metodoPago = userParams.metodoPago;
        let nit = userParams.nit;
        let nombreFacturacion = userParams.nombreFacturacion;


        let body   = { nombre, email, telefono };
        let header = { headers: { 'appId': AppSettings.APP_ID } };

        return this.http.post<any>(AppSettings.API_BACK_END + '/api/checkout', body, header)
                    .pipe(map(response => {
                        console.log(response);
                        return response;
                    }));

        // return this.http.post<any>('/api/contacto', { nombre, telefono, email, asunto:'CheckOut', mensaje:'Prueba de CheckOut' })
        // .pipe(map(response => {
        //     return response;
        // }));                    
    }
}
