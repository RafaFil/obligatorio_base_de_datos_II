import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogHelpRequestComponent } from '../dialog-help-request/dialog-help-request.component';
import { DialogHelpRequestInfoComponent } from '../dialog-help-request-info/dialog-help-request-info.component';
import { HelpRequest } from 'src/app/modules/core/interfaces/helpRequest';
import { HelpRequestService } from 'src/app/modules/core/services/help-request.service';
import { HelpRequestData } from 'src/app/modules/core/interfaces/apiDataResponse/HelpReqData';

@Component({
  selector: 'app-help-map-marker',
  templateUrl: './help-map-marker.component.html',
  styleUrls: ['./help-map-marker.component.scss']
})
export class HelpMapMarkerComponent implements OnInit {

  @Input() helpRequestId!: number;
  @Input() currentUserDO!: string;
  @Input() userRequestDo!: string;
  helpRequest!: HelpRequestData;
  color = "warn";
  isUserRequest = false;
  icon = "assignment_late"

  constructor(public elementRef: ElementRef,
              private dialog : MatDialog,
              private helpRequestService : HelpRequestService) { }

  ngOnInit(): void {

    if (this.currentUserDO === this.userRequestDo) {

      this.color = "primary";
      this.isUserRequest = true;
      this.icon = "assignment_ind";
    }
  }

  displayDialogRequest() {
    
    this.helpRequestService.getHelpRequestById(this.helpRequestId).subscribe(
      res => {

        if (res.success && res.data) {

          this.helpRequest = res.data
          
          this.dialog.open(DialogHelpRequestInfoComponent, {
            data: {
              helpRequest : this.helpRequest,
              isUserRequest : this.isUserRequest
            }
          })
        }
      }
    )


  }

}
