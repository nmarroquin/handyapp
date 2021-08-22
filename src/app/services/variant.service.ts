import { AppSettings } from '../app.settings';

import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

@Injectable(
{
    providedIn: 'root'
})
export class VariantService 
{

    private variantes:Variant[] = [];

    constructor( private _http: HttpClient ) 
    { 
    }

    public getVariants(): Observable<any>
    {
        return this._http.get(AppSettings.API_BACK_END + '/api/variant', {
                                headers: { 'appId':     AppSettings.APP_ID },
                                params:  { 'pagina':    '0', 
                                           'registros': '100', 
                                           'estado':    'true'}
                            })
                            .pipe( map( (resp:any) => resp.data.map( variante => ({ id:            variante.id,
                                                                                    servicio:      variante.servicio, 
                                                                                    nombre:        variante.nombre, 
                                                                                    sumar:         variante.sumar,
                                                                                    personalizado: variante.personalizado,
                                                                                    estado:        variante.estado}) 
                            ))
        );
    }
    
    public getVariantsByService(servicio: string): Observable<any>
    {
        return this._http.get(AppSettings.API_BACK_END + '/api/variant', {
                                headers: { 'appId':     AppSettings.APP_ID },
                                params:  { 'pagina':    '0', 
                                           'registros': '100', 
                                           'estado':    'true',
                                           'service':   servicio}
                            })
                            .pipe( map( (resp:any) => resp.data.map( servicio => ({ id:            servicio.id,
                                                                                    servicio:      servicio.servicio, 
                                                                                    nombre:        servicio.nombre, 
                                                                                    sumar:         servicio.sumar,
                                                                                    personalizado: servicio.personalizado,
                                                                                    estado:        servicio.estado}) 
                            ))
        );        
    }
    
    public getVariant(id:string): Observable<any>
    {
        return this._http.get(AppSettings.API_BACK_END + '/api/variant/' + id, {
            headers: { 'appId':     AppSettings.APP_ID },
            params:  { }
        })
        .pipe( map( (resp:any) => resp.data )
        );

    } 
    
    public searchService(search:string):Variant[] //No implementado
    {
        let serviciosSearch:Variant[] = [];

    //     if (search != "" && search.length > 1)
    //     {
    //         let servicio:Service;
    //         let servicio:Category;

    //         search = search.toLowerCase();

    //         for (let i=0; i<this.servicios.length; i++)
    //         {
    //             servicio = this.servicios[i];
    //             servicio = this._categoriesService.getCategory(servicio.servicio);

    //             let nombre:string = servicio.nombre.toLowerCase();
    //             let nombreservicio:string = servicio.nombre.toLowerCase();

    //             if (nombre.indexOf( search ) >= 0 || nombreservicio.indexOf ( search ) >= 0)
    //             {
    //                 serviciosSearch.push( servicio );
    //             }
    //         }
    //     }

        return serviciosSearch;
    }    

}

export interface Variant
{
    id:             string,
    servicio:       string,
    nombre:         string,
    sumar:          number,
    personalizado?: boolean,
    estado?:        string,
    //materiales?: ServiceMaterial[],
}