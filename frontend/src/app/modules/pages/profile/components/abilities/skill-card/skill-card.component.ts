import { Component, Input, OnInit } from '@angular/core';
import { Skill } from 'src/app/modules/core/interfaces/skill';
import { SkillService } from 'src/app/modules/core/services/skill.service';

@Component({
  selector: 'app-skill-card',
  templateUrl: './skill-card.component.html',
  styleUrls: ['./skill-card.component.scss']
})
export class SkillCardComponent implements OnInit {

  isOnEdit = false;

  @Input() skill !: Skill;

  skillLevel : string[] = [
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

      this.skillService.updateSkillLevel(this.selectedLevel);
      console.log(this.selectedLevel);
      this.isOnEdit = false;
    }

  }

}
