import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulationCardComponent } from './help-aplication-card.component';

describe('HelpAplicationCardComponent', () => {
  let component: PostulationCardComponent;
  let fixture: ComponentFixture<PostulationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostulationCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostulationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
