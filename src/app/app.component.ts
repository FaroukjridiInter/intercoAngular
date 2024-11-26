import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlayingCardComponent } from './components/playing-card/playing-card.component';
import { Monster } from './monster/monster.model';

@Component({
  selector: 'app-root',
  imports: [PlayingCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
	monster1!: Monster;

	constructor() {
		this.monster1 = new Monster();
		this.monster1.name = "Pik";
		this.monster1.hp = 40;
		this.monster1.figureCaption = "N°002 Pik";
	}
}
