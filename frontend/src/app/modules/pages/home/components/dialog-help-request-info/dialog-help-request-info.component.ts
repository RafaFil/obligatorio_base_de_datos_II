import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HelpRequestData } from 'src/app/modules/core/interfaces/apiDataResponse/HelpReqData';
import { HelpRequest } from 'src/app/modules/core/interfaces/helpRequest';
import { GeoCodeService } from 'src/app/modules/core/services/geo-code.service';
import { PostulationService } from 'src/app/modules/core/services/postulation.service';

@Component({
  selector: 'app-dialog-help-request-info',
  templateUrl: './dialog-help-request-info.component.html',
  styleUrls: ['./dialog-help-request-info.component.scss']
})
export class DialogHelpRequestInfoComponent implements OnInit {

  isLoading = true;

  helpRequestMap = new Map()
  helpRequestIndex = ["Solicitante","Descripcion","Habilidades Requeridas","Ubicación","Fecha de Creación"]

  constructor(@Inject(MAT_DIALOG_DATA) public helpRequest: 
              { helpRequest : HelpRequestData, isUserRequest: boolean}, 
              private geoCoding : GeoCodeService,
              private postulationService : PostulationService,
              private snackBar: MatSnackBar,
              private dialogRef : MatDialogRef<DialogHelpRequestInfoComponent>) { 
    
  }


  ngOnInit(): void {

    let skillsName = ""
    this.helpRequest.helpRequest.skills.forEach (skill => {
      skillsName = skill.name + " " + skillsName
    });

    let street;
    this.geoCoding.getLocationFromCoordinates
    (this.helpRequest.helpRequest.lat, this.helpRequest.helpRequest.lng)
    .subscribe(res => {
      
      street = res.results[0].formatted;
      this.helpRequestMap.set(0,this.helpRequest.helpRequest.user.name + " " 
          + this.helpRequest.helpRequest.user.lastname);
      this.helpRequestMap.set(1,this.helpRequest.helpRequest.description);
      this.helpRequestMap.set(2,skillsName);
      this.helpRequestMap.set(3,street);
      this.helpRequestMap.set(4, new Date(this.helpRequest.helpRequest.dateofpublishing)
      .toLocaleDateString());

      this.isLoading = false;
    });
  }

  submitPostulation() {
    this.postulationService.submitPostulation(this.helpRequest.helpRequest.id).subscribe(
      res => {

        if (res.success) {
          this.dialogRef.close();
          this.snackBar.open(`Postulacion sastifactoria a ${this.helpRequest.helpRequest.title}`,"", {
            duration: 3000
          })

        } else {
          //should be done better in backend
          if(res.status === 400) {
          this.dialogRef.close();
          this.snackBar.open("Postulación fallida. Revise si ya se postuló o si sigue activa esta solicitud.", undefined, {
            duration: 3000
          })
        }else if(res.status === 500) {
          this.dialogRef.close();
          this.snackBar.open("Postulación fallida. No cuenta con las habilidades necesarias.", undefined, {
            duration: 3000
          })
        }
        }

      }
    )
  }

}
