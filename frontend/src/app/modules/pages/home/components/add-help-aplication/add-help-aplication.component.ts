import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogHelpAplicationComponent } from '../dialog-help-aplication/dialog-help-aplication.component';
import { HelpAplication } from 'src/app/modules/core/interfaces/helpAplication';
import { HelpAplicationService } from 'src/app/modules/core/services/help-aplication.service';

@Component({
  selector: 'app-add-help-aplication',
  templateUrl: './add-help-aplication.component.html',
  styleUrls: ['./add-help-aplication.component.scss']
})
export class AddHelpAplicationComponent implements OnInit {

  @Output() eventData = new EventEmitter<any>();

  constructor(private matDialog : MatDialog,
              private helpAplicationService : HelpAplicationService) { }

  ngOnInit(): void {
  }

  openAplicationDialog() {

    const dialogRef = this.matDialog.open(DialogHelpAplicationComponent);

    dialogRef.afterClosed().subscribe( (HelpAplicationData : HelpAplication) => {

      console.log(HelpAplicationData);
      //use suscribe and that bla bla bla 
      this.eventData.emit();
      this.helpAplicationService.submitAplication(HelpAplicationData);
    });
  }

}
