import { AppSettings } from '../app.settings';

import { Injectable } from "@angular/core";
import { Category, CategoriesService } from "./categories.service";
import { CartComponent } from '../components/cart/cart.component';

import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Variant } from './variant.service';

@Injectable()
export class ServicesService
{
    private servicios:Service[] = [];

    constructor( private _http: HttpClient, 
                 private _categoriesService:CategoriesService )
    {
    }

    public getServices(): Observable<any>
    {
        return this._http.get(AppSettings.API_BACK_END + '/api/service', {
                                headers: { 'appId':     AppSettings.APP_ID },
                                params:  { 'pagina':    '0', 
                                           'registros': '100', 
                                           'estado':    'true'}
                            })
                            .pipe( map( (resp:any) => resp.data.map( servicio => ({ id:            servicio.id,
                                                                                    servicio:      servicio.servicio, 
                                                                                    nombre:        servicio.nombre, 
                                                                                    categoria:     servicio.categoria,
                                                                                    descripcion:   servicio.descripcion, 
                                                                                    img:           servicio.img, 
                                                                                    precio:        servicio.precio,
                                                                                    personalizado: servicio.personalizado,
                                                                                    estado:        servicio.estado,
                                                                                    variantes:     servicio.variantes,
                                                                                    uom:           servicio.uom}) 
                            ))
        );
    } 

    public getServicesByCategory(categoria: string): Observable<any>
    {
        return this._http.get(AppSettings.API_BACK_END + '/api/service', {
                                headers: { 'appId':     AppSettings.APP_ID },
                                params:  { 'pagina':    '0', 
                                           'registros': '100', 
                                           'estado':    'true',
                                           'categoria': categoria}
                            })
                            .pipe( map( (resp:any) => resp.data.map( servicio => ({ id:            servicio.id,
                                                                                    servicio:      servicio.servicio, 
                                                                                    nombre:        servicio.nombre, 
                                                                                    categoria:     servicio.categoria,
                                                                                    descripcion:   servicio.descripcion, 
                                                                                    img:           servicio.img, 
                                                                                    precio:        servicio.precio,
                                                                                    personalizado: servicio.personalizado,
                                                                                    estado:        servicio.estado,
                                                                                    variantes:     servicio.variantes,
                                                                                    uom:           servicio.uom}) 
                            ))
        );        
    }

    public getService(id:string): Observable<any>
    {
        return this._http.get(AppSettings.API_BACK_END + '/api/service/' + id, {
            headers: { 'appId':     AppSettings.APP_ID },
            params:  { }
        })
        .pipe( map( (resp:any) => resp.data )
        );

    }

    public searchService(search:string):Service[] //No implementado
    {
        let serviciosSearch:Service[] = [];

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

export interface Service
{
    id:             string,
    servicio:       string,
    nombre:         string,
    categoria:      string,
    descripcion:    string,
    img:            string,
    precio?:        number,
    personalizado?: boolean,
    variantes?:     number,
    uom?:           string,
    estado:         boolean
}

export interface ServiceMaterial
{
    id: string,
    nombre: string,
    cantidad: number,
    UoM: string
}

export interface CartItem
{
    service: Service,
    variante: Variant,
    cantidad: number,
    comentarios: string,
}

export interface HandymanCart
{
    items?: CartItem[],
    validItems?: number,
    total?: number,
    totalItems: number,
    personalizado: boolean,
}

