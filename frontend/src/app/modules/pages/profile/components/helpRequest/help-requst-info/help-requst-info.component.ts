import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HelpRequestData } from 'src/app/modules/core/interfaces/apiDataResponse/HelpReqData';
import { HelpRequest } from 'src/app/modules/core/interfaces/helpRequest';
import { HelpRequestService } from 'src/app/modules/core/services/help-request.service';

@Component({
  selector: 'app-help-requst-info',
  templateUrl: './help-requst-info.component.html',
  styleUrls: ['./help-requst-info.component.scss']
})
export class HelpRequstInfoComponent implements OnInit {

  helpRequest!: HelpRequestData;

  constructor(private route: ActivatedRoute,
              private helpRequestService : HelpRequestService) { }

  ngOnInit(): void {
    
    const idReq = this.route.snapshot.paramMap.get('id');

    if (idReq) {

      this.helpRequestService.getHelpRequestById(parseInt(idReq)).subscribe({
        next: (res) => {

          if (res.success && res.data) {

            this.helpRequest = res.data;
          }
        }
      })
    }
    
    
  }



}
