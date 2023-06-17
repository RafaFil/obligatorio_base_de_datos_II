import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-applicants-sheet',
  templateUrl: './applicants-sheet.component.html',
  styleUrls: ['./applicants-sheet.component.scss']
})
export class ApplicantsSheetComponent implements OnInit {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public aplicantsData : {title: string ,aplicants: string[]}
  ) { }

  ngOnInit(): void {
  }

}
