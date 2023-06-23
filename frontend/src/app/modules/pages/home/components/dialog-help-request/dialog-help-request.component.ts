import { Component, OnInit, ViewChild } from '@angular/core';
import { HelpRequestFormComponent } from '../help-request-form/help-request-form.component';
import { HelpRequest } from 'src/app/modules/core/interfaces/helpRequest';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GeoCodeService } from 'src/app/modules/core/services/geo-code.service';
import { HelpRequestService } from 'src/app/modules/core/services/help-request.service';
import { UserService } from 'src/app/modules/core/services/user.service';
import { Skill } from 'src/app/modules/core/interfaces/skill';

@Component({
  selector: 'app-dialog-help-request',
  templateUrl: './dialog-help-request.component.html',
  styleUrls: ['./dialog-help-request.component.scss']
})
export class DialogHelpRequestComponent implements OnInit {

  @ViewChild('helpAppForm') helpRequestForm!: HelpRequestFormComponent;

  constructor(private dialog : MatDialogRef<HelpRequestFormComponent>,
              private geocode : GeoCodeService,
              private userService : UserService) { }

  ngOnInit(): void {
  }

  pullDataAplicationForm() {
    
    const title = this.helpRequestForm.helpRequestForm.controls.title.value;
    const description = this.helpRequestForm.helpRequestForm.controls.description.value;
    const skill = this.helpRequestForm.helpRequestForm.controls.skill.value;
    const level = this.helpRequestForm.helpRequestForm.controls.level.value;
    const street = this.helpRequestForm.helpRequestForm.controls.street.value;
    const corner = this.helpRequestForm.helpRequestForm.controls.corner.value;
    const user = this.userService.getRunningUser();

    if (!this.helpRequestForm.helpRequestForm.valid) {
      
      alert("faltan campos obligatorios")
    }

    else if (title && description && skill && level && street && corner && user) {

      const helpAplication : HelpRequest = {
        title: title,
        description: description,
        userDO: user.do,
        dateOfPublishing: new Date(),
        skills: this.getAllSkillsOfRequest()
      };

      const adress = `${corner} ${street}, Montevideo, Uruguay`

      this.geocode.getCordinatesFromLocation(adress).subscribe(

        (res : any) => {

          const results = res.results;
          if (results && results.length > 0) {
            const formattedAddress = results[0].geometry;
            
            helpAplication.lat = formattedAddress["lat"];
            helpAplication.lng = formattedAddress["lng"];

            console.log(helpAplication)
            this.dialog.close(helpAplication);

          } else {
            
            console.log('No se encontró una dirección para las coordenadas proporcionadas.');
            this.dialog.close(helpAplication);
          }
        });
      
      
    }
  }

  getAllSkillsOfRequest() {

    const skillsArr : Skill[] = [];
    const skill = this.helpRequestForm.helpRequestForm.controls.skill.value;
    const level = this.helpRequestForm.helpRequestForm.controls.level.value;
    console.log("VERRRRRR", skill)
    skill.forEach( s => {

      if(s && level)
        skillsArr.push({
          id: s.id,
          name: s.name,
          lvl: level
        });
    })

    return skillsArr;
  }

}
