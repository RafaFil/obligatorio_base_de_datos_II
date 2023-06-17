import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HelpRequest } from 'src/app/modules/core/interfaces/helpRequest';
import { HelpRequestService } from 'src/app/modules/core/services/help-request.service';

@Component({
  selector: 'app-help-requst-info',
  templateUrl: './help-requst-info.component.html',
  styleUrls: ['./help-requst-info.component.scss']
})
export class HelpRequstInfoComponent implements OnInit {

  title: String | null = "";

  helpRequest: HelpRequest = {   

    title: "Ayuda 1",
    description: "Descripcion 1",
    street: "8 octubre",
    corner: "Avenida siempreviva",
    userDO: "111111111",
    lng: -56.157485609445175,
    lat: -34.88791314870603

  }

  constructor(private route: ActivatedRoute,
              private helpRequestService : HelpRequestService) { }

  ngOnInit(): void {
    
    //this.title = this.route.snapshot.paramMap.get('title');
    //this.helpRequestService.getHelpRequestById()
  }



}
