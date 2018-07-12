import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { _ } from 'underscore';

@Injectable()
export class GeneralServiceService {

  // raji added
  request = {
    "reqbody": {
      "db": { "model": "sqlModel", "type": "mssql" },
      "oper": "list",
      "lookup": "META_TABLES",
      "type": "JSLIM",
      "filter": [],
      "startrow": 1,
      "maxrows": 100
    }
  }

  constructor(public http: HttpClient) { }

  getMetaDataList(api, requestData) {
    return this.http.post(environment.apiUrl + api, requestData);
  }
  getDbLlist(api) {
    return this.http.post(environment.apiUrl + api, {});
  }
  getTableLlist(api, requestData) {
    return this.http.post(environment.apiUrl + api, requestData);
  }
  getColumnlist(api, requestData) {
    return this.http.post(environment.apiUrl + api, requestData);
  }
  getlookups(api, requestData) {
    return this.http.post(environment.apiUrl + api, requestData);
  }
  postMetaData(api, requestData) {
    return this.http.post(environment.apiUrl + api, requestData);
  }
  getExistingColums(api, requestData) {
    return this.http.post(environment.apiUrl + api, requestData);
  }
  deleteMetadatalist(api, requestData) {
    return this.http.post(environment.apiUrl + api, requestData);
  }

  getData(api) {
    return this.http.post(environment.apiUrl + api, this.request);
  }

  getResult(res) {

    let isSlim = false;
    if (res.api.type === "JSLIM")
      isSlim = true;

    if (isSlim) {
      res.results.rowOrig = [];
      _.extend(res.results.rowOrig, res.results.rows);
    }

    let rRow = [];

    for (let r = 0; r < res.results.rows.length; r++) {
      let tRow = {};
      let cRow = res.results.rows[r];
      for (let c = 0; c < res.results.cols.length; c++) {
        let cName = res.results.cols[c];
        let cPos = res.results.cpos[c];
        tRow[cName] = cRow[cPos];
      }
      rRow.push(tRow);
    }

    res.results.rows = rRow;
    return res;
  }
}
