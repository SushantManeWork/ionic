import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMember } from 'src/app/interface/imember';
import { IUser } from 'src/app/interface/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http:HttpClient) { }

  createUser(object: IUser){
    return this.http.post('http://localhost:8080/api/users',object);
  }

  getUsers(id:number):Observable<IMember[]>{
    return this.http.get<IMember[]>('http://localhost:8080/api/users/trainer/'+id);
  }

  findById(id: number):Observable<IMember>{
    return this.http.get<IMember>('http://localhost:8080/api/users/'+id);
  }

  findUserById(id:number):Observable<IUser>{
    return this.http.get<IUser>('http://localhost:8080/api/users/user/'+id);
  }

  updateUser(id: number, user: IUser){
    return this.http.put('http://localhost:8080/api/users/'+id,user);
  }
}
