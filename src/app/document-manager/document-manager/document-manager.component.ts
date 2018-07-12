import { Component, OnInit, ViewChild, Input, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ResponsiveTableHelpers } from '../helpers.data';
import { Router } from '@angular/router';
import { GeneralServiceService } from '../../service/general-service.service';
import { DocumentManagerService } from '../services/document-manager.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-document-manager',
  templateUrl: './document-manager.component.html',
  styleUrls: ['./document-manager.component.scss']
})
export class DocumentManagerComponent implements OnInit {
  displayedColumns = ['sno', 'basename', 'basetable', 'documenttype', 'databasename', 'action'];
  rows: Array<any> = [];
  dataSource;
  showResponsiveTableCode;
  requestColumnData = {
    "dbModel": "sqlModel",
    "database": "mssql",
    "dbname": "",
    "tablename": ""
  }
  @ViewChild(MatPaginator) paginator1: MatPaginator;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sorts: MatSort;
  pageLength = 0;
  pageSize = 3;
  docList;// = ResponsiveTableHelpers;
  requestEdit = {
    "dbModel": "sqlModel",
    "database": "mssql",
    "doc_name": "",
    "doc_type": ""
  }
  @Input() status;
  @Input() actionStatus;
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() view = new EventEmitter();
  @Output() page = new EventEmitter();
  @Output() sort = new EventEmitter();
  @Output() dup = new EventEmitter();
  requestData = {
    "dbModel": "sqlModel",
    "database": "mssql"
  }
  constructor(private router: Router, public generalService: GeneralServiceService, private documentManagerService: DocumentManagerService, private loader: NgxSpinnerService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
   
    this.loader.show();
    this.documentManagerService.selectedData = {};
    this.documentManagerService.formTypes = {};
    // this.generalService.getMetaDataList('listDocuments', this.requestData).subscribe
    //   (repsonse => {
    //     this.loader.hide();
    //     this.toastr.success('MetaData Added Successfully');
    //     this.docList = repsonse['metaDataRelatedTables'].metaDataResult;
    //     for (var i = 0; i < this.docList.length; i++) {
    //       this.docList[i].sno = i + 1;
    //     }
    //     this.getRows();
    //   });

    this.generalService.request.reqbody.lookup = "META_MASTER";
    this.generalService.request.reqbody.oper = "LIST";
    this.generalService.getData('search').subscribe
      (response => {
        this.loader.hide();
        let res = this.generalService.getResult(response);
        this.docList = res.results.rows;
        this.getRows();
      });


  }
  next(event) {
    this.rows = [];
    for (var i = 1 * event.pageIndex * event.pageSize; i < event.pageSize + event.pageIndex * event.pageSize; i++) {
      this.rows = [...this.rows, this.docList[i]];
      this.dataSource = new MatTableDataSource(this.docList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sorts;
    }
  }
  getRows() {
    for (var i = 0; i < this.pageSize; i++) {
      this.rows = [...this.rows, this.docList[i]];
      this.dataSource = new MatTableDataSource(this.docList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sorts;

    }
    this.pageLength = this.docList.length;
  }
  sortData(val) {
  }

  DeleteDocument(data) {
    this.loader.show();
    this.requestData['metaJson'] = {
      "menu": [], "master": [],
      "details": [], "doc_name": data._fl_doc_name
    };
    this.generalService.deleteMetadatalist('updateExistingDocument', this.requestData).subscribe
      (repsonse => {
        this.loader.hide();
        this.toastr.success('Succesfully Deleted');
        this.ngOnInit();
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  addNewDocument() {
    this.loader.show();
    this.router.navigate(['/document-manager/addnew']);
  }
  EditDocument(metaData) {
    this.loader.show();
    delete metaData['sno'];
    this.documentManagerService.selectedData.selectedMeta = metaData;
    this.requestEdit.doc_name = metaData._fl_doc_name;
    this.requestEdit.doc_type = metaData._fl_doc_type;
    this.documentManagerService.selectedData.db = {
      "dbModel": "sqlModel",
      "database": "mssql",
      "dbname": "Incite"
    }
    this.documentManagerService.selectedData.table = {
      "dbModel": "sqlModel",
      "database": "mssql",
      "dbname": "Incite",
      "tablename": metaData._fl_base_table
    }
    this.documentManagerService.selectedData.baseName = metaData._fl_base_name;
    this.documentManagerService.selectedData.masterData = [metaData];
    this.requestColumnData.dbname = "Incite"
    this.requestColumnData.tablename = metaData._fl_base_table;
    this.generalService.getColumnlist('listAllColumnsInATable', this.requestColumnData).subscribe
      (repsonse => {
        this.documentManagerService.selectedData.columns = repsonse['metaDataResult'].columns;
        this.generalService.getMetaDataList('showExistingDocument', this.requestEdit).subscribe
          (repsonse => {
            this.loader.hide();
            this.router.navigate(['/document-manager/details', 'edit']);
          });

      });


  }
}
