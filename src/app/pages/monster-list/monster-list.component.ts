import { Component, computed, inject, model, signal } from '@angular/core';
import { MonsterService } from '../../services/monster/monster.service';
import { Monster } from '../../monster/monster.model';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { PlayingCardComponent } from '../../components/playing-card/playing-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-monster-list',
  imports: [FormsModule,CommonModule,SearchBarComponent,PlayingCardComponent],
  templateUrl: './monster-list.component.html',
  styleUrl: './monster-list.component.css'
})
export class MonsterListComponent {

	monsterService = inject(MonsterService);
	monsters = signal<Monster[]>([]);
	search = model('');

	filteredMonsters = computed(() => {
		return this.monsters().filter(monster => monster.name.includes(this.search()));
	});

	constructor() {
		this.monsters.set(this.monsterService.getAll());
	}

	addMonster() {
		const genericMonster = new Monster();
		this.monsterService.add(genericMonster);
		this.monsters.set(this.monsterService.getAll());
	}

}
