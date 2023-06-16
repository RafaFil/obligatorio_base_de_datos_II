import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatChip } from '@angular/material/chips';
import { Ability } from 'src/app/modules/core/interfaces/ability';
import { SkillService } from 'src/app/modules/core/services/skill.service';

@Component({
  selector: 'app-help-request-form',
  templateUrl: './help-request-form.component.html',
  styleUrls: ['./help-request-form.component.scss']
})
export class HelpRequestFormComponent implements OnInit {

  abilitiesArr : Ability[] = [
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

  abilityLevel : string[] = [
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
    ability:[],
    level: [""],
    street : [""],
    corner: [""],
  });

  getAllAbility () {

    this.skillService.getAllAbility()
    .subscribe ( skill => {
      if (skill.success) {
        console.log(skill.data);
      }
    });
  }

  changeLevel(value : any) {

    const ability = this.helpAplicationForm.controls.ability.value;

    // only if a ability is selected
    if (ability) {

      this.helpAplicationForm.patchValue({
        level : value
      });
    }

    console.log(value);

  }


  addChip(chip: MatChip) {

    this.helpAplicationForm.patchValue({
      ability : chip.value
    });
  }


}
