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
  getDbLlist(api) {
    return this.http.post(environment.apiUrl + api);
  }
  getTableLlist(api, requestData) {
    return this.http.post(environment.apiUrl + api, requestData);
  }
  getColumnlist(api, requestData) {
    return this.http.post(environment.apiUrl + api, requestData);
  }
  getlookups(api,requestData) {
    return this.http.post(environment.apiUrl + api, requestData);
  }
  postMetaData(api, requestData) {
    return this.http.post(environment.apiUrl + api, requestData);
  }

}
