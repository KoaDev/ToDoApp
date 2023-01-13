import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url:string = 'http://localhost:3000/task/';

  constructor(private http: HttpClient) { }

  getTaches() : Observable<Array<Task>> {
    return this.http.get<Array<Task>>(this.url, {withCredentials:true});
  }

  ajoutTaches(task : Task) : Observable<Task> {
    return this.http.post<Task>(this.url, task, {withCredentials:true});
  }

  updateTaches(task : Task) : Observable<Task> {
    return this.http.put<Task>(this.url + task._id, task, {withCredentials:true});
  }

  removeTaches(task : Task) : Observable<Task> {
    return this.http.delete<Task>(this.url + task._id, {withCredentials:true});
  }
}
