import { CommonModule } from '@angular/common';
import { Component, Input, InputSignal, OnChanges, OnInit, SimpleChanges, computed, input} from '@angular/core';
import { Monster } from '../../monster/monster.model';
import { MonsterTypeProperties } from '../../utils/monster.utils';

@Component({
	selector: 'app-playing-card',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './playing-card.component.html',
	styleUrl: './playing-card.component.css'
})
export class PlayingCardComponent {

    monster = input(new Monster());
	monsterTypeIcon = computed(()=>{
		return  MonsterTypeProperties[this.monster().type].imageUrl});
	backgroundColor= computed(()=>{
		return  MonsterTypeProperties[this.monster().type].color});
	

}