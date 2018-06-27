import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MasterModule } from './master/master.module';
import { ReportsComponent } from './reports/reports.component';

@NgModule({
  declarations: [
    AppComponent,
    ReportsComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    MasterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
