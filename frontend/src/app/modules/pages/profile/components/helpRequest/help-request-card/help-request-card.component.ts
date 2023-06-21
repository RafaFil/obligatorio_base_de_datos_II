import { Component, Input, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { HelpRequest } from 'src/app/modules/core/interfaces/helpRequest';
import { ApplicantsSheetComponent } from '../applicants-sheet/applicants-sheet.component';
import { HelpRequestPreviewData } from 'src/app/modules/core/interfaces/apiDataResponse/HelpRequestPreviewData';

@Component({
  selector: 'app-help-request-card',
  templateUrl: './help-request-card.component.html',
  styleUrls: ['./help-request-card.component.scss']
})
export class HelpRequestCardComponent implements OnInit {

  @Input() helpRequest!: HelpRequestPreviewData

  constructor(private sheet : MatBottomSheet,
              private router : Router) { }

  ngOnInit(): void {
  }

  redirectToRequestInfo(title : string) {

    console.log("redirect to profile/helprequest")
    this.router.navigate(['profile/helprequest', title]);

  }

  showAplicantsSheet() {
  
    this.sheet.open(ApplicantsSheetComponent,{
      data: {
        title : this.helpRequest.title,
        aplicants : ["Joan Moretz","Hans Waltz","Takehiko Inoue","Brandon Fanderson","Don zoilo"]
      }
    })
  }

}
