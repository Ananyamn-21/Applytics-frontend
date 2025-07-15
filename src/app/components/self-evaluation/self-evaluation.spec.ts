import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfEvaluation } from './self-evaluation';

describe('SelfEvaluation', () => {
  let component: SelfEvaluation;
  let fixture: ComponentFixture<SelfEvaluation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelfEvaluation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfEvaluation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
