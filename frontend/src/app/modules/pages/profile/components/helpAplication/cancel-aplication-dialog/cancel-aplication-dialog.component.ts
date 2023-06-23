import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostulationService } from 'src/app/modules/core/services/postulation.service';

@Component({
  selector: 'app-cancel-aplication-dialog',
  templateUrl: './cancel-aplication-dialog.component.html',
  styleUrls: ['./cancel-aplication-dialog.component.scss']
})
export class CancelAplicationDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public cancelPostData: { requestId: number, helperId: string}, 
              private postulationService : PostulationService) { }

  ngOnInit(): void {
  }

  cancel() {
    this.postulationService.cancelPostulation(
      this.cancelPostData.requestId,
      this.cancelPostData.helperId
    ).subscribe( res => {
      
      
    })
  }

}
