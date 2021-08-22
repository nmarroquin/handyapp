import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit 
{
    @Output() public sidenavToggle = new EventEmitter();

    constructor() 
    { }

    ngOnInit(): void 
    {
    }

    onToggleSidenav = () => {
        this.sidenavToggle.emit();
    }    
}
