import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelAplicationDialogComponent } from './cancel-aplication-dialog.component';

describe('CancelAplicationDialogComponent', () => {
  let component: CancelAplicationDialogComponent;
  let fixture: ComponentFixture<CancelAplicationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelAplicationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelAplicationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
