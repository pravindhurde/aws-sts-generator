import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessByPidComponent } from './process-by-pid.component';

describe('ProcessByPidComponent', () => {
  let component: ProcessByPidComponent;
  let fixture: ComponentFixture<ProcessByPidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessByPidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessByPidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
