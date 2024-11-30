import { Component, computed, inject, model, signal } from '@angular/core';
import { RouterOutlet,Router } from '@angular/router';
import { PlayingCardComponent } from './components/playing-card/playing-card.component';
import { Monster } from './monster/monster.model';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MonsterType } from './utils/monster.utils';
import { CommonModule } from '@angular/common';
import { MonsterService } from './services/monster/monster.service';
import { LoginService } from './services/login.service';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet,MatIconModule, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
	private router = inject(Router);
 	loginService = inject(LoginService);

 	logout() {
 		this.loginService.logout().subscribe({
 			next: _ => { this.navigateToLogin(); },
 			error: _ => { this.navigateToLogin(); }
 		})
 	}

 	navigateToLogin() {
 		this.router.navigate(['login']);
 	}

 	navigateHome() {
 		this.router.navigate(['home']);
 	}


}