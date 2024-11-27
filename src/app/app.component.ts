import { Component, computed, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlayingCardComponent } from './components/playing-card/playing-card.component';
import { Monster } from './monster/monster.model';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MonsterType } from './utils/monster.utils';

@Component({
  selector: 'app-root',
  imports: [  PlayingCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

	
	count: number = 0;
	monsters!: Monster[];
	selectedMonsterIndex = signal( 0);
	selectedMonster = computed(()=>{
		return this.monsters[this.selectedMonsterIndex()];
	})

	constructor() {
		this.monsters = [];
		effect(()=>{
			console.log(this.selectedMonster());
		})

		const monster1 = new Monster();
		monster1.name = "Pik";
		monster1.hp = 40;
		monster1.figureCaption = "N°002 Pik";
		this.monsters.push(monster1);

		const monster2 = new Monster();
 		monster2.name = "Car";
 		monster2.image = "assets/img/car.png";
 		monster2.type = MonsterType.WATER;
 		monster2.hp = 60;
 		monster2.figureCaption = "N°003 Car";
		this.monsters.push(monster2);
	}

	toggleMonster() {
		this.selectedMonsterIndex.set((this.selectedMonsterIndex() + 1) % this.monsters.length);
	}
}