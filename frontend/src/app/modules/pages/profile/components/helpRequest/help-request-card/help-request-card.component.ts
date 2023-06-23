import { Component, Input, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { HelpRequest } from 'src/app/modules/core/interfaces/helpRequest';
import { ApplicantsSheetComponent } from '../applicants-sheet/applicants-sheet.component';
import { HelpRequestPreviewData } from 'src/app/modules/core/interfaces/apiDataResponse/HelpRequestPreviewData';
import { HelpRequestUserData } from 'src/app/modules/core/interfaces/apiDataResponse/HelpReqUserData';
import { PostulationService } from 'src/app/modules/core/services/postulation.service';

@Component({
  selector: 'app-help-request-card',
  templateUrl: './help-request-card.component.html',
  styleUrls: ['./help-request-card.component.scss']
})
export class HelpRequestCardComponent implements OnInit {

  @Input() helpRequest!: HelpRequestUserData

  constructor(private sheet : MatBottomSheet,
              private router : Router,
              private postulationService : PostulationService) { }

  ngOnInit(): void {
  }

  redirectToRequestInfo(id : number) {

    console.log("redirect to profile/helprequest")
    this.router.navigate(['profile/helprequest', id]);

  }

  showAplicantsSheet() {
    
    this.sheet.open(ApplicantsSheetComponent,{
      data: {
        title : this.helpRequest.title,
        id : this.helpRequest.id
      }
    })
  }

}
