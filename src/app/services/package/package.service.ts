import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPackage } from 'src/app/interface/IPackage';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(private http:HttpClient) { }

  getPackages():Observable<IPackage[] | null> {
    return this.http.get<IPackage[]| null>('http://localhost:8080/api/trainingPackages');
  }
}
