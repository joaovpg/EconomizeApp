import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarIntComponent } from './navbar-int.component';

describe('NavbarIntComponent', () => {
  let component: NavbarIntComponent;
  let fixture: ComponentFixture<NavbarIntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarIntComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarIntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
