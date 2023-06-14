import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class GeoCodeService {

  private apiKey = '7cffa79f3d5648da9f1f7d1abd6d9fab';


  constructor(private http: HttpClient) {}

  getCordinatesFromLocation(address: string) {

    console.log(encodeURIComponent(address));
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${this.apiKey}`;
    return this.http.get(url);
  }

  getLocationFromCoordinates(latitude: number, longitude: number){
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${this.apiKey}`;
    return this.http.get(url);
  }
}