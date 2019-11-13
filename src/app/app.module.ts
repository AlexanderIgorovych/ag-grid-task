import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CustomHeaderCheckboxComponent } from './views/custom-header-checkbox/custom-header-checkbox.component'
import { CustomHeaderGroupComponent } from './views/custom-header-group/custom-header-group.component'
import { CustomRowCheckboxComponent } from './views/custom-row-checkbox/custom-row-checkbox.component'
import { VideoListComponent } from './views/video-list/video-list.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { AgGridModule } from '@ag-grid-community/angular'
import { AngularMaterialModule } from './shared/material/material.module'

@NgModule({
  declarations: [
    AppComponent,
    CustomHeaderCheckboxComponent,
    CustomHeaderGroupComponent,
    CustomRowCheckboxComponent,
    VideoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularMaterialModule,
    AgGridModule.withComponents([
      CustomHeaderCheckboxComponent,
      CustomRowCheckboxComponent,
      CustomHeaderGroupComponent
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
