import {
  async,
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync
} from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { CustomHeaderCheckboxComponent } from './custom-header-checkbox.component'
import { CustomRowCheckboxComponent } from '../custom-row-checkbox/custom-row-checkbox.component'

import { RowNode } from '@ag-grid-community/all-modules'
import { CheckboxCommunicationService } from 'src/app/shared/services/checkbox-communication/checkbox-communication.service'
import { SetSelectedParams } from '@ag-grid-community/core/dist/cjs/entities/rowNode'

class MockRowNode extends RowNode {
  setSeleted(flag) {}
  setSelectedParams(params: SetSelectedParams) {
    return 0
  }
  isSelected() {
    return true
  }
}

describe('CustomHeaderCheckboxComponent', () => {
  let customHeaderComponent: CustomHeaderCheckboxComponent
  let fixtureCustomHeaderComponent: ComponentFixture<CustomHeaderCheckboxComponent>
  let fixtureCheckBoxAllComponent: ComponentFixture<CustomRowCheckboxComponent>
  let checkBoxAllComponent: CustomRowCheckboxComponent
  const mainCheckBoxChecked = true

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomHeaderCheckboxComponent, CustomRowCheckboxComponent],
      imports: [FormsModule],
      providers: [CheckboxCommunicationService]
    }).compileComponents()
  }))

  beforeEach(() => {
    // Configure the component with another set of Providers
    TestBed.overrideComponent(CustomHeaderCheckboxComponent, {
      set: { providers: [{ provide: CheckboxCommunicationService }] }
    })

    TestBed.overrideComponent(CustomRowCheckboxComponent, {
      set: { providers: [{ provide: CheckboxCommunicationService }] }
    })

    const params = { menuIcon: 'fa-external-link-alt', node: new MockRowNode() }

    fixtureCustomHeaderComponent = TestBed.createComponent(
      CustomHeaderCheckboxComponent
    )
    customHeaderComponent = fixtureCustomHeaderComponent.componentInstance
    customHeaderComponent.setParams(params)
    fixtureCustomHeaderComponent.detectChanges()

    fixtureCheckBoxAllComponent = TestBed.createComponent(
      CustomRowCheckboxComponent
    )
    checkBoxAllComponent = fixtureCheckBoxAllComponent.componentInstance
    checkBoxAllComponent.setParams(params)
    fixtureCheckBoxAllComponent.detectChanges()
  })

  it('should create', () => {
    expect(customHeaderComponent).toBeTruthy()
  })

  it('row checkbox should be `checked` when header checkbox was clicked', fakeAsync(() => {
    fixtureCustomHeaderComponent.detectChanges()
    tick()
    const mainCheckBox = fixtureCustomHeaderComponent.debugElement.query(
      By.css('#headerCheckbox')
    ).nativeElement
    mainCheckBox.click()
    tick(100) // wait for the first task to get done
    fixtureCustomHeaderComponent.detectChanges()
    expect(customHeaderComponent.checked).toBe(mainCheckBoxChecked)

    const rowCheckBox = fixtureCheckBoxAllComponent.debugElement.query(
      By.css('.checkbox-custom')
    ).nativeElement

    const mediatorsService = fixtureCustomHeaderComponent.debugElement.injector.get(
      CheckboxCommunicationService
    )
    mediatorsService.notifyGridToChangeRowSelection(mainCheckBoxChecked)
    tick(100) // wait for the first task to get done
    fixtureCustomHeaderComponent.detectChanges()
    expect(checkBoxAllComponent.checked).toBe(mainCheckBoxChecked)
  }))

  it('header checkbox  should be `unchecked` when one of the row checkbox was unchecked', fakeAsync(() => {
    fixtureCustomHeaderComponent.detectChanges()
    tick()
    const mainCheckBox = fixtureCustomHeaderComponent.debugElement.query(
      By.css('#headerCheckbox')
    ).nativeElement
    mainCheckBox.click()
    tick(100) // wait for the first task to get done
    fixtureCustomHeaderComponent.detectChanges()
    expect(customHeaderComponent.checked).toBe(mainCheckBoxChecked)

    const mediatorsService = fixtureCustomHeaderComponent.debugElement.injector.get(
      CheckboxCommunicationService
    )
    mediatorsService.notifyGridToChangeRowSelection(mainCheckBoxChecked)
    tick(100) // wait for the first task to get done
    const rowCheckBox = fixtureCheckBoxAllComponent.debugElement.query(
      By.css('.checkbox-custom')
    ).nativeElement
    // simulate checked after mainCheckBox checked
    rowCheckBox.click()

    // uncheck one row check box, main check box must be automatically unchecked
    rowCheckBox.click()

    fixtureCustomHeaderComponent.detectChanges()
    expect(checkBoxAllComponent.checked).toBe(false)
    expect(customHeaderComponent.checked).toBe(false)
  }))
})
