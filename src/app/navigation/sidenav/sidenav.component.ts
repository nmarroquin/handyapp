import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit 
{
    @Output() sideNavClosed = new EventEmitter();
    
    constructor(private router: Router) 
    { }
    
    ngOnInit(): void 
    {
    }
    
    onClick(route: string) 
    {
        this.router.navigateByUrl(route);
        this.sideNavClosed.emit(); 
    }    
}
