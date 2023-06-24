import { Component, Inject, OnInit } from '@angular/core';
<<<<<<< HEAD
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
=======
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
>>>>>>> origin/error-handling-front
import { PostulationService } from 'src/app/modules/core/services/postulation.service';

@Component({
  selector: 'app-cancel-aplication-dialog',
  templateUrl: './cancel-aplication-dialog.component.html',
  styleUrls: ['./cancel-aplication-dialog.component.scss']
})
export class CancelAplicationDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public cancelPostData: { requestId: number, helperId: string}, 
<<<<<<< HEAD
              private postulationService : PostulationService,
              private dialogRef : MatDialogRef<CancelAplicationDialogComponent>) { }
=======
              private postulationService : PostulationService, private snackBar : MatSnackBar) { }
>>>>>>> origin/error-handling-front

  ngOnInit(): void {
  }

  cancel() {

    this.postulationService.cancelPostulation(
      this.cancelPostData.requestId,
      this.cancelPostData.helperId
    ).subscribe( res => {
      
<<<<<<< HEAD
      this.dialogRef.close(true);
=======
      if(!res.success){
        if(res.status === 404){
          this.snackBar.open("Esa postulación ya no existe", undefined, {
            duration: 3000
          })
        }
      } else{
        this.snackBar.open("Eliminada con Éxito", undefined, {
          duration: 2000
        })
      }
>>>>>>> origin/error-handling-front
    })
  }

  close() {
    
    this.dialogRef.close(false);
  }

}
