import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillTracker } from './skill-tracker';

describe('SkillTracker', () => {
  let component: SkillTracker;
  let fixture: ComponentFixture<SkillTracker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillTracker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillTracker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
