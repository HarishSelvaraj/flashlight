import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DocumentManagerService {

    formTypes: any;

    constructor() { }

    setDocumentFormTypes(formTypes) {
        this.formTypes = formTypes;
    }

    getDocumentFormTypes(): Observable<any> {
        return this.formTypes.value;
    }
}