import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSingleStakeholderComponent } from './edit-single-stakeholder.component';

describe('EditSingleStakeholderComponent', () => {
  let component: EditSingleStakeholderComponent;
  let fixture: ComponentFixture<EditSingleStakeholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSingleStakeholderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSingleStakeholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
