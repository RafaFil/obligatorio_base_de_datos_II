import { Injectable } from '@angular/core';
import { UserAuth } from '../interfaces/userAuth';
import { apiMessage } from '../interfaces/apiMessage';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { UserDataResponse } from '../interfaces/apiDataResponse/userDataResponse';

const apiURL = "http://localhost:3000/api/v1"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  runningUser?: UserDataResponse;

  constructor(private http: HttpClient) { }

  checkIdIsValid(DO : string | null | undefined) {
    if (!DO) {
      return false;
    }
    else {
      const sevenDigitID = [1, 2, 3, 4, 7, 6];
      const eightDigitID = [8, 1, 2, 3, 4, 7, 6]
      const charID = DO.split('');
      let sum = 0;

      if (charID.length == 7) {
        for (let index = 0; index <= charID.length - 2; index++) {
          let number = Number.parseInt(charID[index]);
          sum += number * sevenDigitID[index];
        };
        const lastDigit = sum % 10;
        if (lastDigit != Number.parseInt(charID[charID.length - 1])) {
          return false;
        }
        return true;
      }

      else if (charID.length == 8) {
        for (let index = 0; index <= charID.length - 2; index++) {
          let number = Number.parseInt(charID[index]);
          sum += number * eightDigitID[index];
        };
        const lastDigit = sum % 10;
        if (lastDigit != Number.parseInt(charID[charID.length - 1])) {
          return false;
        }
        return true;
      }

      else {
        return false
      }
    }
  }

  registerUser(u : User) : Observable<apiMessage<UserDataResponse>> {

    return this.http.post<apiMessage<UserDataResponse>>(`${apiURL}/users/register`,u)
    .pipe(
      catchError( err => of(err))
    );
  }

  getUserByCredentials(credentials : UserAuth) : Observable<apiMessage<{
    user : UserDataResponse,
    token : string
  }>> {
  
    return this.http.post<apiMessage<{
      user : UserDataResponse,
      token : string
    }>>(`${apiURL}/users/auth`,credentials)
      .pipe(
        tap(response => {
          if (response.success) {
            this.runningUser = response.data?.user;
            console.log(this.runningUser);
            localStorage.setItem('token', response.data?.token!);
          }
        })
      );

  }

  validateToken(): Observable<any> {
    const url = `${apiURL}/users/renew`;

    return this.http.get<apiMessage<any>>( url )
      .pipe(
        tap( response => {
          console.log(response);
          if (response.success) {
            this.runningUser = response.data?.user;
            localStorage.setItem('token', response.data?.token!);
          }

          return response.success;
        }),
        catchError( err => of(false) )
      );
  }

  getUserByDO(DO : string) : Observable<apiMessage<Object>> {

    return this.http.get<apiMessage<Object>>(`${apiURL}/users/withId/:${DO}`)
    .pipe(
      catchError( err => of(err))
      );
  }

  getRunningUser() {

    return this.runningUser;
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
