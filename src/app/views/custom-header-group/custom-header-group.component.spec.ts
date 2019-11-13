import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { CustomHeaderGroupComponent } from './custom-header-group.component'
import { AngularMaterialModule } from 'src/app/shared/material/material.module'

describe('CustomHeaderGroupComponent', () => {
  let component: CustomHeaderGroupComponent
  let fixture: ComponentFixture<CustomHeaderGroupComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomHeaderGroupComponent],
      imports: [AngularMaterialModule]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomHeaderGroupComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
