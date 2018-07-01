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
  baseName;
  dbList: any;
  objectList: any;
  columnstList: any;
  selectedData: any = {};
  masterData: any = [];
  detailsData: any;
  formRecord: any;

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
  formType: any;
  formTypes:any;


  constructor(private router: Router, private documentManagerService: DocumentManagerService, private generalServiceService: GeneralServiceService) { 
    this.formTypes=this.documentManagerService.formTypesData
  }

  ngOnInit() {
    let api = 'addNewDocument';
    this.generalServiceService.getDbLlist(api).subscribe
      (repsonse => {
        this.dbList = repsonse['createDocument'].dbname;
        this.formRecord = repsonse['createDocument'].form;
       // this.masterData = repsonse['createDocument'].form.master;
       // this.detailsData = repsonse['createDocument'].form.detail;
      });
  }

  selectFormType() {
    debugger;
    this.documentManagerService.setDocumentFormTypes(this.formType);
  }

  onChangeDB(db) {
    
    this.requestTableData.dbname = db
    this.generalServiceService.getTableLlist('listTablesInDatabase', this.requestTableData).subscribe
      (repsonse => {
        this.objectList = repsonse['metaDataResult'].tableList;
      });
  }
  onChangeTable(table) {
    this.requestColumnData.dbname = this.requestTableData.dbname;
    this.requestColumnData.tablename = table;
    this.generalServiceService.getColumnlist('listAllColumnsInATable', this.requestColumnData).subscribe
      (repsonse => {
        this.columnstList = repsonse['metaDataResult'].columns;
      });
  }
  documentDetails() {
    console.log(this.formType);
    //if (this.formType['status'] == "INVALID") {
    //  alert('Pls select at least one form type.');
    //  return false;
    //}
    
    this.selectedData.db = this.requestTableData;
    this.selectedData.table = this.requestColumnData;
    this.selectedData.columns = this.columnstList;
    this.selectedData.baseName = this.baseName;
    if (this.formType.length > 0) {
      for (let key in this.formType) {
        this.masterData.push(Object['assign']({}, this.formRecord['master']));
        this.masterData[key]._fl_doc_name = this.baseName +'_'+ this.formType[key].viewValue;
        this.masterData[key]._fl_doc_type = this.formType[key].value;
        this.masterData[key]._fl_base_name = this.baseName;
        this.masterData[key]._fl_base_table = this.requestColumnData.tablename;

      }
      
      this.selectedData.masterData = this.masterData;
      this.selectedData.detailsData = Object['assign']({}, this.formRecord['detail']);
    }
    this.documentManagerService.selectedMetaData(this.selectedData);
    this.router.navigate(['/document-manager/details','create']);
  }

}
