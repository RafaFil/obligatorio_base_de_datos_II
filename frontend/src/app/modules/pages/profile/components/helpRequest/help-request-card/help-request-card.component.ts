import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelpRequest } from 'src/app/modules/core/interfaces/helpRequest';

@Component({
  selector: 'app-help-request-card',
  templateUrl: './help-request-card.component.html',
  styleUrls: ['./help-request-card.component.scss']
})
export class HelpRequestCardComponent implements OnInit {

  @Input() helpRequest!: HelpRequest

  constructor() { }

  ngOnInit(): void {
  }

  /*redirectToRequestInfo(title : string) {

    this.router.navigate(['profile/helprequest', title]);

  }*/

}
