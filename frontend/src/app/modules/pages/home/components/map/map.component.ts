import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Map, NavigationControl } from 'maplibre-gl';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy{

  map: Map | undefined;

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const initialState = { lng: -56.157485609445175 , lat: -34.88791314870603 , zoom: 16 };
    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=8ApfxTeaKPn9kJ9l7F7V`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    });
    this.map.addControl(new NavigationControl({}), 'top-right');
  }

  ngOnDestroy() {
    this.map?.remove();
  }

}
