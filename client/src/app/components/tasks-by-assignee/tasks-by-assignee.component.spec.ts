import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksByAssigneeComponent } from './tasks-by-assignee.component';

describe('TasksByAssigneeComponent', () => {
  let component: TasksByAssigneeComponent;
  let fixture: ComponentFixture<TasksByAssigneeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksByAssigneeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksByAssigneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
