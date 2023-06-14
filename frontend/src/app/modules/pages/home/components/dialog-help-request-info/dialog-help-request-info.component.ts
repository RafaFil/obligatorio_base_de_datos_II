import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HelpAplication } from 'src/app/modules/core/interfaces/helpAplication';

@Component({
  selector: 'app-dialog-help-request-info',
  templateUrl: './dialog-help-request-info.component.html',
  styleUrls: ['./dialog-help-request-info.component.scss']
})
export class DialogHelpRequestInfoComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public helpRequest: HelpAplication) { }

  ngOnInit(): void {
  }

  

}
