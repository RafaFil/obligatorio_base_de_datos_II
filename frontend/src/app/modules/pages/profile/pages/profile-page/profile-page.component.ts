import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Ability } from 'src/app/modules/core/interfaces/ability';
import { AddSkillDialogComponent } from '../../components/abilities/add-skill-dialog/add-skill-dialog.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  skillsArr : Ability[] = [

    {name:"Cocina", level:"mastero"},
    {name:"Metalurguia", level:"principiante"},
    {name:"Informatica", level:"mastero"},
    {name:"luteria", level:"avanzado"},

  ]

  constructor(private dialog : MatDialog) { }

  ngOnInit(): void {
  }


  openAddSkillDialog() {

    const dialogRef = this.dialog.open(AddSkillDialogComponent);
    
    dialogRef.afterClosed().subscribe( (newSkill : Ability) => {
      
      console.log(newSkill);
    })

  }
}
