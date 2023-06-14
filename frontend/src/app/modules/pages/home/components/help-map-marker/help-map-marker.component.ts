import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogHelpAplicationComponent } from '../dialog-help-aplication/dialog-help-aplication.component';
import { DialogHelpRequestInfoComponent } from '../dialog-help-request-info/dialog-help-request-info.component';
import { HelpAplication } from 'src/app/modules/core/interfaces/helpAplication';

@Component({
  selector: 'app-help-map-marker',
  templateUrl: './help-map-marker.component.html',
  styleUrls: ['./help-map-marker.component.scss']
})
export class HelpMapMarkerComponent implements OnInit {

  @Input() helpRequestId!: string;
  @Input() helpRequest!: HelpAplication;

  constructor(public elementRef: ElementRef,
              private dialog : MatDialog) { }

  ngOnInit(): void {
  }

  displayDialogRequest() {
    
    //Add the helpRequestId
    this.dialog.open(DialogHelpRequestInfoComponent, {
      data: this.helpRequest
    })

  }

}
