import { Injectable } from '@angular/core';
import { HelpAplication } from '../interfaces/helpAplication';
import { Marker } from 'maplibre-gl';
import { helpRequestMock } from '../mocks/helpRequest.mock';

@Injectable({
  providedIn: 'root'
})
export class HelpAplicationService {

  helpRequestArr : HelpAplication[] = []

  constructor() { }

  getAllAplications() {

    const mock = new helpRequestMock().getAllHelpRequest();

    mock.forEach( h => {
      this.helpRequestArr.push(h);
    })

    return this.helpRequestArr;

  }

  submitAplication(helpAplication : HelpAplication) {

    this.helpRequestArr.push(helpAplication);
  }

  
}
