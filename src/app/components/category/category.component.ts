import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '../../services/categories.service';
import { ServicesService, Service } from '../../services/services.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit 
{
    _id_category: string;
    _category: Category;
    _services: Service[] = [];
    
    constructor( private _activatedRoute:   ActivatedRoute, 
                private _categoriesService: CategoriesService,
                private _servicesService:   ServicesService,
                private _router:            Router) 
    { 
        this._activatedRoute.params.subscribe( params => {

            this._id_category = params['id'];
            this.loadCategory(this._id_category);
        });
    }
    
    ngOnInit(): void 
    {
        this.loadServices();
    }

    async loadCategory(id: string)
    {
        let loading = true;
        let errorMessage = '';

        this._category = await this._categoriesService.getCategory(id).toPromise()
            .catch( error => console.error('No se pudo cargar la categoría.') );
    }

    async loadServices()
    {
        let loading = true;
        let errorMessage = '';

        await this._servicesService.getServicesByCategory(this._id_category).toPromise()
            .then( response => { 
                loading = false;
                this._services = response;
            })
            .catch( error => { 
                loading = false;
                errorMessage = error;
                console.error('No se pudieron listar los servicios.');
            });

    }    
    
}
