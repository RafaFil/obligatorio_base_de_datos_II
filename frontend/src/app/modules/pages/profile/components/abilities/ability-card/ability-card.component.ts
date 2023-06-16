import { Component, Input, OnInit } from '@angular/core';
import { Ability } from 'src/app/modules/core/interfaces/ability';
import { SkillService } from 'src/app/modules/core/services/skill.service';

@Component({
  selector: 'app-ability-card',
  templateUrl: './ability-card.component.html',
  styleUrls: ['./ability-card.component.scss']
})
export class AbilityCardComponent implements OnInit {

  isOnEdit = false;

  @Input() skill !: Ability;

  abilityLevel : string[] = [
    "Principiante",
    "Medio",
    "Alto",
    "Maestro"
  ]

  constructor(private skillService : SkillService) { }

  selectedLevel !: string;

  ngOnInit(): void {
  }

  changeLevel() {
    
    this.isOnEdit = true;

  }

  confirmChangeLevel() {

    if (this.selectedLevel) {

      this.skillService.updateAbilityLevel(this.selectedLevel);
      console.log(this.selectedLevel);
      this.isOnEdit = false;
    }

  }

}
