import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MapComponent } from '../../components/map/map.component';
import { Marker } from 'maplibre-gl';
import { GeoCodeService } from 'src/app/modules/core/services/geo-code.service';
import { HelpRequest } from 'src/app/modules/core/interfaces/helpRequest';
import { HelpRequestService } from 'src/app/modules/core/services/help-request.service';
import { HelpRequestPreviewData } from 'src/app/modules/core/interfaces/apiDataResponse/HelpRequestPreviewData';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  @ViewChild('map') map!: MapComponent;
  isDrawerOpen = false;

  requsetsArr : HelpRequestPreviewData[] =[]
  searchText: string = '';

  constructor(private requestService : HelpRequestService) { }

  ngOnInit(): void {
    this.requestService.getAllHelpRequest().subscribe(
      requests => {

        if ( requests.success && requests.data ) {
  
          this.requsetsArr = requests.data;
          this.loadMarkersIntoMap(" ");
        }
      }
    );
  }

  loadMarkersIntoMap(value : any) {
    
    this.map.loadMarkers();
  }

  openSideNav() {

    this.isDrawerOpen = true;
  }

  goToRequestMapLocation(request : HelpRequest) {

    this.isDrawerOpen = false;

    const lat = request.lat;
    const lng = request.lng;

    if (lat && lng) {

      this.map.goToLocation(lng, lat);
    }

  }

  sideNavClosed() {
    this.isDrawerOpen = false;
  }

  requestFilterSelected() {
    
    return
  }



}
