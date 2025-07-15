import { TestBed } from '@angular/core/testing';

import { SkillExtraction } from './skill-extraction';

describe('SkillExtraction', () => {
  let service: SkillExtraction;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillExtraction);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
