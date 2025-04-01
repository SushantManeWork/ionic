import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITrainingType } from 'src/app/interface/ITrainingType';

@Injectable({
  providedIn: 'root'
})
export class TrainingTypeService {

  constructor(private http:HttpClient) { }

  getTrainingTypes():Observable<ITrainingType[]>{
    return this.http.get<ITrainingType[]>('http://localhost:8080/api/trainingTypes');
  }

  getTrainingTypesByTrainer(id:number):Observable<ITrainingType[]>{
    return this.http.get<ITrainingType[]>('http://localhost:8080/api/trainingTypes/'+id);
  }
}
