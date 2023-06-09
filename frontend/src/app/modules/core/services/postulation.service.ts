import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { apiMessage } from '../interfaces/apiMessage';
import { PostulationData } from '../interfaces/apiDataResponse/PostulationData';
import { PostulationUserData } from '../interfaces/apiDataResponse/PostulationsUserData';
import { HelpRequestData } from '../interfaces/apiDataResponse/HelpReqData';
import { UserDataResponse } from '../interfaces/apiDataResponse/userDataResponse';

const apiURL = "http://localhost:3000/api/v1"

@Injectable({
  providedIn: 'root'
})
export class PostulationService {

  constructor(private http : HttpClient) { }

  getAllUserPostulation() : Observable<apiMessage<PostulationUserData[]>> {

    return this.http.get<apiMessage<PostulationUserData[]>>(`${apiURL}/postulations/mine`)
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

  cancelPostulation(requestId: number, helperId: string) {
    return this.http.delete(`${apiURL}/postulations/request/${requestId}/${helperId}`)
    .pipe(catchError(err => of(err)));
  }

  getAllAplicantsToARequest(requestId : number) : Observable<apiMessage<{    
    username : string,
    userlastname: string,
    verified: boolean}[]>> {

    return this.http.get<apiMessage<{
      username : string,
      userlastname: string,
      verified: boolean}[]>>(`${apiURL}/postulations/request/${requestId}`)
    .pipe(
      map( res => {
        if (res === null) {
          res = {
            success: false,
            data: [],
            status: 204
          }
        }
        return res;
      }),
      catchError( err => of(err))
    );
  }
}
