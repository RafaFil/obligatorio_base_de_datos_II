import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiMessage } from '../interfaces/apiMessage';
import { Skill } from '../interfaces/skill';

const apiURL = "http://localhost:3000/api/v1"

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private http : HttpClient) { }

  getAllSkills () : Observable<apiMessage<Skill[]>> {
    return this.http.get<apiMessage<Skill[]>>(`${apiURL}/skills`);
  }

  getAllUserSkills(userDo : string) : Observable<apiMessage<Skill[]>> {

    return this.http.get<apiMessage<Skill[]>>(`${apiURL}/skills/user/${userDo}`);

  }

  updateSkillLevel( level : string ) {

  }

  addSkill() {

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
