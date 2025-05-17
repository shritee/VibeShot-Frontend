import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VibeshotComponent } from './vibeshot.component';

describe('VibeshotComponent', () => {
  let component: VibeshotComponent;
  let fixture: ComponentFixture<VibeshotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VibeshotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VibeshotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
