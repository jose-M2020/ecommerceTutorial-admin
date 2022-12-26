import { TestBed } from '@angular/core/testing';

import { VariedadService } from './variedad.service';

describe('VariedadService', () => {
  let service: VariedadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VariedadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
