import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { apiMessage } from '../interfaces/apiMessage';
import { PostulationData } from '../interfaces/apiDataResponse/PostulationData';
import { PostulationUserData } from '../interfaces/apiDataResponse/PostulationsUserData';

const apiURL = "http://localhost:3000/api/v1"

@Injectable({
  providedIn: 'root'
})
export class PostulationService {

  constructor(private http : HttpClient) { }

  getAllUserPostulation() : Observable<apiMessage<PostulationUserData>> {

    return this.http.get<apiMessage<PostulationUserData>>(`${apiURL}/postulations/mine`)
    .pipe(
      catchError( err => of(err))
    );
  }

  submitPostulation(requestId : number) : Observable <apiMessage<PostulationData>> {

    return this.http.post<apiMessage<PostulationData>>(`${apiURL}/postulations/apply`, 
    {requestId : requestId})
    .pipe(
      catchError( err => of(err))
    );
  }

  cancelPostulation() {

  }
}
