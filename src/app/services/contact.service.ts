import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppSettings } from '../app.settings';

@Injectable({
  providedIn: 'root'
})
export class ContactService 
{
    
    constructor( private http:HttpClient ) 
    { }
    
    enviarMensaje(userParams: any): Observable<any>
    {
        let nombre = userParams.nombre;
        let telefono = userParams.telefono;
        let email = userParams.correo;
        let asunto = userParams.asunto;
        let mensaje = userParams.mensaje;

        let body   = { nombre, telefono, email, asunto, mensaje };
        let header = { headers: { 'appId': AppSettings.APP_ID } };

        return this.http.post<any>(AppSettings.API_BACK_END + '/api/contacto', body, header).pipe(map(response => {
            return response;
        }));
    }
}
