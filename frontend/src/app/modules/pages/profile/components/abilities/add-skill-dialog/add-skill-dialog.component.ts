import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AddSkillFormComponent } from '../add-skill-form/add-skill-form.component';
import { Skill } from 'src/app/modules/core/interfaces/skill';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SkillService } from 'src/app/modules/core/services/skill.service';

@Component({
  selector: 'app-add-skill-dialog',
  templateUrl: './add-skill-dialog.component.html',
  styleUrls: ['./add-skill-dialog.component.scss']
})
export class AddSkillDialogComponent implements OnInit {

  @ViewChild("addSkillForm") addSkillForm!: AddSkillFormComponent;

  skillsArr : Skill[] = [];

  constructor(private dialog : MatDialogRef<AddSkillFormComponent>,
              private skillService : SkillService) { }

  ngOnInit(): void {
    
    this.skillService.getAllSkills().subscribe(s => {
      
      if (s.success && s.data) {
        this.skillsArr  = s.data;
      }
    })
  }

  pullDatafromForm() {

    const skill = this.addSkillForm.addSkillForm.controls.skill.value;
    const level = this.addSkillForm.addSkillForm.controls.level.value;

    if (skill && level) {
      
      const skillData : Skill = {
        id: skill.id,
        name : skill.name,
        lvl : level
      }

      this.dialog.close(skillData);
    }
    else {

      alert("faltan campos");
    }
  }
}
