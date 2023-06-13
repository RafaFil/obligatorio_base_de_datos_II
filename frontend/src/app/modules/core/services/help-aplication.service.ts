import { Injectable } from '@angular/core';
import { HelpAplication } from '../interfaces/helpAplication';
import { Marker } from 'maplibre-gl';

@Injectable({
  providedIn: 'root'
})
export class HelpAplicationService {

  helpAplicationArr : Marker[] = []

  constructor() { }

  getAllAplications() {

    return this.helpAplicationArr;
  }

  submitAplication(helpAplication : HelpAplication) {

    const marker = new Marker({}).setLngLat([-56.15,-34.88]);

    return this.helpAplicationArr.push(marker);
  }

  
}
