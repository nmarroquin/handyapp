import { AppSettings } from '../app.settings';

import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

@Injectable()
export class CategoriesService
{
    private categorias:Category[] = [];

    constructor( private _http: HttpClient )
    {
    }

    public getCategories(): Observable<any>
    {
        return this._http.get(AppSettings.API_BACK_END + '/api/category', {
                                headers: { 'appId':     AppSettings.APP_ID },
                                params:  { 'pagina':    '0', 
                                           'registros': '100', 
                                           'estado':    'true'}
                            })
                            .pipe( map( (resp:any) => resp.data.map( categoria => ({ id:         categoria.id,
                                                                                    nombre:      categoria.nombre, 
                                                                                    descripcion: categoria.descripcion, 
                                                                                    icon:        categoria.icon, 
                                                                                    image:       categoria.image, 
                                                                                    estado:      categoria.estado}) 
                            ))
        );
    }    

    public getCategory(id:string): Observable<any>
    {
        return this._http.get(AppSettings.API_BACK_END + '/api/category/' + id, {
            headers: { 'appId':     AppSettings.APP_ID },
            params:  { }
        })
        .pipe( map( (resp:any) => resp.data )
        );
    }
}

export interface Category
{
    id:          string,
    nombre:      string,
    descripcion: string,
    icon:        string,
    image:       string,
    estado:      string
}
