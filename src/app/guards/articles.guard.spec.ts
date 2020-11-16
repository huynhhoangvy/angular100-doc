import { TestBed } from '@angular/core/testing';

import { ArticlesGuard } from './articles.guard';

describe('ArticlesGuard', () => {
  let guard: ArticlesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ArticlesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
