import { Injectable } from '@angular/core';
import { UserAuth } from '../interfaces/userAuth';
import { apiMessage } from '../interfaces/apiMessage';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

const apiURL = "http://localhost:3000/api/v1"

@Injectable({
  providedIn: 'root'
})
export class UserService {

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
  //cambiar el generic de apiMessage
  getUserByCredentials(credentials : UserAuth) : Observable<apiMessage<Object>> {
  
    return this.http.post<apiMessage<Object>>(`${apiURL}/user/auth`,credentials)
      .pipe(
      catchError( err => of(err))
    );

  }
  //Idem generic
  registerUser(u : User) : Observable<apiMessage<Object>> {

    return this.http.post<apiMessage<Object>>(`${apiURL}/user/register`,u)
    .pipe(
      catchError( err => of(err))
    );
  }
}
