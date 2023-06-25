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

  updateSkillLevel(level: number, idSkill: number  ) : Observable<apiMessage<any>> {

    return this.http.put<apiMessage<any>>(`${apiURL}/skills/editSkillLevel/`,
      {
        lvl: level,
        id: idSkill
      }
    );
  }

  addSkill(skill : Skill) : Observable<apiMessage<{id : number, level: number}>> {

    return this.http.post<apiMessage<{id : number, level: number}>>(`${apiURL}/skills/addSkill`,skill);
  }

}
