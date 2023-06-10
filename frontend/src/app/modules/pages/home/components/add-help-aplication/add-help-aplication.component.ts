import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogHelpAplicationComponent } from '../dialog-help-aplication/dialog-help-aplication.component';

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
    this.matDialog.open(DialogHelpAplicationComponent)
  }

}
