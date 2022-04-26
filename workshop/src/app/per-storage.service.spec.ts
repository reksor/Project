import { TestBed } from '@angular/core/testing';

import { PerStorageService } from './per-storage.service';

describe('PerStorageService', () => {
  let service: PerStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
