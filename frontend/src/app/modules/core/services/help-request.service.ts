import { Injectable } from '@angular/core';
import { HelpRequest } from '../interfaces/helpRequest';
import { apiMessage } from '../interfaces/apiMessage';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { HelpRequestPreviewData } from '../interfaces/apiDataResponse/HelpRequestPreviewData';
import { HelpRequestData } from '../interfaces/apiDataResponse/HelpReqData';

const apiURL = "http://localhost:3000/api/v1/requests"

@Injectable({
  providedIn: 'root'
})
export class HelpRequestService {

  //helpRequestArr : HelpRequest[] = []

  constructor(private http : HttpClient) { }

  getAllHelpRequest() : Observable<apiMessage<HelpRequestPreviewData[]>> {

    return this.http.get<apiMessage<HelpRequestPreviewData[]>>(`${apiURL}`)
    .pipe(
      catchError( err => of(err))
    );

  }

  getHelpRequestById(id : number) : Observable<apiMessage<HelpRequestData>> {
    
    return this.http.get<apiMessage<HelpRequestData>>(`${apiURL}/:${id}`)
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

  
}
