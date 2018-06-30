import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class GeneralServiceService {

  constructor(public http: HttpClient) { }
  
  getMetaDataList(api,requestData) {
    return this.http.post(environment.apiUrl + api, requestData);
  }

}
