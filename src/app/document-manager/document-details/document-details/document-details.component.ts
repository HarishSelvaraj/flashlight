import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ResponsiveTableHelpers } from '../../helpers.data';
import { DocumentManagerService } from '../../services/document-manager.service';
import {GeneralServiceService} from '../../../service/general-service.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.scss']
})
export class DocumentDetailsComponent implements OnInit {

  formTypesselected: any;
  lookupsData: any;
  columnsList: any;
  formType: any = [];
  metaInfo: any;
  existingColumns: any;
  requestExisting = {
    "dbModel": "sqlModel",
    "database": "mssql",
    "doc_name": "",
    "doc_type": ""
  }
  requestColumnData = {
    "dbModel": "sqlModel",
    "database": "mssql",
    "dbname": "",
    "tablename": ""
  }
  requestBody: any = {
    "dbModel": "sqlModel",
    "database": "mssql"
  };
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

  constructor(private router: Router, private loader: NgxSpinnerService, private detectChange: ChangeDetectorRef, private route: ActivatedRoute, private generalService: GeneralServiceService, private documentManagerService: DocumentManagerService) {
    this.loader.hide();
    this.route.params.subscribe(params => {

      //this.formType = params['formType'];
      this.documentManagerService.selectedData.params = params['formType'];
      if (params['formType'] == 'edit') {
        //this.documentManagerService['selectedData'].selectedMeta;
        this.metaInfo = this.documentManagerService['selectedData'].selectedMeta
        this.requestColumnData.dbname = "Incite"
        this.requestColumnData.tablename = this.metaInfo._fl_base_table;
        for (let key in this.documentManagerService.formTypesData) {
          if (this.documentManagerService.formTypesData[key]['value'] == this.metaInfo._fl_doc_type) {
            this.formType.push(this.documentManagerService.formTypesData[key])
            this.documentManagerService.setDocumentFormTypes(this.formType);
          }
        }

        this.requestExisting.doc_name = this.documentManagerService.selectedData.selectedMeta._fl_doc_name;
        this.requestExisting.doc_type = this.documentManagerService.selectedData.selectedMeta._fl_doc_type;
        //this.generalService.getExistingColums('showExistingDocument', this.requestExisting).subscribe
        //  (repsonse => {
        //    this.documentManagerService.selectedData.detailsData = repsonse['details'];
        //    this.existingColumns = repsonse['showSelectedData'].metaDataResult;
        //    for (let key in this.existingColumns) {
        //      for (let item in this.columnsList) {
        //        if (this.existingColumns[key]._fl_elem_name == this.columnsList[item].COLUMN_NAME) {
        //          this.columnsList[item].etype = this.existingColumns[key]._fl_elem_type
        //          this.columnsList[item].label = this.existingColumns[key]._fl_elem_label
        //          this.columnsList[item].vtype = this.existingColumns[key]._fl_elem_view
        //          this.columnsList[item].lookup = this.existingColumns[key]._fl_elem_ref
        //          this.columnsList[item].defaultValue = this.existingColumns[key]._fl_default_value
        //          this.columnsList[item].size = this.existingColumns[key]._fl_data_size
        //          this.columnsList[item].length = this.existingColumns[key]._fl_elem_len
        //          this.columnsList[item].order = this.existingColumns[key]._fl_show_order

        //        }
        //      }

        //    }
        //    this.detectChange.detectChanges();
        //    this.columnsList
        //  }); 
      }
    });
  }

  createInitData() {
    this.columnsList = this.documentManagerService.selectedData.columns;
    this.formTypesselected = this.documentManagerService.getDocumentFormTypes();
  }

  ngOnInit() {
    this.loader.show();
    this.generalService.getlookups('lookup', this.requestLookup).subscribe
      (repsonse => {
        this.loader.hide();
        this.lookupsData = repsonse['metaDataRelatedTables'].metaDataResult;
      });
    this.createInitData();
  }



