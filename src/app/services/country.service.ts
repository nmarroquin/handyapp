import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryService 
{

    
    private estados:State[] = [
        {
            id: "01",
            nombre: "Alta Verapaz",
            cities: [
                {
                    id: "0101",
                    nombre: "Cobán",
                    zones: [
                        {
                            id: "NA",
                            nombre: "-"
                        }
                    ]
                }
            ]
        },
        {
            id: "02",
            nombre: "Baja Verapaz",
            cities: [
                {
                    id: "0201",
                    nombre: "Salamá",
                    zones: [
                        {
                            id: "NA",
                            nombre: "-"
                        }
                    ]
                }
            ]
        },
        {
            id: "03",
            nombre: "Chimaltenango",
            cities: [
                {
                    id: "0301",
                    nombre: "Chimaltenango",
                    zones: [
                        {
                            id: "NA",
                            nombre: "-"
                        }
                    ]
                }
            ]
        },        
        {
            id: "04",
            nombre: "Chiquimula",
            cities: [
                {
                    id: "0401",
                    nombre: "Chiquimula",
                    zones: [
                        {
                            id: "NA",
                            nombre: "-"
                        }
                    ]
                }
            ]
        },   
        {
            id: "06",
            nombre: "El Progreso",
            cities: [
                {
                    id: "0601",
                    nombre: "El Progreso",
                    zones: [
                        {
                            id: "NA",
                            nombre: "-"
                        }
                    ]
                }
            ]
        },   
        {
            id: "08",
            nombre: "Escuintla",
            cities: [
                {
                    id: "0801",
                    nombre: "Escuintla",
                    zones: [
                        {
                            id: "NA",
                            nombre: "-"
                        }
                    ]
                }
            ]
        },   
        {
            id: "09",
            nombre: "Guatemala",
            cities: [
                {
                    id: "0901",
                    nombre: "Guatemala",
                    zones: [
                        { id: "1", nombre: "1" },
                        { id: "2", nombre: "2" },
                        { id: "3", nombre: "3" },
                        { id: "4", nombre: "4" },
                        { id: "5", nombre: "5" },
                        { id: "6", nombre: "6" },
                        { id: "7", nombre: "7" },
                        { id: "8", nombre: "8" },
                        { id: "9", nombre: "9" },
                        { id: "10", nombre: "10" },
                        { id: "11", nombre: "11" },
                        { id: "12", nombre: "12" },
                        { id: "13", nombre: "13" },
                        { id: "14", nombre: "14" },
                        { id: "15", nombre: "15" },
                        { id: "16", nombre: "16" },
                        { id: "17", nombre: "17" },
                        { id: "18", nombre: "18" },
                        { id: "19", nombre: "19" },
                        { id: "21", nombre: "21" },
                    ]
                },
                {
                    id: "0902",
                    nombre: "Mixco",
                    zones: [
                        { id: "1", nombre: "1" },
                        { id: "2", nombre: "2" },
                        { id: "3", nombre: "3" },
                        { id: "4", nombre: "4" },
                        { id: "5", nombre: "5" },
                        { id: "6", nombre: "6" },
                        { id: "7", nombre: "7" },
                        { id: "8", nombre: "8" },
                        { id: "9", nombre: "9" },
                        { id: "10", nombre: "10" },
                        { id: "11", nombre: "11" },
                    ]
                }, 
                {
                    id: "0903",
                    nombre: "Villa Nueva",
                    zones: [
                        { id: "1", nombre: "1" },
                        { id: "2", nombre: "2" },
                        { id: "3", nombre: "3" },
                        { id: "4", nombre: "4" },
                        { id: "5", nombre: "5" },
                        { id: "6", nombre: "6" },
                        { id: "7", nombre: "7" },
                        { id: "8", nombre: "8" },
                        { id: "9", nombre: "9" },
                        { id: "10", nombre: "10" },
                        { id: "11", nombre: "11" },
                    ]
                },                                 
            ]
        },   
        {
            id: "10",
            nombre: "Huehuetenango",
            cities: [
                {
                    id: "1001",
                    nombre: "Huehuetenango",
                    zones: [
                        {
                            id: "NA",
                            nombre: "-"
                        }
                    ]
                }
            ]
        },   
        {
            id: "11",
            nombre: "Izabal",
            cities: [
                {
                    id: "1101",
                    nombre: "Puerto Barrios",
                    zones: [
                        {
                            id: "NA",
                            nombre: "-"
                        }
                    ]
                }
            ]
        },  
        {
            id: "12",
            nombre: "Jalapa",
            cities: [
                {
                    id: "1201",
                    nombre: "Jalapa",
                    zones: [
                        {
                            id: "NA",
                            nombre: "-"
                        }
                    ]
                }
            ]
        },
        {
            id: "13",
            nombre: "Jutiapa",
            cities: [
                {
                    id: "1301",
                    nombre: "Jutiapa",
                    zones: [
                        {
                            id: "NA",
                            nombre: "-"
                        }
                    ]
                }
            ]
        },            
        {
            id: "05",
            nombre: "Petén",
            cities: [
                {
                    id: "0501",
                    nombre: "Petén",
                    zones: [
                        {
                            id: "NA",
                            nombre: "-"
                        }
                    ]
                }
            ]
        },  
        {
            id: "14",
            nombre: "Quetzaltenango",
            cities: [
                {
                    id: "1401",
                    nombre: "Quetzaltenango",
                    zones: [
                        {
                            id: "NA",
                            nombre: "-"
                        }
                    ]
                }
            ]
        },  
        {
            id: "07",
            nombre: "Quiché",
            cities: [
                {
                    id: "0701",
                    nombre: "Santa Cruz del Quiché",
                    zones: [
                        {
                            id: "NA",
                            nombre: "-"
                        }
                    ]
                }
            ]
        },  
        {
            id: "15",
            nombre: "Retalhuleu",
            cities: [
                {
                    id: "1501",
                    nombre: "Retalhuleu",
                    zones: [
                        {
                            id: "NA",
                            nombre: "-"
                        }
                    ]
                }
            ]
        },  
        {
            id: "16",
            nombre: "Sacatepéquez",
            cities: [
                {
                    id: "1601",
                    nombre: "Antigua Guatemala",
                    zones: [
                        {
                            id: "NA",
                            nombre: "-"
                        }
                    ]
                }
            ]
        },  
        {
            id: "17",
            nombre: "San Marcos",
            cities: [
                {
                    id: "1701",
                    nombre: "San Marcos",
                    zones: [
                        {
                            id: "NA",
                            nombre: "-"
                        }
                    ]
                }
            ]
        },  
        {
            id: "18",
            nombre: "Santa Rosa",
            cities: [
                {
                    id: "1801",
                    nombre: "Cuilapa",
                    zones: [
                        {
                            id: "NA",
                            nombre: "-"
                        }
                    ]
                }
            ]
        },  
        {
            id: "19",
            nombre: "Sololá",
            cities: [
                {
                    id: "1901",
                    nombre: "Sololá",
                    zones: [
                        {
                            id: "NA",
                            nombre: "-"
                        }
                    ]
                }
            ]
        },  
        {
            id: "20",
            nombre: "Suchitepéquez",
            cities: [
                {
                    id: "2001",
                    nombre: "Mazatenango",
                    zones: [
                        {
                            id: "NA",
                            nombre: "-"
                        }
                    ]
                }
            ]
        },  
        {
            id: "21",
            nombre: "Totonicapán",
            cities: [
                {
                    id: "2101",
                    nombre: "Totonicapán",
                    zones: [
                        {
                            id: "NA",
                            nombre: "-"
                        }
                    ]
                }
            ]
        },  
        {
            id: "22",
            nombre: "Zacapa",
            cities: [
                {
                    id: "2201",
                    nombre: "Zacapa",
                    zones: [
                        {
                            id: "NA",
                            nombre: "-"
                        }
                    ]
                }
            ]
        },  

    ];

    
    constructor( private _http: HttpClient ) 
    { 
    }
    
    getCountries()
    {
        return this._http.get('https://restcountries.eu/rest/v2/lang/es').pipe(
            map( (resp:any[]) => resp.map( pais => ({ nombre: pais.name, codigo: pais.alpha3Code})))
        );
    }

    public getStates():State[]
    {
        return this.estados;
    }

    public getStateById(id:string):State[]
    {
        return this.estados.filter( x => x.id === id);
    }

    public getCityById(cities:City[], id:string):City[]
    {
        return cities.filter( x => x.id === id);
    }
}

export interface State
{
    id: string,
    nombre: string,
    cities: City[],
}

export interface City
{
    id: string,
    nombre: string,
    zones: Zone[],
}

export interface Zone
{
    id: string,
    nombre: string,
}