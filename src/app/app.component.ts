import { Component, computed, effect, inject, model, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlayingCardComponent } from './components/playing-card/playing-card.component';
import { Monster } from './monster/monster.model';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MonsterType } from './utils/monster.utils';
import { CommonModule } from '@angular/common';
import { MonsterService } from './services/monster/monster.service';

@Component({
  selector: 'app-root',
  imports: [ CommonModule, PlayingCardComponent, SearchBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

	monsterService = inject(MonsterService);
	
	count: number = 0;
	monsters= signal<Monster[]>([]);
	search = model('');
 	filteredMonsters = computed(() => {
 		return this.monsters().filter(monster => monster.name.includes(this.search()));
 	});
	/*selectedMonsterIndex = signal( 0);
	selectedMonster = computed(()=>{
		return this.monsters([this.selectedMonsterIndex()];
	})*/

	constructor() {
		this.monsters.set(this.monsterService.getAll());
	/*	effect(()=>{
			console.log(this.selectedMonster());
		})*/
	}

	addGenericMonster() {
		const monster = new Monster();
		this.monsterService.add(monster);
		this.monsters.set(this.monsterService.getAll());
	}
	/*toggleMonster() {
		this.selectedMonsterIndex.set((this.selectedMonsterIndex() + 1) % this.monsters.length);
	}*/
}