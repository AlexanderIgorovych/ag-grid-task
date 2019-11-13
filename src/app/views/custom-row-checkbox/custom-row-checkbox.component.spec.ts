import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { CustomRowCheckboxComponent } from './custom-row-checkbox.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

describe('CustomRowCheckboxComponent', () => {
  let component: CustomRowCheckboxComponent
  let fixture: ComponentFixture<CustomRowCheckboxComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomRowCheckboxComponent],
      imports: [FormsModule, ReactiveFormsModule]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomRowCheckboxComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
