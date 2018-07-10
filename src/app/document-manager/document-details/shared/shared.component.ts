import { Component, OnInit, Input } from '@angular/core';
import { DocumentManagerService } from '../../services/document-manager.service';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements OnInit {

  formTypesSelected: any;
  @Input() columns;
  @Input() lookupsData;
  checked = true;
  textDataTypes = ['char', 'varchar', 'text', 'nchar', 'nvarchar',
    'ntext', 'binary', 'varbinary', 'image'];

  numberDataTypes = ['bit', 'tinyint', 'smallint', 'int', 'bigint', 'decimal', 'numeric',
    'smallmoney', 'money', 'float', 'real'];

  dateTimeDataTypes = ['datetime', 'datetime2', 'smalldatetime', 'datetimeoffset'];
  dateDataTypes = ['date'];
  timeDataTypes = ['time', 'timestamp'];

  constructor(private documentManagerService: DocumentManagerService) { }
  existingColumns = [];
  ngOnInit() {
    console.log('i am in shared componenet');
   
    //for (let key in this.columns) {
    //  debugger;
    //  this.existingColumns.push(JSON.parse(JSON.stringify(this.documentManagerService.selectedData.detailsData)));
    //  this.existingColumns[this.existingColumns.length - 1].checked = true;
    //  this.existingColumns[this.existingColumns.length - 1]._fl_elem_len = this.columns[key].CHARACTER_MAXIMUM_LENGTH;
    //  this.existingColumns[this.existingColumns.length - 1]._fl_data_size = "100";
    //  if (this.textDataTypes.includes(this.columns[key].DATA_TYPE)) {
    //    this.existingColumns[this.existingColumns.length - 1]._fl_elem_type = 'TEXT';
    //  } else if (this.numberDataTypes.includes(this.columns[key].DATA_TYPE)) {
    //    this.existingColumns[this.existingColumns.length - 1]._fl_elem_type = 'NUMBER';
    //  } else if (this.dateDataTypes.includes(this.columns[key].DATA_TYPE)) {
    //    this.existingColumns[this.existingColumns.length - 1]._fl_elem_type = 'DATE';
    //  } else if (this.dateTimeDataTypes.includes(this.columns[key].DATA_TYPE)) {
    //    this.existingColumns[this.existingColumns.length - 1]._fl_elem_type = 'DATETIME';
    //  } else if (this.timeDataTypes.includes(this.columns[key].DATA_TYPE)) {
    //    this.existingColumns[this.existingColumns.length - 1]._fl_elem_type = 'TIME';
    //  }
    //  if (this.numberDataTypes.includes(this.columns[key].DATA_TYPE)) {
    //    this.existingColumns[this.existingColumns.length - 1]._fl_elem_data = 'NUMBER';
    //  } else {
    //    this.existingColumns[this.existingColumns.length - 1]._fl_elem_data = 'TEXT';
    //  }
    //  if ((this.existingColumns[this.existingColumns.length - 1]._fl_elem_type == 'DATE' || this.existingColumns[this.existingColumns.length - 1]._fl_elem_type == 'DATETIME') && (this.existingColumns[this.existingColumns.length - 1]._fl_elem_len == "" || !this.existingColumns[this.existingColumns.length - 1]._fl_elem_len)) {
    //    this.existingColumns[this.existingColumns.length - 1]._fl_elem_len = 20;
    //  }  
    //  this.existingColumns[this.existingColumns.length - 1]._fl_elem_label = this.columns[key].COLUMN_NAME.replace(/_/g, " ");
    //  this.existingColumns[this.existingColumns.length - 1]._fl_elem_label = this.existingColumns[this.existingColumns.length - 1]._fl_elem_label.replace(" ", "");    
    //  if (this.columns[key].CONSTRAINT_NAME != null) {
    //    this.existingColumns[this.existingColumns.length - 1]._fl_elem_view = 'A';
    //  } else if (this.columns[key].IS_NULLABLE == "YES") {
    //    this.existingColumns[this.existingColumns.length - 1]._fl_elem_view = 'O';
    //  } else if (this.columns[key].IS_NULLABLE == "NO") {
    //    this.existingColumns[this.existingColumns.length - 1]._fl_elem_view = 'R';
    //  } else {
    //    this.existingColumns[this.existingColumns.length - 1]._fl_elem_view = 'O';
    //  }
    //}
    //this.formTypesSelected = this.documentManagerService.getDocumentFormTypes();
    //for (let key in this.formTypesSelected) {
    //  this.formTypesSelected[key].existingColumns = JSON.parse(JSON.stringify(this.existingColumns));// Object['assign']([], this.columns);
    //}
    //debugger;
    //this.documentManagerService.selectedData;
    // this.dataSource.renderedData.forEach(data => this.selection.select(data.id));
    this.columns.forEach((col, index) => {
     
      col.checked = true;
      col.order = index + 1;
      col.elmtLength = col.CHARACTER_MAXIMUM_LENGTH ? col.CHARACTER_MAXIMUM_LENGTH : "";
      col.elmtSize = "100";
      if (this.textDataTypes.includes(col.DATA_TYPE)) {
        col.etype = 'TEXT';
      } else if (this.numberDataTypes.includes(col.DATA_TYPE)) {
        col.etype = 'NUMBER';
      } else if (this.dateDataTypes.includes(col.DATA_TYPE)) {
        col.etype = 'DATE';
      } else if (this.dateTimeDataTypes.includes(col.DATA_TYPE)) {
        col.etype = 'DATETIME';
      } else if (this.timeDataTypes.includes(col.DATA_TYPE)) {
        col.etype = 'TIME';
      }
      if (this.numberDataTypes.includes(col.DATA_TYPE)) {
        col.elmtData = 'NUMBER';
      } else {
        col.elmtData = 'TEXT';
      }
      if ((col.etype == 'DATE' || col.etype == 'DATETIME') && (col.elmtLength == "" || !col.elmtLength)) {
        col.elmtLength = 20;
      }


      // replace underscore and display it in label COLUMN_NAME
      col.label = col.COLUMN_NAME.replace(/_/g, " ");
      col.label = col.label.replace(" ", "");
      // load body table with default view type as Optional
      if (col.CONSTRAINT_NAME != null) {
        col.vtype = 'A';
      } else if (col.IS_NULLABLE == "YES") {
        col.vtype = 'O';
      } else if (col.IS_NULLABLE == "NO") {
        col.vtype = 'R';
      } else {
        col.vtype = 'O';
      }

      //binding elmt lentgh.. etc

    });

    // .replace(/ /g,'')

    this.formTypesSelected = this.documentManagerService.getDocumentFormTypes();
    for (let key in this.formTypesSelected) {
      this.formTypesSelected[key].columns = JSON.parse(JSON.stringify(this.columns));// Object['assign']([], this.columns);
    }
    //this
  }

  saveform() {
    this.columns;
  }

}
