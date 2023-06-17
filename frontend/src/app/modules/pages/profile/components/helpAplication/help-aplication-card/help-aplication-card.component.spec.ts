import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpAplicationCardComponent } from './help-aplication-card.component';

describe('HelpAplicationCardComponent', () => {
  let component: HelpAplicationCardComponent;
  let fixture: ComponentFixture<HelpAplicationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpAplicationCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpAplicationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
