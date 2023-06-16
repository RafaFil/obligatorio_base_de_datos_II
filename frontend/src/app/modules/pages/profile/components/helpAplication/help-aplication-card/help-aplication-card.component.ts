import { Component, Input, OnInit } from '@angular/core';
import { HelpRequest } from 'src/app/modules/core/interfaces/helpRequest';

@Component({
  selector: 'app-help-aplication-card',
  templateUrl: './help-aplication-card.component.html',
  styleUrls: ['./help-aplication-card.component.scss']
})
export class HelpAplicationCardComponent implements OnInit {

  @Input() helpRequest!: HelpRequest;

  constructor() { }

  ngOnInit(): void {
  }

}
