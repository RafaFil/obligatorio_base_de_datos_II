import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Map, Marker, NavigationControl } from 'maplibre-gl';
import { HelpMapMarkerComponent } from '../help-map-marker/help-map-marker.component';
import { HelpAplicationService } from 'src/app/modules/core/services/help-aplication.service';
import { HelpAplication } from 'src/app/modules/core/interfaces/helpAplication';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy{

  map: Map | undefined;

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  @ViewChildren('mapMarker') mapMarkerComponents!: QueryList<HelpMapMarkerComponent>;

  private currentMarkers: Marker[] = [];

  public HelpRequestArr : HelpAplication[] = []
  
  constructor(private helpAplicationService : HelpAplicationService) { }

  ngOnInit(): void {
    this.HelpRequestArr = this.helpAplicationService.getAllAplications();
  }

  ngAfterViewInit() {
    const initialState = { lng: -56.157485609445175 , lat: -34.88791314870603 , zoom: 15 };
    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=8ApfxTeaKPn9kJ9l7F7V`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    });
    this.map.addControl(new NavigationControl({}), 'top-right');

    this.loadMarkers();

  }

  ngOnDestroy() {
    this.map?.remove();
  }

  loadMarkers() {

    if (this.map) {
      this.map.repaint = false;
    }

    this.mapMarkerComponents.forEach((mapMarkerComponent, index) => {


      const lat = this.HelpRequestArr[index].lat;
      const lng = this.HelpRequestArr[index].lng;

      if (lat && lng && this.map) {
        const marker = new Marker({
          element: mapMarkerComponent.elementRef.nativeElement
        })
        .setLngLat([lng, lat])
        .addTo(this.map);
      }
    });

    if (this.map) {
      this.map.repaint = true;
      this.map.triggerRepaint();
    }

    }
    
}