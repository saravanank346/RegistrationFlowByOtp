import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPassVerifyComponent } from './forgot-pass-verify.component';

describe('ForgotPassVerifyComponent', () => {
  let component: ForgotPassVerifyComponent;
  let fixture: ComponentFixture<ForgotPassVerifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPassVerifyComponent]
    });
    fixture = TestBed.createComponent(ForgotPassVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
