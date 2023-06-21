import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HelpRequestData } from 'src/app/modules/core/interfaces/apiDataResponse/HelpReqData';
import { HelpRequest } from 'src/app/modules/core/interfaces/helpRequest';

@Component({
  selector: 'app-dialog-help-request-info',
  templateUrl: './dialog-help-request-info.component.html',
  styleUrls: ['./dialog-help-request-info.component.scss']
})
export class DialogHelpRequestInfoComponent implements OnInit {
  helpRequestMap = new Map()
  helpRequestIndex = ["Solicitante","Titulo","Descripcion","Habilidades Requeridas","Calle","Esquina","Fecha de Creación"]

  constructor(@Inject(MAT_DIALOG_DATA) public helpRequest: HelpRequestData) { 

    this.helpRequestMap.set(0,this.helpRequest.userDO);
    this.helpRequestMap.set(1,this.helpRequest.title);
    this.helpRequestMap.set(2,this.helpRequest.description);
    this.helpRequestMap.set(3,this.helpRequest.skill);
    this.helpRequestMap.set(4,this.helpRequest.street);
    this.helpRequestMap.set(5,this.helpRequest.corner);
    this.helpRequestMap.set(6,this.helpRequest.corner);
  }


  ngOnInit(): void {
    
  }

  

}
