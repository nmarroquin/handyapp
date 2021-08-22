import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ElementRef, Renderer2, ViewChild } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent 
{
    @ViewChild('mat_content', {read: ElementRef}) mat_content:ElementRef;

    title = 'Handy App';

    constructor(private router: Router,
                private rd: Renderer2)
    {}

    onActivate(event: Event) 
    {
        // let drawer = this.mat_content.nativeElement as HTMLElement;
        // console.log('before: ', drawer.scrollTop);
        // drawer.scrollTop = 0;
        // console.log('after: ', drawer.scrollTop);
    } 
}


