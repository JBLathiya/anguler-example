import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }
  GetAPI(path:string,data: any) {
    return new Promise((resolve, reject) => {
    
      this.http.get(path, { }).subscribe((response: any) => {
        resolve(response);
      }, (err) => {
        reject(err);
      })
    })
  }
}
