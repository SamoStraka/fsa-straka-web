import { Injectable } from '@angular/core';
import {BehaviorSubject,map , Observable, tap} from "rxjs";
import {User} from "./user";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User | undefined>(undefined);

  private token: string | undefined;

  constructor(private http: HttpClient) {
  }

  login(user: User): Observable<User> {
    return this.http.post('https://fsa-straka-api.azurewebsites.net/api/users/login', user, {responseType: 'text'})
      .pipe(map(token => {
        this.token = token;
        if (!token) {
          console.log("nevydalo")
          return undefined
        }

        return JSON.parse(atob(token.split('.')[1]));
      }))
      .pipe(tap(user => {
        this.userSubject.next(user);
      }))
  }

  get(){
    return this.userSubject.getValue();
  }

  getToken(){
    return this.token;
  }

  onUserChange(){
    return this.userSubject.asObservable();
  }

  logout() {
    this.userSubject.next(undefined);
  }
}
