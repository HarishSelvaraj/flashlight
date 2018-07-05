import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MasterModule } from './master/master.module';
import { ReportsComponent } from './reports/reports.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
// import {BootstrapGrowlModule, BootstrapGrowlComponent, BootstrapGrowlService} from "ng2-bootstrap-growl";

@NgModule({
  declarations: [
    AppComponent,
    ReportsComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    MasterModule,
    NgxSpinnerModule,
    ToastModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
