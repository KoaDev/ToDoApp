import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) {}

  login(user : User) : Observable<void>  {
    return this.http.post<void>('http://localhost:3000/login', user, { withCredentials : true });
  }

  register(user : User) : Observable<void> {
    return this.http.post<void>('http://localhost:3000/register', user, { withCredentials : true });
  }

  logout() : Observable<void> {
    return this.http.post<void>('http://localhost:3000/logout', {}, { withCredentials : true });
  }
  
  isConnected() : Observable<void> {
    return this.http.get<void>('http://localhost:3000/logged', { withCredentials : true });
  }

  getinfo() : Observable<void> {
    return this.http.get<void>('http://localhost:3000/user', { withCredentials : true });
  }

}
