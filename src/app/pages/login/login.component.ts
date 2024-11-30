import { Component, inject, OnDestroy } from '@angular/core';
 import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
 import { MatButtonModule } from '@angular/material/button';
 import { MatInputModule } from '@angular/material/input';

 import { Router } from '@angular/router';
 import { Subscription } from 'rxjs';
import { LoginCredentials, LoginService } from '../../services/login.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule,   MatFormFieldModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {

  private formBuilder = inject(FormBuilder);
  private loginService = inject(LoginService);
  private router = inject(Router);

  private loginSubscripton: Subscription | null = null;

  loginFormGroup = this.formBuilder.group({
    'username': ['', [Validators.required]],
    'password': ['', [Validators.required]]
  });

  invalidCredentials = false;

  login() {
    this.loginSubscripton = this.loginService.login( this.loginFormGroup.value as LoginCredentials ).subscribe({
      next: result => { this.navigateHome(); },
      error: error => { this.invalidCredentials = true; }
    });
  }

  navigateHome() {
    this.router.navigate(['home']);
  }

  ngOnDestroy(): void {
    this.loginSubscripton?.unsubscribe();
  }

}