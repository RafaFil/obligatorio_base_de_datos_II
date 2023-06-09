import { Injectable } from '@angular/core';
import { HelpRequest } from '../interfaces/helpRequest';
import { apiMessage } from '../interfaces/apiMessage';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { HelpRequestPreviewData } from '../interfaces/apiDataResponse/HelpRequestPreviewData';
import { HelpRequestData } from '../interfaces/apiDataResponse/HelpReqData';
import { HelpRequestUserData } from '../interfaces/apiDataResponse/HelpReqUserData';

const apiURL = "http://localhost:3000/api/v1/requests"

@Injectable({
  providedIn: 'root'
})
export class HelpRequestService {

  constructor(private http : HttpClient) { }

  getAllHelpRequest() : Observable<apiMessage<HelpRequestPreviewData[]>> {

    return this.http.get<apiMessage<HelpRequestPreviewData[]>>(`${apiURL}`)
    .pipe(
      catchError( err => of(err))
    );

  }

  getHelpRequestById(id : number) : Observable<apiMessage<HelpRequestData>> {
    
    return this.http.get<apiMessage<HelpRequestData>>(`${apiURL}/withId/${id}`)
    .pipe(
      catchError( err => of(err))
    );
  }

  submitHelpRequest(helpRequest : HelpRequest) : Observable<apiMessage<HelpRequestData>>{

    return this.http.post<apiMessage<HelpRequestData>>(`${apiURL}/create`,helpRequest)
    .pipe (
      catchError( err => of(err))
    );
  }

  getAllHelpRequestUser(userDO : string) : Observable<apiMessage<HelpRequestUserData[]>> {
    
    return this.http.get<apiMessage<HelpRequestUserData[]>>(`${apiURL}/userDO/${userDO}`)
    .pipe(
      catchError (err => of(err))
    );
  }

  deleteUserRequest(requestId : number) : Observable<apiMessage<HelpRequestData>> {

    return this.http.delete<apiMessage<HelpRequestData>>(`${apiURL}/delete/${requestId}`);
  }

  
}
