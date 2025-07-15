import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreparationResources } from './preparation-resources';

describe('PreparationResources', () => {
  let component: PreparationResources;
  let fixture: ComponentFixture<PreparationResources>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreparationResources]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreparationResources);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
