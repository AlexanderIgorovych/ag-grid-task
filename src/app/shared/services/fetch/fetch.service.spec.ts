import { TestBed, async, inject, fakeAsync } from '@angular/core/testing'

// Service
import { FetchService } from './fetch.service'
// RxJs
import { of } from 'rxjs'
// Model
import { Item } from '../../models/item.model'
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('FetchService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }))

  it('should be created', () => {
    const service: FetchService = TestBed.get(FetchService)
    expect(service).toBeTruthy()
  })

/*   it('retrieves all the Items', async(
    inject([FetchService], (fetchService: FetchService) => {
      fetchService
        .getAPIData()
        .subscribe(result => expect(result.length).toBeGreaterThan(0))
    })
  )) */

  it('should call getAPIData()', fakeAsync(
    inject([FetchService], (fetchService: FetchService) => {
      const fetchSpy = spyOn(fetchService, 'getAPIData').and.returnValue(
        of<Item[]>([])
      )
      // const fetchSpy = spyOn(fetchService, 'getAPIData').and.callThrough();
      fetchService.getAPIData()
      expect(fetchSpy).toHaveBeenCalled()
    })
  ))
})
