import { Component, OnInit, OnDestroy } from '@angular/core'
import { CheckboxCommunicationService } from 'src/app/shared/services/checkbox-communication/checkbox-communication.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-custom-row-checkbox',
  templateUrl: './custom-row-checkbox.component.html',
  styleUrls: ['./custom-row-checkbox.component.scss']
})
export class CustomRowCheckboxComponent implements OnInit, OnDestroy {
  selectionSubscription$: Subscription

  public params: any

  public checked = false

  constructor(public cbService: CheckboxCommunicationService) {
    this.selectionSubscription$ = this.cbService.$selectionObservable.subscribe(flag => {
      this.params.node.setSelected(flag)
      this.checked = flag
    })
  }

  agInit(params: any): void {
    this.params = params
    this.checked = this.params.node.isSelected()
  }

  clicked(event) {
    const checked = event.target.checked
    this.checked = checked
    this.params.node.setSelected(checked)
    if (!checked) {
      this.cbService.$changeSelectAllCheckBox.next(checked)
    } else {
      if (
        this.params.api.getSelectedNodes().length ===
        this.params.api.getDisplayedRowCount()
      ) {
        this.cbService.$changeSelectAllCheckBox.next(true)
      }
    }
  }

  public setParams(params: any) {
    this.params = params
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.selectionSubscription$.unsubscribe()
  }
}
