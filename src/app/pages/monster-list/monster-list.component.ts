import { Component, computed, inject, model, signal } from '@angular/core';
import { MonsterService } from '../../services/monster/monster.service';
import { Monster } from '../../monster/monster.model';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { PlayingCardComponent } from '../../components/playing-card/playing-card.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-monster-list',
  imports: [FormsModule,CommonModule,SearchBarComponent,PlayingCardComponent],
  templateUrl: './monster-list.component.html',
  styleUrl: './monster-list.component.css'
})
export class MonsterListComponent {

	monsterService = inject(MonsterService);
	router = inject(Router);
	monsters = signal<Monster[]>([]);
	search = model('');

	filteredMonsters = computed(() => {
		return this.monsters().filter(monster => monster.name.includes(this.search()));
	});

	constructor() {
		this.monsters.set(this.monsterService.getAll());
	}

	addMonster() {
		this.router.navigate(['monster'])
	}
	openMonster(monster: Monster){
		this.router.navigate(['monster', monster.id])

	}

}
