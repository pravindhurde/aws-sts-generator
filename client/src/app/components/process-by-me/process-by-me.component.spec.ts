import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessByMeComponent } from './process-by-me.component';

describe('ProcessByMeComponent', () => {
  let component: ProcessByMeComponent;
  let fixture: ComponentFixture<ProcessByMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessByMeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessByMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
