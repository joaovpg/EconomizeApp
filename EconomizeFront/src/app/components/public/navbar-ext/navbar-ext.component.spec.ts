import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarExtComponent } from './navbar-ext.component';

describe('NavbarExtComponent', () => {
  let component: NavbarExtComponent;
  let fixture: ComponentFixture<NavbarExtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarExtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarExtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
