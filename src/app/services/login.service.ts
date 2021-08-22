import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppSettings } from '../app.settings';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class LoginService 
{
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    
    constructor( private http:HttpClient ) 
    { 
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();    
    }

    public get currentUserValue(): User 
    {
        return this.currentUserSubject.value;
    }    
    
    authenticate(email:String, password:String): Observable<any>
    {
        return this.http.post<any>('/api/login', { email, password })
                    .pipe(map(response => {
                        let usuario = new User();
                        usuario._id = response.usuario._id;
                        usuario.email = response.usuario.email; 
                        usuario.nombre = response.usuario.nombre;
                        usuario.role = response.usuario.role;
                        usuario.estado = response.usuario.estado;
                        usuario.google = response.usuario.google
                        usuario.token = response.token;

                        localStorage.setItem('currentUser', JSON.stringify(usuario));
                        this.currentUserSubject.next(usuario);
                        return usuario;
                    }));
    }
    
    logout() 
    {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }    
    
}