import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ResponsiveTableHelpers } from '../helpers.data';
import { Router } from '@angular/router';
import { GeneralServiceService } from '../../service/general-service.service';

@Component({
  selector: 'app-document-manager',
  templateUrl: './document-manager.component.html',
  styleUrls: ['./document-manager.component.scss']
})
export class DocumentManagerComponent implements OnInit {
  displayedColumns = ['basename', 'basetable', 'documenttype', 'databasename', 'action'];
  rows: Array<any> = [];
  dataSource;
  showResponsiveTableCode;
  @ViewChild(MatPaginator) paginator1: MatPaginator;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageLength = 0;
  pageSize = 3;
  docList;// = ResponsiveTableHelpers;
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
  constructor(private router: Router, public generalService: GeneralServiceService) {
  }

  ngOnInit() {
    this.generalService.getMetaDataList('listDocuments', this.requestData).subscribe
      (repsonse => {
        debugger;
        this.docList = repsonse['metaDataRelatedTables'].metaDataResult;;
        this.getRows();
      });
  }
  next(event) {
    this.rows = [];
    for (var i = 1 * event.pageIndex * event.pageSize; i < event.pageSize + event.pageIndex * event.pageSize; i++) {
      this.rows = [...this.rows, this.docList[i]];
      this.dataSource = new MatTableDataSource(this.docList);
      this.dataSource.paginator = this.paginator;
      console.log(this.rows);
    }
  }
  getRows() {
    for (var i = 0; i < this.pageSize; i++) {
      this.rows = [...this.rows, this.docList[i]];
      this.dataSource = new MatTableDataSource(this.docList);
      this.dataSource.paginator = this.paginator;

    }
    this.pageLength = this.docList.length;
  }
  sortData(val) {
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  addNewDocument() {
    this.router.navigate(['/document-manager/addnew']);
  }
  EditDocument(){
    alert("Edit")
  }
}
