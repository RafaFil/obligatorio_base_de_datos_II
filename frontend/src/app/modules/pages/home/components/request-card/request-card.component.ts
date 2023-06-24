import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HelpRequest } from 'src/app/modules/core/interfaces/helpRequest';

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.scss']
})
export class RequestCardComponent implements OnInit {

  @Input() request!: HelpRequest;

  @Output() goToMap : EventEmitter<HelpRequest> = new EventEmitter<HelpRequest>();

  constructor() { }

  ngOnInit(): void {
  }

  showFullText = false;

  toggleFullText() {
    this.showFullText = !this.showFullText;
  }

  goToMapLocation() {

    this.goToMap.emit(this.request);

  }

}
