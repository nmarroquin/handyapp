import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { LoginService } from '../../services/login.service';
import { AlertService } from '../../services/alert.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit 
{
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    
    constructor(
        private formBuilder: FormBuilder,
        private _activatedRoute: ActivatedRoute,
        private router: Router,
        private loginService: LoginService,
        private alertService: AlertService)
    {
        this._activatedRoute.params.subscribe( params => {
            if (params['action'] && params['action'] === 'logout')
            {
                this.loginService.logout();
                this.router.navigate(['/']);
                this.alertService.success( 'Gracias por visitarnos, esperamos verte pronto.' );
                return;
            }
        });

        if (this.loginService.currentUserValue) 
        {
            this.router.navigate(['/']);
            this.alertService.success( 'Bienvenido de nuevo ' + this.loginService.currentUserValue.nombre);
            return;
        }
    }
    
    ngOnInit(): void 
    {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this._activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() 
    {
        this.submitted = true;

        // reset alerts on submit
        //this.alertService.clear();

        // stop here if form is invalid
        if (this.loginForm.invalid) 
        {
            return;
        }

        this.loading = true;
        this.loginService.authenticate(this.f.username.value, this.f.password.value)
             .pipe(first())
             .subscribe(
                 data => {
                    console.log('Success:', data);
                    this.loading = false;
                    this.router.navigate([this.returnUrl]);
                    this.alertService.success('Bienvenido ' + data.nombre);
                 },
                 error => {
                     console.log('Error:', error.error.message);
                     this.alertService.error(error.error.message);
                     this.loading = false;
                 });
        
            //this.loginService.authenticate(this.f.username.value, this.f.password.value).subscribe( res => {
            //console.log(res);
            //});
    }    
}
