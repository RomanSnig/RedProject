import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Status1Component } from './components/Statuses/status1/status1.component';
import { Status2Component } from './components/Statuses/status2/status2.component';
import { Status3Component } from './components/Statuses/status3/status3.component';
import { Status4Component } from './components/Statuses/status4/status4.component';
import { Status5Component } from './components/Statuses/status5/status5.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'status1', component: Status1Component},
  {path: 'status2', component: Status2Component},
  {path: 'status3', component: Status3Component},
  {path: 'status4', component: Status4Component},
  {path: 'status5', component: Status5Component}
];

@NgModule({
  declarations: [
    AppComponent,
    Status1Component,
    Status2Component,
    Status3Component,
    Status4Component,
    Status5Component,
    MainComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
