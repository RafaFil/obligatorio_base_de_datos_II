import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatChip } from '@angular/material/chips';
import { Skill } from 'src/app/modules/core/interfaces/skill';
import { SkillService } from 'src/app/modules/core/services/skill.service';

@Component({
  selector: 'app-help-request-form',
  templateUrl: './help-request-form.component.html',
  styleUrls: ['./help-request-form.component.scss']
})
export class HelpRequestFormComponent implements OnInit {

  skillsArr : Skill[] = []
  skillsName : String[] = [];

  skillLevel : string[] = [ "1", "2", "3", "4", "5"]

  constructor(private skillService : SkillService,
              private formBuilder : FormBuilder) { }

  ngOnInit(): void {

    this.getAllSkill();
  }

  helpRequestForm = this.formBuilder.group({
    title : ["",[Validators.required]],
    description : ["",[Validators.required]],
    skill: this.formBuilder.array<{id : number, name: string}>([]),
    level: ["",[Validators.required]],
    street : ["",[Validators.required]],
    corner: ["",[Validators.required]],
  });

  getAllSkill () {

    this.skillService.getAllSkills()
    .subscribe ( skills => {
      if (skills.success && skills.data) {

        this.skillsArr = skills.data;

      }
    });
  }

  changeLevel(value : any) {

    const skill = this.helpRequestForm.controls.skill.value;

    // only if a skill is selected
    if (skill) {

      this.helpRequestForm.patchValue({
        level : value
      });
    }



  }


  addChip(chip: MatChip) {

    const value = this.helpRequestForm.controls.skill.value;

    if (chip.selected) {
      chip.deselect();
      this.removeLikeFromSkills(chip);
      return;
    }

    const chipName = chip.value;
    const skill = this.skillsArr.find(s => s.name.trim() === chipName.trim());;
  
    if (skill) {
      const skillId = skill.id;
      const skillName = skill.name;

      value.push({
        id : skillId,
        name : skillName
      });
    }

    chip.select();


  }

  removeLikeFromSkills(chip : MatChip) {

    const value = this.helpRequestForm.controls.skill.value;
    const chipName = chip.value;

    let index;
    value.forEach( (s, i ) => {
      
      if (s && (s.name.trim() === chipName.trim())) {
        index = i;
      }
    });

    if (index) {
      value.splice(index,1);
    }


  }

}
