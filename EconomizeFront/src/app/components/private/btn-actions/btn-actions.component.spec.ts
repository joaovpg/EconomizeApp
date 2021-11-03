import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnActionsComponent } from './btn-actions.component';

describe('BtnActionsComponent', () => {
  let component: BtnActionsComponent;
  let fixture: ComponentFixture<BtnActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
