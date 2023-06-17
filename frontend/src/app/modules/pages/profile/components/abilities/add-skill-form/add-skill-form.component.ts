import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { SkillService } from 'src/app/modules/core/services/skill.service';

@Component({
  selector: 'app-add-skill-form',
  templateUrl: './add-skill-form.component.html',
  styleUrls: ['./add-skill-form.component.scss']
})
export class AddSkillFormComponent implements OnInit {

  skillLevel : String[] = []

  skills: String[] = [
    "Metalurgia",
    "Carpinteria",
    "Construccion",
    "Magia",
    "Aguacontrol"
  ];
  filteredOptions!: Observable<String[]>;

  addSkillForm = this.formBuilder.group({
    skillName : ["", [Validators.required]],
    level : ["", [Validators.required]]
  });


  constructor(private formBuilder : FormBuilder,
              private skillService : SkillService) { }

  ngOnInit(): void {
    this.skillLevel = this.skillService.getSkillLevel();
    //this.skills = this.skillService.getAllSkills();
    this.filteredOptions = this.addSkillForm.controls.skillName.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value;
        return name ? this._filter(name as string) : this.skills.slice();
      }),
    );
  }

  displayFn(skill: string): string {
    return skill && skill ? skill : '';
  }

  private _filter(name: string): String[] {
      const filterValue = name.toLowerCase();

      
      return this.skills.filter(option => option.toLowerCase().includes(filterValue));
  }

  changeLevel(value : any) {

      this.addSkillForm.patchValue({
        level : value
      });

    console.log(this.addSkillForm.controls.level.value);

  }




}
