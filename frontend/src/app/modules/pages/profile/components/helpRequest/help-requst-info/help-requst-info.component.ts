import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HelpRequestData } from 'src/app/modules/core/interfaces/apiDataResponse/HelpReqData';
import { HelpRequest } from 'src/app/modules/core/interfaces/helpRequest';
import { GeoCodeService } from 'src/app/modules/core/services/geo-code.service';
import { HelpRequestService } from 'src/app/modules/core/services/help-request.service';
import { DeleteRequestDialogComponent } from '../delete-request-dialog/delete-request-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-help-requst-info',
  templateUrl: './help-requst-info.component.html',
  styleUrls: ['./help-requst-info.component.scss']
})
export class HelpRequstInfoComponent implements OnInit {

  helpRequest!: HelpRequestData;
  ubication!: string;
  isLoading = true;

  constructor(private route: ActivatedRoute,
              private helpRequestService : HelpRequestService,
              private geoCode : GeoCodeService,
              private dialog : MatDialog,
              private snackBar : MatSnackBar,
              private router : Router) { }

  ngOnInit(): void {
    
    const idReq = this.route.snapshot.paramMap.get('id');

    if (idReq) {

      this.helpRequestService.getHelpRequestById(parseInt(idReq)).subscribe({
        next: (res) => {

          if (res.success && res.data) {

            this.helpRequest = res.data;
            this.getUbication(this.helpRequest.lat, this.helpRequest.lng);
          }
        }
      })
    }
    
    
  }

  getUbication(lat : number, lng : number) {

    this.geoCode.getLocationFromCoordinates(lat,lng).subscribe({
      next: (res) => {
        
        this.ubication = res.results[0].formatted;
        this.isLoading = false;
      }
    })
  }

  deleteUserPostulation() {
    const dialogRef = this.dialog.open(DeleteRequestDialogComponent)

    dialogRef.afterClosed().subscribe({
      next: (confirmation : boolean) => {
        
        if (confirmation) {

          this.helpRequestService.deleteUserRequest(this.helpRequest.id).subscribe({
            next: (res) => {

              if(res && res.success) {

                this.snackBar.open("La solicitud fue borrada con exito", undefined, {
                  duration: 3000
                })
                this.router.navigate(["/profile"])
              }
            }
          });
        }
      }
    })
  }


}
