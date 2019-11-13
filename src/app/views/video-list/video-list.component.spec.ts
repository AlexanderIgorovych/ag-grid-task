import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoListComponent } from './video-list.component';

import { CustomHeaderCheckboxComponent } from '../custom-header-checkbox/custom-header-checkbox.component';
import { CustomRowCheckboxComponent } from '../custom-row-checkbox/custom-row-checkbox.component';
import { CustomHeaderGroupComponent } from '../custom-header-group/custom-header-group.component';
import { FormsModule } from '@angular/forms';

import { HttpClientTestingModule } from '@angular/common/http/testing'
import { AgGridModule } from '@ag-grid-community/angular';
import { AngularMaterialModule } from 'src/app/shared/material/material.module';

describe('VideoListComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VideoListComponent,
        CustomHeaderCheckboxComponent,
        CustomRowCheckboxComponent,
        CustomHeaderGroupComponent
      ],
      imports: [
        AgGridModule.withComponents([ CustomHeaderCheckboxComponent, CustomRowCheckboxComponent, CustomHeaderGroupComponent ]),
        FormsModule,
        AngularMaterialModule,
        HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(VideoListComponent)
    const component = fixture.debugElement.componentInstance
    expect(component).toBeTruthy()
  });
});
