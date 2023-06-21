import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Map, Marker, NavigationControl } from 'maplibre-gl';
import { HelpMapMarkerComponent } from '../help-map-marker/help-map-marker.component';
import { HelpRequestService } from 'src/app/modules/core/services/help-request.service';
import { HelpRequest } from 'src/app/modules/core/interfaces/helpRequest';
import { HelpRequestPreviewData } from 'src/app/modules/core/interfaces/apiDataResponse/HelpRequestPreviewData';



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

  @Input() public HelpRequestArr : HelpRequestPreviewData[] = []
  
  constructor(private helpAplicationService : HelpRequestService) { }

  ngOnInit(): void {
    
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

        this.currentMarkers.push(marker);
      }

    });

    if (this.map) {
      this.map.repaint = true;
      this.map.triggerRepaint();
    }

    }
    
  goToLocation(lng : number, lat : number) {
    
    if (this.map) {

      this.map.setCenter([lng,lat])
      
      this.currentMarkers.forEach ( (marker, index) => {
        
        if (marker.getLngLat().lng == lng && marker.getLngLat().lat == lat) {

          this.mapMarkerComponents.get(index)?.displayDialogRequest();

        }
      })
    }
  }
}