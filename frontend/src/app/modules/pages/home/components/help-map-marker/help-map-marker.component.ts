import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogHelpAplicationComponent } from '../dialog-help-aplication/dialog-help-aplication.component';

@Component({
  selector: 'app-help-map-marker',
  templateUrl: './help-map-marker.component.html',
  styleUrls: ['./help-map-marker.component.scss']
})
export class HelpMapMarkerComponent implements OnInit {

  @Input() helpRequestId!: string;

  constructor(public elementRef: ElementRef,
              private dialog : MatDialog) { }

  ngOnInit(): void {
  }

  displayDialogRequest() {
    
    this.dialog.open(DialogHelpAplicationComponent)

  }

}
