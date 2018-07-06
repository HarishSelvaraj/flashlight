import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { ResponsiveTableHelpersBody } from '../../../helpers.data';
import { Router } from '@angular/router';
import { DocumentManagerService } from '../../../services/document-manager.service';
import { GeneralServiceService } from '../../../../service/general-service.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  panelOpenState = false;
  displayedColumns = ['userId', 'userName', 'progress', 'color'];
  rows: Array<any> = [];
  showResponsiveTableCode;
  newcontents; show;
  existingColumns: any;
  requestExisting = {
    "dbModel": "sqlModel",
    "database": "mssql",
    "doc_name": "",
    "doc_type": ""
  }
  details: any = [];
  @ViewChild(MatPaginator) paginator1: MatPaginator;
  pageLength = 0;
  pageSize = 3;
  helpers = ResponsiveTableHelpersBody;
  @Input() columns;
  @Input() lookupsData;
  @Input() status;
  @Input() actionStatus;
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() view = new EventEmitter();
  @Output() page = new EventEmitter();
  @Output() sort = new EventEmitter();
  @Output() dup = new EventEmitter();


  lookupControl = new FormControl();
  lookupOptions: string[] = ['Lookup 1', 'Lookup 2', 'Test lookup', 'Lookup'];
  filteredOptions: Observable<string[]>;

  elementType = ['TEXT', 'SELECT', 'TEXTAREA', 'LABEL', 'DATE', 'DATETIME', 'NUMBER'];
  //elementTypes = [
  //    {
  //        name: 'Element Type 1', data: [{ name: 'Element Type 2', data: '8', newcontent: 'new2' },
  //        { name: 'Element Type 3', data: '3', newcontent: 'new3' },
  //        { name: 'Element Type 4', data: '69', newcontent: 'new4' }]
  //    },
  //    {
  //        name: 'Element Type 2', data: [{ name: 'Element Type 3', data: '9', newcontent: 'new2' },
  //        { name: 'Element Type 3', data: '78', newcontent: 'new3' },
  //        { name: 'Element Type 4', data: '4', newcontent: 'new4' }]
  //    },
  //    {
  //        name: 'Element Type 3', data: [{ name: 'Element Type 8', data: '88', newcontent: 'new2' },
  //        { name: 'Element Type 3', data: '66', newcontent: 'new3' },
  //        { name: 'Element Type 4', data: '4', newcontent: 'new4' }]
  //    },
  //    {
  //        name: 'Element Type 4', data: [{ name: 'Element Type 7', data: '77', newcontent: 'new2' },
  //        { name: 'Element Type 3', data: '3', newcontent: 'new3' },
  //        { name: 'Element Type 4', data: '55', newcontent: 'new4' }]
  //    },
  //];

  viewTypes = [
    { name: 'Auto', value: 'A' },
    { name: 'Required', value: 'R' },
    { name: 'Optional', value: 'O' },
    { name: 'Protected', value: 'P' },
    { name: 'Hidden', value: 'H' }
  ];

  showInValues = [
    { name: 'All', value: 'A' },
    { name: 'Select', value: 'S' },
    { name: 'View', value: 'V' },
    { name: 'Update', value: 'U' }
  ];

  showForValues = [
    { name: 'Admin', value: 'A' },
    { name: 'User', value: 'U' },
    { name: 'Super Admin', value: 'SA' },
    { name: 'Maintenance', value: 'M' }
  ];


  constructor(private router: Router, private detectChange: ChangeDetectorRef, private generalService: GeneralServiceService, private documentManagerService: DocumentManagerService) {

  }

  ngOnInit() {
    this.getRows();
    this.show = false;
    if (this.documentManagerService.selectedData.params == 'edit') {
      this.requestExisting.doc_name = this.documentManagerService.selectedData.selectedMeta._fl_doc_name;
      this.requestExisting.doc_type = this.documentManagerService.selectedData.selectedMeta._fl_doc_type;

      this.columns.forEach(col => {
        col.checked = false;
      });

      this.generalService.getExistingColums('showExistingDocument', this.requestExisting).subscribe
        (repsonse => {
          //debugger;
          this.details.push(repsonse['details'])
          this.documentManagerService.selectedData.detailsData = this.details;
          this.existingColumns = repsonse['showSelectedData'].metaDataResult;
          for (let key in this.existingColumns) {
            for (let item in this.columns) {
              if (this.existingColumns[key]._fl_elem_name == this.columns[item].COLUMN_NAME) {
                // debugger;
                this.columns[item].checked = true;
                this.columns[item].etype = this.existingColumns[key]._fl_elem_type
                this.columns[item].label = this.existingColumns[key]._fl_elem_label
                this.columns[item].vtype = this.existingColumns[key]._fl_elem_view
                this.columns[item].lookup = this.existingColumns[key]._fl_elem_ref
                this.columns[item].defaultValue = this.existingColumns[key]._fl_default_value
                this.columns[item].size = this.existingColumns[key]._fl_data_size
                this.columns[item].length = this.existingColumns[key]._fl_elem_len
                this.columns[item].order = this.existingColumns[key]._fl_show_order
              }
            }
          }
        });
    }

    this.filteredOptions = this.lookupControl.valueChanges
      .pipe(
      startWith(''),
     // map(value => this._filter(value))
      map(val => val.length >= 3 ? this._filter(val): [])
      );
  }

//   this.filteredOptions = this.myControl.valueChanges
//   pipe(
//      startWith(''),
//      map(val => val.length >= 1 ? this.filter(val): [])
// );

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.lookupOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  next(event) {
    this.rows = [];
    for (var i = 1 * event.pageIndex * event.pageSize; i < event.pageSize + event.pageIndex * event.pageSize; i++) {
      this.rows = [...this.rows, this.helpers.rows[i]];
    }
  }
  getRows() {
    for (var i = 0; i < this.pageSize; i++) {
      this.rows = [...this.rows, this.helpers.rows[i]];
    }
    this.pageLength = this.helpers.rows.length;
  }
  sortData(val) {
  }
  stopEvent() {
    event.stopPropagation();
  }
  open(data_bind) {
    const acc = document.getElementsByClassName('accordion');
    let i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener('click', function () {
        this.classList.toggle('active');
        const panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });
    }
  }

  cloneRecord(originalColumn) {
    let rowNumber = originalColumn.ORDINAL_POSITION;
    let clonedColumn =JSON.parse(JSON.stringify(originalColumn));
    clonedColumn.cloneIndication=true;    
    this.columns.splice(rowNumber, 0, clonedColumn);
  }

  removeClonedColumn(clonedColumn, index) {
    this.columns.splice(index,1);
  }
}
