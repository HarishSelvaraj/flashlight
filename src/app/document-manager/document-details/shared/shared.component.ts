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

  dateDataTypes = ['datetime', 'datetime2', 'smalldatetime', 'date',
    'time', 'datetimeoffset', 'timestamp'];

  constructor(private documentManagerService: DocumentManagerService) { }

  ngOnInit() {
    console.log('i am in shared componenet');
    console.log(this.columns);
    // this.dataSource.renderedData.forEach(data => this.selection.select(data.id));
    this.columns.forEach(col => {
      col.checked = true;
      if (this.textDataTypes.includes(col.DATA_TYPE)) {
        col.etype = 'TEXT';
      } else if (this.numberDataTypes.includes(col.DATA_TYPE)) {
        col.etype = 'NUMBER';
      } else if (this.dateDataTypes.includes(col.DATA_TYPE)) {
        col.etype = 'DATE';
      }

      // replace underscore and display it in label COLUMN_NAME
      col.label = col.COLUMN_NAME.replace("_", " ");

      // load body table with default view type as Optional
      if (col.CONSTRAINT_NAME != null) {
        col.vtype = 'A';
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
