import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubschemaStakeholderComponent } from './edit-subschema-stakeholder.component';

describe('EditSubschemaStakeholderComponent', () => {
  let component: EditSubschemaStakeholderComponent;
  let fixture: ComponentFixture<EditSubschemaStakeholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSubschemaStakeholderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSubschemaStakeholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
