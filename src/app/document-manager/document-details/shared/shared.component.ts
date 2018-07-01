import { Component, OnInit, Input } from '@angular/core';
import { DocumentManagerService } from '../../services/document-manager.service';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements OnInit {

  formTypesSelected : any;
  @Input() columns;
  @Input() lookupsData;
  constructor(private documentManagerService : DocumentManagerService) { }

  ngOnInit() {
    console.log(this.lookupsData);
    debugger;
    this.formTypesSelected = this.documentManagerService.getDocumentFormTypes();
    for (let key in this.formTypesSelected) {
      this.formTypesSelected[key].columns = JSON.parse(JSON.stringify(this.columns));// Object['assign']([], this.columns);
    }
    console.log(this.formTypesSelected);
    //this
  }

  saveform() {
    debugger;
    this.columns;
  }

}
