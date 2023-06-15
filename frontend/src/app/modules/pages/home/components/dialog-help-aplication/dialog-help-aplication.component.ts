import { Component, OnInit, ViewChild } from '@angular/core';
import { HelpAplicationFormComponent } from '../help-aplication-form/help-aplication-form.component';
import { HelpAplication } from 'src/app/modules/core/interfaces/helpAplication';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GeoCodeService } from 'src/app/modules/core/services/geo-code.service';
import { HelpAplicationService } from 'src/app/modules/core/services/help-aplication.service';

@Component({
  selector: 'app-dialog-help-aplication',
  templateUrl: './dialog-help-aplication.component.html',
  styleUrls: ['./dialog-help-aplication.component.scss']
})
export class DialogHelpAplicationComponent implements OnInit {

  @ViewChild('helpAppForm') helpAplicationForm!: HelpAplicationFormComponent;

  constructor(private dialog : MatDialogRef<HelpAplicationFormComponent>,
              private geocode : GeoCodeService,
              private helpRequestService : HelpAplicationService) { }

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

      const helpAplication : HelpAplication = {
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
