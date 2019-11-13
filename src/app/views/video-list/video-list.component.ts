import { Component, OnInit, OnDestroy } from '@angular/core'
// Ag Grid
import {
  GridOptions,
  Module,
  ClientSideRowModelModule
} from '@ag-grid-community/all-modules'
// RxJS
import { Subject, Subscription } from 'rxjs'
// Models
import { Item } from 'src/app/shared/models/item.model'
// Services
import { FetchService } from 'src/app/shared/services/fetch/fetch.service'
import { CheckboxCommunicationService } from 'src/app/shared/services/checkbox-communication/checkbox-communication.service'
// Components
import { CustomRowCheckboxComponent } from '../custom-row-checkbox/custom-row-checkbox.component'
import { CustomHeaderGroupComponent } from '../custom-header-group/custom-header-group.component'
import { CustomHeaderCheckboxComponent } from '../custom-header-checkbox/custom-header-checkbox.component'

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit, OnDestroy {
  public gridOptions: GridOptions
  public latestSelectedNode = new Subject<any>()
  public getContextMenuItems: any
  public rowData: any
  public rowHeight = 90
  public totalCountOfRecords = 0
  public rowSelection = 'multiple'
  public colorToggle = 'primary'
  public checkedToogle = false
  public selectedRecordsCount
  public frameworkComponents
  public popupParent
  modules: Module[] = [ClientSideRowModelModule]

  rowDataSubscription$: Subscription

  constructor(
    public cbService: CheckboxCommunicationService,
    public dService: FetchService
  ) {
    this.rowData = this.dService.getAPIData()
    this.rowDataSubscription$ = this.rowData.subscribe((list: Array<any>) => {
      this.cbService.$totalRows.next(list.length)
    })
    this.frameworkComponents = {
      customHeaderGroupComponent: CustomHeaderGroupComponent,
      agColumnHeader: CustomHeaderCheckboxComponent
    }
    this.popupParent = document.querySelector('body')

    this.getContextMenuItems = params => {
      const result = []
      const link = this.getVideoTitleLink(params.node.data, 'Open in new tab')
      if (params.column.userProvidedColDef.headerName === 'Video Title') {
        result.push({
          // tslint:disable-next-line: max-line-length
          name: link,
          cssClasses: ['redFont', 'bold'],
          icon: '<i class="fas fa-external-link-alt"></i>'
        })
      }
      return result
    }
  }

  ngOnInit() {
    this.gridOptions = {
      columnDefs: this.getColumnsDef(),
      defaultColDef: this.getDefaultColDef(),
      rowSelection: this.rowSelection
    } as GridOptions
    this.cbService.setGridOptions(this.gridOptions)
  }

  getColumnsDef() {
    return [
      {
        headerName: '',
        headerGroupComponent: 'customHeaderGroupComponent',
        children: [
          {
            headerName: '',
            headerGroupComponent: 'Checkbox toogle',
            field: 'checkbox',
            width: 50,
            headerComponentParams: { menuIcon: 'fa-external-link-alt' },
            cellRendererFramework: CustomRowCheckboxComponent as new () => CustomRowCheckboxComponent,
            columnGroupShow: 'open'
          },
          {
            headerName: '',
            field: 'thumbnails',
            width: 100,
            cellRenderer: data => this.getCellRendererThumbnails(data.data)
          },
          {
            headerName: 'Published on',
            valueGetter: 'data.snippet.publishedAt',
            width: 200,
            sortable: false
          },
          {
            headerName: 'Video Title',
            valueGetter: 'data.snippet.title',
            width: 400,
            cellRenderer: data =>
              this.getVideoTitleLink(data.data, data.data.snippet.title)
          },
          {
            headerName: 'Description',
            valueGetter: 'data.snippet.description',
            width: 1000
          }
        ]
      }
    ]
  }

  getCellRendererThumbnails(data: Item) {
    return `<img
    style="width: ${data.snippet.thumbnails.default.width * 2};
    height: ${data.snippet.thumbnails.default.height}"
    src="${data.snippet.thumbnails.default.url}">`
  }

  getVideoTitleLink(data: Item, title) {
    return `<a href="https://www.youtube.com/watch?v=${data.id.videoId}" target="_blank">${title}</a>`
  }

  getDefaultColDef() {
    return {
      width: 100,
      headerComponentParams: { menuIcon: 'fa-bars' },
      sortable: true,
      resizable: true,
      filter: true
    }
  }

  onSelectionChanged(event) {
    const rowCount = event.api.getSelectedNodes().length
    this.cbService.$selectedRows.next(rowCount)
  }

  onRowClicked(event: any) {
    this.latestSelectedNode.next(event.node)
  }

  toggle(event) {
    if (event.checked) {
      this.gridOptions.columnApi.setColumnVisible('checkbox', true)
    } else {
      this.gridOptions.columnApi.setColumnVisible('checkbox', false)
    }
  }

  onGridReady() {
    this.gridOptions.onSelectionChanged = () => {
      this.selectedRecordsCount = this.gridOptions.api.getSelectedRows().length
    }
  }

  ngOnDestroy() {
    this.rowDataSubscription$.unsubscribe()
  }
}
