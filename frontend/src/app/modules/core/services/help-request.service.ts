import { Injectable } from '@angular/core';
import { HelpRequest } from '../interfaces/helpRequest';
import { Marker } from 'maplibre-gl';
import { helpRequestMock } from '../mocks/helpRequest.mock';

@Injectable({
  providedIn: 'root'
})
export class HelpRequestService {

  helpRequestArr : HelpRequest[] = []

  constructor() { }

  getAllAplications() {

    const mock = new helpRequestMock().getAllHelpRequest();

    mock.forEach( h => {
      this.helpRequestArr.push(h);
    })

    return this.helpRequestArr;

  }

  submitAplication(helpAplication : HelpRequest) {

    this.helpRequestArr.push(helpAplication);
  }

  
}
