import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversListComponentComponent } from './drivers-list-component.component';

describe('DriversListComponentComponent', () => {
  let component: DriversListComponentComponent;
  let fixture: ComponentFixture<DriversListComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriversListComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DriversListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
