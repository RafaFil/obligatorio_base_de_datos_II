import { Component, Input, OnInit } from '@angular/core';
import { UserDataResponse } from 'src/app/modules/core/interfaces/apiDataResponse/userDataResponse';

@Component({
  selector: 'app-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.scss']
})
export class FriendCardComponent implements OnInit {

  @Input() friend!: UserDataResponse;

  constructor() { }

  ngOnInit(): void {
  }

}
