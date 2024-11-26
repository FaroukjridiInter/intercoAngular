import { CommonModule } from '@angular/common';
import { Component, InputSignal, input} from '@angular/core';
import { Monster } from '../../monster/monster.model';

@Component({
	selector: 'app-playing-card',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './playing-card.component.html',
	styleUrl: './playing-card.component.css'
})
export class PlayingCardComponent {

	monster: InputSignal<Monster> = input(new Monster());

}