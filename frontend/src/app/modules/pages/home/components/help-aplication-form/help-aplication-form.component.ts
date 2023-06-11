import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatChip } from '@angular/material/chips';
import { Ability } from 'src/app/modules/core/interfaces/ability';
import { AbilityService } from 'src/app/modules/core/services/ability.service';

@Component({
  selector: 'app-help-aplication-form',
  templateUrl: './help-aplication-form.component.html',
  styleUrls: ['./help-aplication-form.component.scss']
})
export class HelpAplicationFormComponent implements OnInit {

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

  constructor(private abilityService : AbilityService,
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

    this.abilityService.getAllAbility()
    .subscribe ( abilities => {
      if (abilities.success) {
        console.log(abilities.data);
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
