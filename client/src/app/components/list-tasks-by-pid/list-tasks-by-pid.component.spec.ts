import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTasksByPidComponent } from './list-tasks-by-pid.component';

describe('ListTasksByPidComponent', () => {
  let component: ListTasksByPidComponent;
  let fixture: ComponentFixture<ListTasksByPidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTasksByPidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTasksByPidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
