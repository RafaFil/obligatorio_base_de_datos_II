import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { apiMessage } from '../interfaces/apiMessage';
import { UserDataResponse } from '../interfaces/apiDataResponse/userDataResponse';

const apiURL = "http://localhost:3000/api/v1/friends"

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(private http : HttpClient) { }

  getAllUserFriend() : Observable<apiMessage<UserDataResponse[]>> {

    return this.http.get<apiMessage<UserDataResponse[]>>(apiURL)
  }

  AddAFriend(friendId : string) : Observable<apiMessage<{
    usuario1_ci: string, 
    usuario2_ci: string
  }>> {

    return this.http.post<apiMessage<{
      usuario1_ci: string, 
      usuario2_ci: string
    }>>(`${apiURL}/addFriend `, { otherUserId : friendId}).pipe(
      catchError((err) => { return of(err)
    }));
  }
}
