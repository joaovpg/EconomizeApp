import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNotAuthComponent } from './user-not-auth.component';

describe('UserNotAuthComponent', () => {
  let component: UserNotAuthComponent;
  let fixture: ComponentFixture<UserNotAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserNotAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNotAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
