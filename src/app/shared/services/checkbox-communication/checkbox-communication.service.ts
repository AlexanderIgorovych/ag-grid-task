import { Injectable } from '@angular/core'
import { Subject, BehaviorSubject } from 'rxjs'
import { GridOptions } from '@ag-grid-community/all-modules'

@Injectable({
  providedIn: 'root'
})
export class CheckboxCommunicationService {
  public $selectionObservable = new Subject<boolean>()
  public $changeSelectAllCheckBox = new Subject<boolean>()
  public $selectedRows = new Subject<number>()
  public $totalRows = new BehaviorSubject<number>(0)

  private gridOptions: GridOptions
  constructor() {}

  setGridOptions(gridOptions: GridOptions) {
    this.gridOptions = gridOptions
  }

  getGridOptions(): GridOptions {
    return this.gridOptions
  }

  notifyGridToChangeRowSelection(flag: boolean) {
    this.$selectionObservable.next(flag)
  }
}
