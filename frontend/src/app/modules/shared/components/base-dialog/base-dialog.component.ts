import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-dialog',
  templateUrl: './base-dialog.component.html',
  styleUrls: ['./base-dialog.component.scss']
})
export class BaseDialogComponent implements OnInit {

  @Input() dialogTitle !: string;

  constructor() { }

  ngOnInit(): void {
  }

}
