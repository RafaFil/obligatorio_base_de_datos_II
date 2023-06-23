import { Component, OnInit, ViewChild } from '@angular/core';
import { AddSkillFormComponent } from '../add-skill-form/add-skill-form.component';
import { Skill } from 'src/app/modules/core/interfaces/skill';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-skill-dialog',
  templateUrl: './add-skill-dialog.component.html',
  styleUrls: ['./add-skill-dialog.component.scss']
})
export class AddSkillDialogComponent implements OnInit {

  @ViewChild("addSkillForm") addSkillForm!: AddSkillFormComponent;

  constructor(private dialog : MatDialogRef<AddSkillFormComponent>) { }

  ngOnInit(): void {
  }

  pullDatafromForm() {

    const skillName = this.addSkillForm.addSkillForm.controls.skillName.value;
    const level = this.addSkillForm.addSkillForm.controls.level.value;

    console.log(skillName,level)

    if (skillName && level) {
      
      const skill : Skill = {
        id: 5,
        name : skillName,
        lvl : level
      }

      this.dialog.close(skill);
    }
    else {

      alert("faltan campos");
    }
  }
}
