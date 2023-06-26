import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HelpRequest } from 'src/app/modules/core/interfaces/helpRequest';
import { CancelAplicationDialogComponent } from '../cancel-aplication-dialog/cancel-aplication-dialog.component';
import { HelpRequestPreviewData } from 'src/app/modules/core/interfaces/apiDataResponse/HelpRequestPreviewData';
import { PostulationUserData } from 'src/app/modules/core/interfaces/apiDataResponse/PostulationsUserData';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-postulation-card',
  templateUrl: './postulation-card.component.html',
  styleUrls: ['./postulation-card.component.scss']
})
export class PostulationCardComponent implements OnInit {

  @Input() postulation!: PostulationUserData;
  @Output() deletedPostulationEvent = new EventEmitter<PostulationUserData>;

  constructor(private dialog : MatDialog,
              private snackBar : MatSnackBar) { }

  ngOnInit(): void {
  }

  openCancelDialog() {

    const dialogRef = this.dialog.open(CancelAplicationDialogComponent, {
      data: {
        requestId : this.postulation.requestid,
        helperId : this.postulation.userid
      }
    })
    
    dialogRef.afterClosed().subscribe({
      
      next: (iscanceled : boolean) => {

        if (iscanceled) {
          this.deletedPostulationEvent.emit(this.postulation);
          this.snackBar.open(`Postulacion a ${this.postulation.title} cancelada`, undefined, {
            duration: 3000
          });
        }
      }
    })
  }
}
