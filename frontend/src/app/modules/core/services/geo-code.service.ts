import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class GeoCodeService {

  private apiKey = environment.geoCodeApiKey;


  constructor(private http: HttpClient) {}

  getCordinatesFromLocation(address: string) {


    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${this.apiKey}`;
    return this.http.get(url).pipe(
      
    );
  }

  getLocationFromCoordinates(latitude: number, longitude: number) : Observable<any> {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${this.apiKey}`;
    return this.http.get<any>(url).pipe(map (response => response));
  }
}
