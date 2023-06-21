import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Skill } from 'src/app/modules/core/interfaces/skill';
import { AddSkillDialogComponent } from '../../components/abilities/add-skill-dialog/add-skill-dialog.component';
import { HelpRequest } from 'src/app/modules/core/interfaces/helpRequest';
import { HelpRequestService } from 'src/app/modules/core/services/help-request.service';
import { HelpRequestData } from 'src/app/modules/core/interfaces/apiDataResponse/HelpReqData';
import { HelpRequestPreviewData } from 'src/app/modules/core/interfaces/apiDataResponse/HelpRequestPreviewData';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  skillsArr : Skill[] = [

    {name:"Cocina", level:"mastero"},
    {name:"Metalurguia", level:"principiante"},
    {name:"Informatica", level:"mastero"},
    {name:"luteria", level:"avanzado"},

  ]

  helpRequestArr : HelpRequestPreviewData[] = [

  ]

  helpAplicationArr : HelpRequestPreviewData[] = [

  ]

  constructor(private dialog : MatDialog,
              private helpRequestService : HelpRequestService) { }

  ngOnInit(): void {
    
    this.helpRequestService.getAllHelpRequest().subscribe( res => {

      if (res.success && res.data) {

        this.helpRequestArr = res.data;
      }
    })
    this.helpAplicationArr = this.helpRequestArr;
  }


  openAddSkillDialog() {

    const dialogRef = this.dialog.open(AddSkillDialogComponent);
    
    dialogRef.afterClosed().subscribe( (newSkill : Skill) => {
      
      console.log(newSkill);
    })

  }
}
