import { Component, OnInit, OnDestroy } from '@angular/core'
import { CheckboxCommunicationService } from 'src/app/shared/services/checkbox-communication/checkbox-communication.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-custom-header-group',
  templateUrl: './custom-header-group.component.html',
  styleUrls: ['./custom-header-group.component.scss']
})
export class CustomHeaderGroupComponent implements OnInit, OnDestroy {
  selectedRowsSubscription$: Subscription

  public params: any
  public expandState: string
  public selectedRows = 0
  public totalRecords = 0
  public colorToggle = 'primary'
  public $totalRows

  constructor(public cbService: CheckboxCommunicationService) {
    this.selectedRowsSubscription$ = this.cbService.$selectedRows.subscribe(
      selectedRowCount => {
        this.selectedRows = selectedRowCount
      }
    )
    this.$totalRows = this.cbService.$totalRows
  }

  agInit(params): void {
    this.params = params
    this.params.columnGroup
      .getOriginalColumnGroup()
      .addEventListener('expandedChanged', this.syncExpandButtons.bind(this))
    this.syncExpandButtons()
  }

  expandOrCollapse() {
    const currentState = this.params.columnGroup
      .getOriginalColumnGroup()
      .isExpanded()
    this.params.setExpanded(!currentState)
  }

  syncExpandButtons() {
    if (this.params.columnGroup.getOriginalColumnGroup().isExpanded()) {
      this.expandState = 'expanded'
    } else {
      this.expandState = 'collapsed'
    }
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.selectedRowsSubscription$.unsubscribe()
  }
}
