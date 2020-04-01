import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { apiEndpoint } from '../../endpoints/endpoints';
import { Observable } from 'rxjs';
import {IUser} from '../usermodel/user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }
  adduser(data:any):Observable<IUser[]>{
    return this.http.post<IUser[]>(environment.apiURL + apiEndpoint.adduser, data)
  }
  getUser():Observable<IUser[]>{
    return this.http.get<IUser[]>(environment.apiURL + apiEndpoint.adduser)
  }
}
