import { Component, OnInit, ViewChild } from '@angular/core';
import { HelpRequestFormComponent } from '../help-request-form/help-request-form.component';
import { HelpRequest } from 'src/app/modules/core/interfaces/helpRequest';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GeoCodeService } from 'src/app/modules/core/services/geo-code.service';
import { HelpRequestService } from 'src/app/modules/core/services/help-request.service';

@Component({
  selector: 'app-dialog-help-request',
  templateUrl: './dialog-help-request.component.html',
  styleUrls: ['./dialog-help-request.component.scss']
})
export class DialogHelpRequestComponent implements OnInit {

  @ViewChild('helpAppForm') helpAplicationForm!: HelpRequestFormComponent;

  constructor(private dialog : MatDialogRef<HelpRequestFormComponent>,
              private geocode : GeoCodeService,
              private helpRequestService : HelpRequestService) { }

  ngOnInit(): void {
  }

  pullDataAplicationForm() {
    
    const title = this.helpAplicationForm.helpAplicationForm.controls.title.value;
    const description = this.helpAplicationForm.helpAplicationForm.controls.description.value;
    const ability = this.helpAplicationForm.helpAplicationForm.controls.ability.value;
    const level = this.helpAplicationForm.helpAplicationForm.controls.level.value;
    const street = this.helpAplicationForm.helpAplicationForm.controls.street.value;
    const corner = this.helpAplicationForm.helpAplicationForm.controls.corner.value;

    if (!title || !description) {

      alert("faltan campos obligatorios")
    }

    else {

      const helpAplication : HelpRequest = {
        title : title,
        description : description,
        userDO : "a" //Sacarlo del local storage
      };

      const adress = `${corner} ${street}, Montevideo, Uruguay`

      this.geocode.getCordinatesFromLocation(adress).subscribe(

        (res : any) => {

          const results = res.results;
          if (results && results.length > 0) {
            const formattedAddress = results[0].geometry;
            
            helpAplication.lat = formattedAddress["lat"];
            helpAplication.lng = formattedAddress["lng"];

            console.log(helpAplication);

            this.helpRequestService.submitAplication(helpAplication);
            this.dialog.close(helpAplication);

          } else {
            
            console.log('No se encontró una dirección para las coordenadas proporcionadas.');
            this.dialog.close(helpAplication);
          }
        });
      
      
    }
  }

}
