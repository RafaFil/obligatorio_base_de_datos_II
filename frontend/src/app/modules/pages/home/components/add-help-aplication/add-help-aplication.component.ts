import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogHelpAplicationComponent } from '../dialog-help-aplication/dialog-help-aplication.component';
import { HelpAplication } from 'src/app/modules/core/interfaces/helpAplication';

@Component({
  selector: 'app-add-help-aplication',
  templateUrl: './add-help-aplication.component.html',
  styleUrls: ['./add-help-aplication.component.scss']
})
export class AddHelpAplicationComponent implements OnInit {

  constructor(private matDialog : MatDialog) { }

  ngOnInit(): void {
  }

  openAplicationDialog() {

    const dialogRef = this.matDialog.open(DialogHelpAplicationComponent);

    dialogRef.afterClosed().subscribe( (HelpAplicationData : HelpAplication) => {
      console.log(HelpAplicationData);
    });
  }

}
