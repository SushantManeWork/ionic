import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILogin } from 'src/app/interface/ILogin';
import { ITrainer } from 'src/app/interface/ITrainer';
import { ITrainerForCreate } from 'src/app/interface/ITrainerForCreate';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  constructor(private http:HttpClient) { }

  getTrainer(id:number):Observable<ITrainer | null> {
    return this.http.get<ITrainer| null>('http://localhost:8080/api/trainers/trainer/' + id);
  }

  createTrainer(trainer:ITrainerForCreate):Observable<number | null> {
    return this.http.post<number | null>('http://localhost:8080/api/trainers', trainer);
  }

  login(object:ILogin):Observable<number | null>{
    return this.http.post<number | null>('http://localhost:8080/api/trainers/login',object);
  }

  updateUsers(id:number):Observable<number | null>{
    return this.http.put<number | null>('http://localhost:8080/api/trainers/users/' + id, id);
  }

  getCreateTrainer(id:number):Observable<ITrainerForCreate | null> {
    return this.http.get<ITrainerForCreate| null>('http://localhost:8080/api/trainers/' + id);
  }

  update(id:number,trainer:ITrainerForCreate):Observable<ITrainerForCreate | null> {
    return this.http.put<ITrainerForCreate| null>('http://localhost:8080/api/trainers/' + id,trainer);
  }
}
