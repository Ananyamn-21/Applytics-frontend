import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JdAnalyzer } from './jd-analyzer';

describe('JdAnalyzer', () => {
  let component: JdAnalyzer;
  let fixture: ComponentFixture<JdAnalyzer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JdAnalyzer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JdAnalyzer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
