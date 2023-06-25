import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-request-dialog',
  templateUrl: './delete-request-dialog.component.html',
  styleUrls: ['./delete-request-dialog.component.scss']
})
export class DeleteRequestDialogComponent implements OnInit {

  constructor(private dialogRef : MatDialogRef<DeleteRequestDialogComponent>) { }

  ngOnInit(): void {
  }

  close(conf : boolean) {
    
    this.dialogRef.close(conf);
  }

}
