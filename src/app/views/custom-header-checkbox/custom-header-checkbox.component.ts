import { Component, OnInit, OnDestroy } from '@angular/core'
import { GridOptions } from '@ag-grid-community/all-modules'
import { CheckboxCommunicationService } from 'src/app/shared/services/checkbox-communication/checkbox-communication.service'
import { Subject, Subscription } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-custom-header-checkbox',
  templateUrl: './custom-header-checkbox.component.html',
  styleUrls: ['./custom-header-checkbox.component.scss']
})
export class CustomHeaderCheckboxComponent implements OnInit, OnDestroy {
  changeSelectAllCheckBoxSubscription$: Subscription

  public params: any
  public gridOptions: GridOptions
  public deselectAll = false
  public checked = false

  constructor(public cbService: CheckboxCommunicationService) {
    this.changeSelectAllCheckBoxSubscription$ = this.cbService.$changeSelectAllCheckBox
      .subscribe(flag => {
        this.checked = flag
      })
  }
  ngOnInit() {}

  agInit(params): void {
    this.gridOptions = this.cbService.getGridOptions()
    this.params = params
    this.checked =
      this.gridOptions.api.getSelectedRows().length ===
      this.gridOptions.api.getDisplayedRowCount()
  }

  onMainCheckBoxClick(event) {
    if (this.checked) {
      this.gridOptions.api.selectAll()
    } else {
      this.gridOptions.api.deselectAll()
    }
    this.cbService.$selectionObservable.next(this.deselectAll)
  }

  checkboxClick(event) {
    this.deselectAll = event.target.checked
    this.checked = !this.checked
  }

  public getParams() {
    return this.params
  }

  // for test purpose
  public setParams(params: any) {
    this.params = params
  }

  ngOnDestroy() {
    this.changeSelectAllCheckBoxSubscription$.unsubscribe();
  }
}
