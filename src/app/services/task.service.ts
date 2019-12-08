import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

import {Task} from '../objects/task';

import { environment } from './../../environments/environment';

@Injectable({providedIn: 'root'})
export class TaskService {

  private tasksUrl = environment.apiUrl + '/api/task/';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient) {
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl)
      .pipe(
        tap()
      );
  }

  getTask(id: number): Observable<Task> {
    const url = `${this.tasksUrl}${id}`;
    return this.http.get<Task>(url).pipe(
      tap()
    );
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.tasksUrl, task, this.httpOptions).pipe(
      tap()
    );
  }

  deleteTask(task: Task | number): Observable<Task> {
    const id = typeof task === 'number' ? task : task.id;
    const url = `${this.tasksUrl}${id}`;

    return this.http.delete<Task>(url, this.httpOptions).pipe(
      tap()
    );
  }

  updateTask(task: Task): Observable<any> {
    return this.http.put(`${this.tasksUrl}${task.id}`, task, this.httpOptions).pipe(
      tap()
    );
  }
}
