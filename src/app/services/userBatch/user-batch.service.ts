import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserBatchInfo } from 'src/app/interface/IUserBatchInfo';

@Injectable({
  providedIn: 'root'
})
export class UserBatchService {

  constructor(private http:HttpClient) { }

  create(userBatch: IUserBatchInfo){
    return this.http.post('http://localhost:8080/api/userBatchInfos',userBatch);
  }

  update(id: number, userBatch: IUserBatchInfo){
    return this.http.put('http://localhost:8080/api/userBatchInfos/batch/'+id,userBatch);
  }

  delete(id:number){
    return this.http.delete('http://localhost:8080/api/userBatchInfos/'+id);
  }
}
