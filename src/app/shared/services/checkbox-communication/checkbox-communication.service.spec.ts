import { TestBed, inject } from '@angular/core/testing'

import { CheckboxCommunicationService } from './checkbox-communication.service'

describe('CheckboxCommunicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: CheckboxCommunicationService = TestBed.get(
      CheckboxCommunicationService
    )
    expect(service).toBeTruthy()
  })

  it('should change value: boolean', inject(
    [CheckboxCommunicationService],
    (comcbService: CheckboxCommunicationService) => {
      comcbService.$selectionObservable.next(true)
      expect(comcbService.$selectionObservable).toBeTruthy()
    }
  ))
})
