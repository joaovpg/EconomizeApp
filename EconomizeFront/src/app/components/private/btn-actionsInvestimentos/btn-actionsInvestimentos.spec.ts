import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnActionsInvestimentsComponent } from './btn-actionsInvestimentos';

describe('BtnActionsComponent', () => {
  let component: BtnActionsInvestimentsComponent;
  let fixture: ComponentFixture<BtnActionsInvestimentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnActionsInvestimentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnActionsInvestimentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
