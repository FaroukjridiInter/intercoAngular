import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MonsterType } from '../../utils/monster.utils';
import { Monster } from '../../monster/monster.model';
import { PlayingCardComponent } from '../../components/playing-card/playing-card.component';
import { MonsterService } from '../../services/monster/monster.service';

@Component({
	selector: 'app-monster',
	imports: [ReactiveFormsModule,PlayingCardComponent],
	templateUrl: './monster.component.html',
	styleUrl: './monster.component.css'
})
export class MonsterComponent implements OnInit {
	private route = inject(ActivatedRoute); 
	private monsterService =  inject  (MonsterService);
	private routeSubscription: Subscription | null = null;
	private formValuesSubscription: Subscription | null = null;
	monsterTypes =Object.values(MonsterType);
	
	private router = inject(Router);

	private fb = inject(FormBuilder);
	formGroup =  this.fb.group({
		name: ['', [Validators.required]],
		image: ['', [Validators.required]],
		type: [MonsterType.ELECTRIC, [Validators.required]],
		hp: [0, [Validators.required, Validators.min(1), Validators.max(200)]],
		figureCaption: ['', [Validators.required]],
		attackName: ['', [Validators.required]],
		attackStrength: [0, [Validators.required, Validators.min(1), Validators.max(200)]],
		attackDescription: ['', [Validators.required]]
	});
	monsterId = -1;
	monster: Monster =  Object.assign(new Monster(), this.formGroup.value);
	ngOnInit(): void {
		this.formValuesSubscription = this.formGroup.valueChanges.subscribe(data => {
			this.monster = Object.assign(new Monster(), data);
		});
		this.routeSubscription = this.route.params.subscribe(params => {
			if (params['monster']) {
				this.monsterId = parseInt(params['monster']);
				const  monsterFound = this.monsterService.get(this.monsterId);
				if (monsterFound){
					this.monster = monsterFound;
					this.formGroup.patchValue(this.monster);
				}
				
			}
		});
	}

	ngOnDestroy(): void {
		this.routeSubscription?.unsubscribe();
		this.formValuesSubscription?.unsubscribe();
	}

	submit(event: Event) {
		event.preventDefault();
		console.log(this.formGroup.value);
		if (this.monsterId === -1){
			this.monsterService.add(this.monster);

		} else {
			this.monster.id= this.monsterId;
			this.monsterService.update(this.monster);
		} 
		this.navigateBack();
	}

	isFieldValid(fieldName: string) {
		const formControl = this.formGroup.get(fieldName);
		return formControl?.invalid && (formControl?.dirty || formControl?.touched);
	}
	onFileChange(event: any) {
		const reader = new FileReader();
		if(event.target.files && event.target.files.length) {
			const [file] = event.target.files;
			reader.readAsDataURL(file); reader.onload = () => {
				this.formGroup.patchValue({
					image: reader.result as string
				});
			};
		}
	}
	navigateBack() {
		this.router.navigate(['/home']);
	}
}