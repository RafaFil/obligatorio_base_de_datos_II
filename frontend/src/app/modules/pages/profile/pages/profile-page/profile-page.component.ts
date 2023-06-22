import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Skill } from 'src/app/modules/core/interfaces/skill';
import { AddSkillDialogComponent } from '../../components/abilities/add-skill-dialog/add-skill-dialog.component';
import { HelpRequest } from 'src/app/modules/core/interfaces/helpRequest';
import { HelpRequestService } from 'src/app/modules/core/services/help-request.service';
import { HelpRequestData } from 'src/app/modules/core/interfaces/apiDataResponse/HelpReqData';
import { HelpRequestPreviewData } from 'src/app/modules/core/interfaces/apiDataResponse/HelpRequestPreviewData';
import { UserService } from 'src/app/modules/core/services/user.service';
import { UserDataResponse } from 'src/app/modules/core/interfaces/apiDataResponse/userDataResponse';
import { SkillService } from 'src/app/modules/core/services/skill.service';
import { PostulationService } from 'src/app/modules/core/services/postulation.service';
import { PostulationUserData } from 'src/app/modules/core/interfaces/apiDataResponse/PostulationsUserData';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  runningUser?: UserDataResponse;

  skillsArr : Skill[] = []

  helpRequestArr : HelpRequestPreviewData[] = [

  ]

  postulationsArr : PostulationUserData[] = [

  ]

  constructor(private dialog : MatDialog,
              private helpRequestService : HelpRequestService,
              private userService : UserService,
              private skillService : SkillService,
              private postulationService : PostulationService) { }

  ngOnInit(): void {
    
    this.runningUser = this.userService.getRunningUser();

    this.helpRequestService.getAllHelpRequest().subscribe( res => {

      if (res.success && res.data) {

        this.helpRequestArr = res.data;
      }
    })
    
    this.getAllUserPostulation();

    this.getAllSkillUser();
  }

  getAllUserPostulation() {

    this.postulationService.getAllUserPostulation().subscribe(
      res => {
        
        if (res.success && res.data) {

          this.postulationsArr = res.data;
        }
      }
    )
  }

  getAllSkillUser() {

    if (this.runningUser) {      

      const userDO = this.runningUser["do"];
      console.log(this.runningUser, userDO)
      this.skillService.getAllUserSkills(userDO).subscribe(
          res => {
            
            if (res.success && res.data) {
              this.skillsArr = res.data;
            }
          }
        );
    }
  }

  openAddSkillDialog() {

    const dialogRef = this.dialog.open(AddSkillDialogComponent);
    
    dialogRef.afterClosed().subscribe( (newSkill : Skill) => {
      
      console.log(newSkill);
    })

  }
}
