import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogHelpRequestComponent } from '../dialog-help-request/dialog-help-request.component';
import { HelpRequest } from 'src/app/modules/core/interfaces/helpRequest';
import { HelpRequestService } from 'src/app/modules/core/services/help-request.service';

@Component({
  selector: 'app-add-help-request',
  templateUrl: './add-help-request.component.html',
  styleUrls: ['./add-help-request.component.scss']
})
export class AddHelpRequestComponent implements OnInit {

  @Output() eventData = new EventEmitter<any>();

  constructor(private matDialog : MatDialog,
              private helpAplicationService : HelpRequestService) { }

  ngOnInit(): void {
  }

  openAplicationDialog() {

    const dialogRef = this.matDialog.open(DialogHelpRequestComponent);

    dialogRef.afterClosed().subscribe( (HelpRequestData : HelpRequest) => {

      console.log(HelpRequestData);
      //use suscribe and that bla bla bla 
      this.eventData.emit();
      this.helpAplicationService.submitAplication(HelpRequestData);
    });
  }

}