import { Component, Input, OnInit } from '@angular/core';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Skill } from 'src/app/modules/core/interfaces/skill';
import { SkillService } from 'src/app/modules/core/services/skill.service';

@Component({
  selector: 'app-add-skill-form',
  templateUrl: './add-skill-form.component.html',
  styleUrls: ['./add-skill-form.component.scss']
})
export class AddSkillFormComponent implements OnInit {

  skillLevel : String[] = ["1", "2", "3", "4", "5"];

  @Input() skills: Skill[] = [];

  filteredOptions!: Observable<String[]>;

  addSkillForm = this.formBuilder.group({
    skill : [{ id: 1, name: 'Skill 1' },[Validators.required]],
    level : ["", [Validators.required]]
  });


  constructor(private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    
  }

  changeSkill(value : any) {

    this.addSkillForm.patchValue({
      skill : value
    });
  }

  changeLevel(value : any) {

      this.addSkillForm.patchValue({
        level : value
      });

  }




}
