import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './task';
import { environment } from '../environments/environment';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

class BackendBaseService {

  baseURL: string = environment.apiUrl;

  constructor(){}
}


@Injectable({
  providedIn: 'root'
})
export class TaskDataService extends BackendBaseService {

  owner: number = environment.apiUser;

  constructor(private http:HttpClient) {
    super()
  }

  public getTasks(): Observable<any>{
    return this.http.get(`${this.baseURL}/tasks/${this.owner}`);
  }

  public getTask(id: string): Observable<any>{
    return this.http.get(`${this.baseURL}/tasks/${id}`);
  }

  public createTask(task): Observable<any>{
    const body = JSON.stringify(task);
    return this.http.post(`${this.baseURL}/tasks/${this.owner}`, body, httpOptions);
  }

  public updateTask(data, id: string): Observable<any>{
    const body = JSON.stringify(data);
    return this.http.patch(`${this.baseURL}/tasks/${id}`, body, httpOptions);
  }

  public deleteTask(id: string): Observable<any>{
    return this.http.delete(`${this.baseURL}/tasks/${id}`);
  }
}
