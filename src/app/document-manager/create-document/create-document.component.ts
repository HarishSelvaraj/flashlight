import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { DocumentManagerService } from '../services/document-manager.service';
import {GeneralServiceService} from '../../service/general-service.service';

@Component({
  selector: 'app-create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['./create-document.component.scss']
})
export class CreateDocumentComponent implements OnInit {

  requestDbData = {
    "dbModel": "sqlModel"
  };
  requestTableData = {
    "dbModel": "sqlModel",
    "database": "mssql",
    "dbname": ""
  }
  requestColumnData = {
    "dbModel": "sqlModel",
    "database": "mssql",
    "dbname": "",
    "tablename": ""
  }

  dbList: any;
  objectList: any;
  columnstList: any;

  databases = [
    { value: 'db1', viewValue: 'Database 1' },
    { value: 'db2-1', viewValue: 'Database 2' },
    { value: 'db3', viewValue: 'Database 3' }
  ];

  objects = [
    { value: 'obj1', viewValue: 'Object 1' },
    { value: 'obj2', viewValue: 'Object 2' },
    { value: 'obj3', viewValue: 'Object 3' }
  ];

  //  formType = new FormControl();
  formType = new FormControl('', [Validators.required]);
  formTypes = [
    { value: 'Search', viewValue: 'Search', tabs: false },
    { value: 'List', viewValue: 'List', tabs: false },
    { value: 'Edit', viewValue: 'Edit', tabs: true },
    { value: 'Portfolio', viewValue: 'Portfolio', tabs: false },
    { value: 'Reports', viewValue: 'Reports', tabs: false }
  ];


  constructor(private router: Router, private documentManagerService: DocumentManagerService, private generalServiceService: GeneralServiceService) { }

  ngOnInit() {
    this.generalServiceService.getDbLlist('addNewDocument').subscribe
      (repsonse => {
        debugger;
        this.dbList = repsonse['createDocument'].dbname;
      });
  }

  selectFormType() {
    this.documentManagerService.setDocumentFormTypes(this.formType);
  }

  onChangeDB(db) {
    debugger;
    this.requestTableData.dbname = db
    this.generalServiceService.getTableLlist('listTablesInDatabase', this.requestTableData).subscribe
      (repsonse => {
        debugger;
        this.objectList = repsonse['metaDataResult'].tableList;
      });
  }
  onChangeTable(table) {
    this.requestColumnData.dbname = this.requestTableData.dbname;
    this.requestColumnData.tablename = table
    this.generalServiceService.getColumnlist('listAllColumnsInATable', this.requestColumnData).subscribe
      (repsonse => {
        debugger;
        this.columnstList = repsonse['metaDataResult'].columns;
      });
  }
  documentDetails() {
    console.log(this.formType);
    if (this.formType['status'] == "INVALID") {
      alert('Pls select at least one form type.');
      return false;
    }
    this.router.navigate(['/document-manager/details']);
  }

}
