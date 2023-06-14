import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MapComponent } from '../../components/map/map.component';
import { Marker } from 'maplibre-gl';
import { GeoCodeService } from 'src/app/modules/core/services/geo-code.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  @ViewChild('map') map!: MapComponent;

  constructor() { }

  ngOnInit(): void {

  }

  loadMarkersIntoMap(value : any) {
    
    this.map.loadMarkers();
  }

}
