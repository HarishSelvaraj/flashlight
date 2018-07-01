import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ResponsiveTableHelpers } from '../../helpers.data';
import { DocumentManagerService } from '../../services/document-manager.service';
import {GeneralServiceService} from '../../../service/general-service.service';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.scss']
})
export class DocumentDetailsComponent implements OnInit {

  formTypesselected: any;
  lookupsData: any;
  columnsList: any;
  requestBody: any = {
    "dbModel": "sqlModel",
    "database": "mssql"};
  requestLookup = {
    "dbModel": "sqlModel",
    "database": "mssql"
  }
  formTypesStructure = {
    search: [
      {
        name: 'S.NO',
        key: 'id',
        order: 'asc'
      },
      {
        name: 'BASE NAME',
        key: 'basename',
        order: 'asc'
      },
      {
        name: 'DATABASE',
        key: 'database',
        order: 'asc'
      },
      {
        name: 'OBJECT',
        key: 'object',
        order: 'asc'
      },
      {
        name: 'FORM TYPE',
        key: 'formtype',
        order: 'asc'
      },
      {
        name: 'ACTION',
        key: 'action',
        order: 'asc'
      }
    ],
    rows: [{
      id: "01",
      basename: "Base Name 1",
      database: "Database 1",
      object: "Table Name",
      formtype: "Document Type 1",
      action: '<i class="nb-edit"></i>'
    }, {
        id: "02",
        basename: "Base Name 2",
        database: "Database 2",
        object: "View",
        formtype: "Document Type 2",
        action: '<i class="nb-edit"></i>'
      }, {
        id: "03",
        basename: "Base Name 3",
        database: "Database 3",
        object: "Table Name",
        formtype: "Document Type 3",
        action: '<i class="nb-edit"></i>'
      }]
  }

  constructor(private router: Router, private generalService: GeneralServiceService, private documentManagerService: DocumentManagerService) { }

  ngOnInit() {
    debugger;
    this.generalService.getlookups('lookup', this.requestLookup).subscribe
      (repsonse => {
        debugger;
        this.lookupsData = repsonse['metaDataRelatedTables'].metaDataResult;
        console.log(this.lookupsData);
        //this.objectList = repsonse['metaDataResult'].tableList;
      });
    this.columnsList = this.documentManagerService.selectedData.columns;
    this.formTypesselected = this.documentManagerService.getDocumentFormTypes();

  }
  saveform() {
    debugger;
    this.requestBody.metaJson = {
      menu: [],
      master: this.documentManagerService.selectedData.masterData,
      details: []
    };


   
    for (let key in this.formTypesselected) {      
      for (let item in this.formTypesselected[key].columns) {
        if (this.formTypesselected[key].columns[item].checked) {
          this.requestBody.metaJson.details.push(Object['assign']({}, this.documentManagerService.selectedData.detailsData))
          this.requestBody.metaJson.details[item]._fl_default_value = this.formTypesselected[key].columns[item].defaultValue ? this.formTypesselected[key].columns[item].defaultValue : "";
          this.requestBody.metaJson.details[item]._fl_elem_type = this.formTypesselected[key].columns[item].etype ? this.formTypesselected[key].columns[item].etype : "";
          this.requestBody.metaJson.details[item]._fl_elem_label = this.formTypesselected[key].columns[item].label ? this.formTypesselected[key].columns[item].label : "";
          this.requestBody.metaJson.details[item]._fl_elem_view = this.formTypesselected[key].columns[item].vtype ? this.formTypesselected[key].columns[item].vtype : "";
          this.requestBody.metaJson.details[item]._fl_elem_ref = this.formTypesselected[key].columns[item].lookup ? this.formTypesselected[key].columns[item].lookup : "";
          this.requestBody.metaJson.details[item]._fl_elem_len = this.formTypesselected[key].columns[item].length ? this.formTypesselected[key].columns[item].length : "";
          this.requestBody.metaJson.details[item]._fl_data_size = this.formTypesselected[key].columns[item].size ? this.formTypesselected[key].columns[item].size : "";
          this.requestBody.metaJson.details[item]._fl_doc_type = this.formTypesselected[key].value ? this.formTypesselected[key].value : "";
          this.requestBody.metaJson.details[item]._fl_doc_name = this.documentManagerService.selectedData.baseName + '_' + this.formTypesselected[key].viewValue;
        }
      }
    }
    this.generalService.postMetaData('addNewMetaDataDocument', this.requestBody).subscribe
      (repsonse => {
        debugger;
        this.router.navigate(['/document-manager']);
        //this.objectList = repsonse['metaDataResult'].tableList;
      });
    this.requestBody;
  }
  editDocument() {
    this.router.navigate(['/document-manager/addnew']);
  }

}