  saveform() {
    this.loader.show();
    let apiUrl = "addNewMetaDataDocument";
    this.requestBody.metaJson = {
      menu: [],
      master: this.documentManagerService.selectedData.masterData,
      details: []
    };

    if (this.documentManagerService.selectedData.params == 'edit') {
      apiUrl = "updateExistingDocument";
      this.requestBody.metaJson.doc_name = this.documentManagerService.selectedData.selectedMeta._fl_doc_name;
      for (var i in this.documentManagerService.selectedData.existingColumns) {
        if (!this.documentManagerService.selectedData.existingColumns[i].checked) {
          this.documentManagerService.selectedData.existingColumns[i]._fl_elem_view = 'X';
        }
        delete this.documentManagerService.selectedData.existingColumns[i].checked;
      }
      this.requestBody.metaJson.details = this.documentManagerService.selectedData.existingColumns;
      
    }
    else {
    
      for (let key in this.formTypesselected) {
        for (let item in this.formTypesselected[key].columns) {
          if (this.formTypesselected[key].columns[item].checked) {
            this.requestBody.metaJson.details.push(Object['assign']({}, this.documentManagerService.selectedData.detailsData))
            this.requestBody.metaJson.details[this.requestBody.metaJson.details.length - 1]._fl_default_value = this.formTypesselected[key].columns[item].defaultValue ? this.formTypesselected[key].columns[item].defaultValue : "";
            this.requestBody.metaJson.details[this.requestBody.metaJson.details.length - 1]._fl_elem_type = this.formTypesselected[key].columns[item].etype ? this.formTypesselected[key].columns[item].etype : "";
            this.requestBody.metaJson.details[this.requestBody.metaJson.details.length - 1]._fl_elem_label = this.formTypesselected[key].columns[item].label ? this.formTypesselected[key].columns[item].label : "";
            this.requestBody.metaJson.details[this.requestBody.metaJson.details.length - 1]._fl_elem_view = this.formTypesselected[key].columns[item].vtype ? this.formTypesselected[key].columns[item].vtype : "";
            this.requestBody.metaJson.details[this.requestBody.metaJson.details.length - 1]._fl_elem_ref = this.formTypesselected[key].columns[item].lookup ? this.formTypesselected[key].columns[item].lookup : "";
            this.requestBody.metaJson.details[this.requestBody.metaJson.details.length - 1]._fl_elem_len = this.formTypesselected[key].columns[item].elmtLength ? this.formTypesselected[key].columns[item].elmtLength : "";
            this.requestBody.metaJson.details[this.requestBody.metaJson.details.length - 1]._fl_data_size = this.formTypesselected[key].columns[item].elmtSize ? this.formTypesselected[key].columns[item].elmtSize : "";
            this.requestBody.metaJson.details[this.requestBody.metaJson.details.length - 1]._fl_doc_type = this.formTypesselected[key].value ? this.formTypesselected[key].value : "";
            this.requestBody.metaJson.details[this.requestBody.metaJson.details.length - 1]._fl_doc_name = this.documentManagerService.selectedData.baseName + '_' + this.formTypesselected[key].viewValue;
            this.requestBody.metaJson.details[this.requestBody.metaJson.details.length - 1]._fl_elem_name = this.formTypesselected[key].columns[item].COLUMN_NAME ? this.formTypesselected[key].columns[item].COLUMN_NAME : "";
            this.requestBody.metaJson.details[this.requestBody.metaJson.details.length - 1]._fl_obj_type = 3;
            this.requestBody.metaJson.details[this.requestBody.metaJson.details.length - 1]._fl_show_in = this.formTypesselected[key].columns[item].showIn ? this.formTypesselected[key].columns[item].showIn : "";
            this.requestBody.metaJson.details[this.requestBody.metaJson.details.length - 1]._fl_show_for = this.formTypesselected[key].columns[item].showFor ? this.formTypesselected[key].columns[item].showFor : "";
            this.requestBody.metaJson.details[this.requestBody.metaJson.details.length - 1]._fl_elem_data = this.formTypesselected[key].columns[item].elmtData ? this.formTypesselected[key].columns[item].elmtData : "";
            this.requestBody.metaJson.details[this.requestBody.metaJson.details.length - 1]._fl_show_order = this.formTypesselected[key].columns[item].order ? this.formTypesselected[key].columns[item].order : "";
            this.requestBody.metaJson.details[this.requestBody.metaJson.details.length - 1]._fl_elem_ref = this.formTypesselected[key].columns[item].lookup ? this.formTypesselected[key].columns[item].lookup : "";
          }
        }
      }

    }
    this.generalService.postMetaData(apiUrl, this.requestBody).subscribe
      (repsonse => {
        this.loader.hide();
        this.router.navigate(['/document-manager']);
        //this.objectList = repsonse['metaDataResult'].tableList;
      });
    this.requestBody;
  }
  editDocument() {
    this.loader.show();
    this.router.navigate(['/document-manager/addnew']);
  }

}
