import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HelpRequestData } from 'src/app/modules/core/interfaces/apiDataResponse/HelpReqData';
import { HelpRequest } from 'src/app/modules/core/interfaces/helpRequest';
import { GeoCodeService } from 'src/app/modules/core/services/geo-code.service';

@Component({
  selector: 'app-dialog-help-request-info',
  templateUrl: './dialog-help-request-info.component.html',
  styleUrls: ['./dialog-help-request-info.component.scss']
})
export class DialogHelpRequestInfoComponent implements OnInit {
  helpRequestMap = new Map()
  helpRequestIndex = ["Solicitante","Descripcion","Habilidades Requeridas","Ubicación","Fecha de Creación"]

  constructor(@Inject(MAT_DIALOG_DATA) public helpRequest: HelpRequestData, 
              private geoCoding : GeoCodeService) { 

    let skillsName = ""
    this.helpRequest.skills.forEach (skill => {
      skillsName = skill.name + " " + skillsName
    });

    let street;
    this.geoCoding.getLocationFromCoordinates(helpRequest.lat, helpRequest.lng)
    .subscribe(res => {
      
      street = res.results[0].formatted;
      this.helpRequestMap.set(0,this.helpRequest.user.name + " " + this.helpRequest.user.lastname);
      this.helpRequestMap.set(1,this.helpRequest.description);
      this.helpRequestMap.set(2,skillsName);
      this.helpRequestMap.set(3,street);
      this.helpRequestMap.set(4, new Date(this.helpRequest.dateofpublishing).toLocaleDateString());

    });
    
  }


  ngOnInit(): void {
    
  }

  

}
