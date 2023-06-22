import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HelpRequest } from 'src/app/modules/core/interfaces/helpRequest';
import { CancelAplicationDialogComponent } from '../cancel-aplication-dialog/cancel-aplication-dialog.component';
import { HelpRequestPreviewData } from 'src/app/modules/core/interfaces/apiDataResponse/HelpRequestPreviewData';
import { PostulationUserData } from 'src/app/modules/core/interfaces/apiDataResponse/PostulationsUserData';

@Component({
  selector: 'app-postulation-card',
  templateUrl: './postulation-card.component.html',
  styleUrls: ['./postulation-card.component.scss']
})
export class PostulationCardComponent implements OnInit {

  @Input() postulation!: PostulationUserData;

  constructor(private dialog : MatDialog) { }

  ngOnInit(): void {
  }

  openCancelDialog() {

    this.dialog.open(CancelAplicationDialogComponent, {
      data: {
        requestId : this.postulation.requestid,
        helperId : this.postulation.userid
      }
    })
  }
}
