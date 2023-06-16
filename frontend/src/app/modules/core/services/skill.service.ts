import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiMessage } from '../interfaces/apiMessage';
import { Ability } from '../interfaces/ability';

const apiURL = "http://localhost:3000/api/v1"

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private http : HttpClient) { }

  getAllAbility () : Observable<apiMessage<Ability[]>> {
    return this.http.get<apiMessage<Ability[]>>(`${apiURL}/ability`);
  }

  updateAbilityLevel( level : string ) {

  }

  addHability() {

  }

  getSkillLevel() {
    return  [
      "Principiante",
      "Medio",
      "Alto",
      "Maestro"
    ]
  }
}
