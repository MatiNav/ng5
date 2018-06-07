import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'



@Injectable()
export class DataServiceService {

  private url = 'http://www.mocky.io/v2/5b1891eb3000002c00da1316'

  constructor(private http:Http) { }

  getDataFromService(){
   return new Promise((resolve, reject) => {
    this.http.get(this.url).map(res => res.json()).toPromise()
    .then(d=>{
      resolve(d)
    })
    .catch(e=>{
      reject(e)
    })
   })
  }

}
