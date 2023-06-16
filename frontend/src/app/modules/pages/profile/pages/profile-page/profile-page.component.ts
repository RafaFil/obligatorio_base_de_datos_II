import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Ability } from 'src/app/modules/core/interfaces/ability';
import { AddSkillDialogComponent } from '../../components/abilities/add-skill-dialog/add-skill-dialog.component';
import { HelpRequest } from 'src/app/modules/core/interfaces/helpRequest';
import { HelpRequestService } from 'src/app/modules/core/services/help-request.service';

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

  helpRequestArr : HelpRequest[] = [

  ]

  helpAplicationArr : HelpRequest[] = [

  ]

  constructor(private dialog : MatDialog,
              private helpRequestService : HelpRequestService) { }

  ngOnInit(): void {
    
    this.helpRequestArr = this.helpRequestService.getAllAplications()
    this.helpAplicationArr = this.helpRequestArr;
  }


  openAddSkillDialog() {

    const dialogRef = this.dialog.open(AddSkillDialogComponent);
    
    dialogRef.afterClosed().subscribe( (newSkill : Ability) => {
      
      console.log(newSkill);
    })

  }
}
