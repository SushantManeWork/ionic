import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRoutine } from 'src/app/interface/IRoutine';

@Injectable({
  providedIn: 'root'
})
export class RoutineService {

  constructor(private http:HttpClient) { }

  getTrainerRoutine(id:number):Observable<Map<string,IRoutine[]> | null>{
    return this.http.get<Map<string, IRoutine[]> | null>('http://localhost:8080/api/trainers/routine/' + id);
  }
}
