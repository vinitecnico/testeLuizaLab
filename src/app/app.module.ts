import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BlockUIModule } from 'ng-block-ui';
import { BlockUIHttpModule } from 'ng-block-ui/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// services
import { ZipcodeService } from './services/zipcode.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    BlockUIModule.forRoot(),
    BlockUIHttpModule.forRoot({
      requestFilters: []
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAdyvRIRT1iMFRzE4v8BzfGXc-Oc9OFTwk'
    })
  ],
  providers: [ZipcodeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
