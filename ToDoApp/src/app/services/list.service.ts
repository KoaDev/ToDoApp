import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { List } from '../models/list';

@Injectable({
  providedIn : 'root'
})
export class ListService {

  private url : string = 'http://localhost:3000/list/';

  constructor(private http : HttpClient) { }

  get(_id : string) : Observable<Array<List>> {
    return this.http.get<Array<List>>(this.url + _id, {withCredentials : true});
  }

  post(list : List) : Observable<List> {
    return this.http.post<List>(this.url, list, {withCredentials : true});
  }

  delete(list : List) : Observable<List> {
    return this.http.delete<List>(this.url + list._id, {withCredentials : true});
  }

}
