import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from '../../services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit 
{
    _categorias:Category[] = [];

    _offers:String[] = [];
    _offersMovil:String[] = [];

    _mainOffer:String;
    _mainOfferMovil:String;

    _banners:String[] = [];
    _bannersMovil:String[] = [];

    _mainBanner:String;
    _mainBannerMovil:String;
    


    constructor(private _categoriesService:CategoriesService,
                private _router:Router) 
    { 
        this._offers.push("assets/img/offers/01.jpg");
        this._offers.push("assets/img/offers/02.jpg");
        this._offers.push("assets/img/offers/03.jpg");
        this._offers.push("assets/img/offers/04.jpg");
        this._offers.push("assets/img/offers/05.jpg");
        this._offers.push("assets/img/offers/06.jpg");
        this._offers.push("assets/img/offers/07.jpg");
        this._offers.push("assets/img/offers/08.jpg");
        this._offers.push("assets/img/offers/09.jpg");
        this._offers.push("assets/img/offers/10.jpg");

        this._offersMovil.push("assets/img/offers/m01.jpg");
        this._offersMovil.push("assets/img/offers/m02.jpg");

        this._mainOffer = this._offers[0];
        this._mainOfferMovil = this._offersMovil[0];

        this._offers.shift();
        this._offersMovil.shift();




        this._banners.push("assets/img/banner/banner-01.jpg");
        this._banners.push("assets/img/banner/banner-02.jpg");
        this._banners.push("assets/img/banner/banner-03.jpg");
        this._banners.push("assets/img/banner/banner-04.jpg");
        this._banners.push("assets/img/banner/banner-05.jpg");
        this._banners.push("assets/img/banner/banner-06.jpg");
        this._banners.push("assets/img/banner/banner-07.jpg");
        this._banners.push("assets/img/banner/banner-08.jpg");
        this._banners.push("assets/img/banner/banner-09.jpg");
        this._banners.push("assets/img/banner/banner-10.jpg");
        this._banners.push("assets/img/banner/banner-11.jpg");

        this._bannersMovil.push("assets/img/banner/banner-01.jpg");
        this._bannersMovil.push("assets/img/banner/banner-02.jpg");
        this._bannersMovil.push("assets/img/banner/banner-03.jpg");
        this._bannersMovil.push("assets/img/banner/banner-04.jpg");
        this._bannersMovil.push("assets/img/banner/banner-05.jpg");
        this._bannersMovil.push("assets/img/banner/banner-06.jpg");
        this._bannersMovil.push("assets/img/banner/banner-07.jpg");
        this._bannersMovil.push("assets/img/banner/banner-08.jpg");
        this._bannersMovil.push("assets/img/banner/banner-09.jpg");
        this._bannersMovil.push("assets/img/banner/banner-10.jpg");
        this._bannersMovil.push("assets/img/banner/banner-11.jpg");

        this._mainBanner = this._banners[0];
        this._mainBannerMovil = this._bannersMovil[0];

        this._banners.shift();
        this._bannersMovil.shift();
    }
    
    ngOnInit(): void 
    {
        this.loadCategories();
    }

    async loadCategories()
    {
        let loading = true;
        let errorMessage = '';

        await this._categoriesService.getCategories().toPromise()
            .then( response => { 
                loading = false;
                this._categorias = response;
            })
            .catch( error => { 
                loading = false;
                errorMessage = error;
                console.error('No se pudieron listar las categorías.');
            });
    }

    openCategory( id:string )
    {
        this._router.navigate(['/category', id]);
    }
}
