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

  abilitiesArr : Skill[] = [
    {
      name: "carpinteria", description: "trabaja con madera"
    },
    {
      name: "metalurgia", description: "trabaja con madera"
    },
    {
      name: "cocina", description: "trabaja con madera"
    },
  ]

  skillLevel : string[] = [
    "Principiante",
    "Medio",
    "Alto",
    "Maestro"
  ]

  constructor(private skillService : SkillService,
              private formBuilder : FormBuilder) { }

  ngOnInit(): void {
  }

  helpAplicationForm = this.formBuilder.group({
    title : ["",[Validators.required]],
    description : ["",[Validators.required]],
    skill:[],
    level: [""],
    street : [""],
    corner: [""],
  });

  getAllSkill () {

    this.skillService.getAllSkills()
    .subscribe ( skill => {
      if (skill.success) {
        console.log(skill.data);
      }
    });
  }

  changeLevel(value : any) {

    const skill = this.helpAplicationForm.controls.skill.value;

    // only if a skill is selected
    if (skill) {

      this.helpAplicationForm.patchValue({
        level : value
      });
    }

    console.log(value);

  }


  addChip(chip: MatChip) {

    this.helpAplicationForm.patchValue({
      skill : chip.value
    });
  }


}
