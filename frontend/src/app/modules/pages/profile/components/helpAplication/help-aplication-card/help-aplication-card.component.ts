import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HelpRequest } from 'src/app/modules/core/interfaces/helpRequest';
import { CancelAplicationDialogComponent } from '../cancel-aplication-dialog/cancel-aplication-dialog.component';
import { HelpRequestPreviewData } from 'src/app/modules/core/interfaces/apiDataResponse/HelpRequestPreviewData';

@Component({
  selector: 'app-help-aplication-card',
  templateUrl: './help-aplication-card.component.html',
  styleUrls: ['./help-aplication-card.component.scss']
})
export class HelpAplicationCardComponent implements OnInit {

  @Input() helpRequest!: HelpRequestPreviewData;

  constructor(private dialog : MatDialog) { }

  ngOnInit(): void {
  }

  openCancelDialog() {

    this.dialog.open(CancelAplicationDialogComponent)
  }
}
