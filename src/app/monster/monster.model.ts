import { MonsterType } from "../utils/monster.utils";

export class Monster {
	name: string = "Monster";
	type: MonsterType = MonsterType.ELECTRIC;
 	image: string = "assets/img/pik.png";
 	hp: number = 60;
 	figureCaption: string = "N°001 Monster";

 	attackName: string = "Standard Attack";
	attackStrength: number = 10;
	attackDescription: string = "This is an attack description..."
}