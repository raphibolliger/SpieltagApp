import { TestBed } from '@angular/core/testing';

import { ShvApiService } from './shv-api.service';

describe('ShvApiService', () => {
  let service: ShvApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShvApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
