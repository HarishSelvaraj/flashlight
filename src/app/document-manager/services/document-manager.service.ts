import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DocumentManagerService {

  formTypes: any;
  selectedData: any = {};
  formTypesData = [
    { value: 'S', viewValue: 'Search', tabs: false },
    { value: 'L', viewValue: 'List', tabs: false },
    { value: 'E', viewValue: 'Edit', tabs: true },
    { value: 'P', viewValue: 'Portfolio', tabs: false },
    { value: 'R', viewValue: 'Reports', tabs: false }
  ];
    constructor() { }

    setDocumentFormTypes(formTypes) {
        this.formTypes = formTypes;
    }

    getDocumentFormTypes(): Observable<any> {
        return this.formTypes;
    }
    selectedMetaData(data) {
      this.selectedData = data;
    }

}