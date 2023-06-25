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

  skillLevel : number[] = [
    1,2,3,4,5
  ]

  constructor(private skillService : SkillService) { }

  selectedLevel !: number;

  ngOnInit(): void {
  }

  changeLevel() {
    
    this.isOnEdit = true;

  }

  confirmChangeLevel() {

    if (this.selectedLevel) {

      this.skillService.updateSkillLevel(this.selectedLevel, this.skill.id).subscribe({
        next: (res) => {

          if (!res.success) {
            alert("An error has ocurred");
          }
        }
      });
    

      this.isOnEdit = false;
    }

  }

}
