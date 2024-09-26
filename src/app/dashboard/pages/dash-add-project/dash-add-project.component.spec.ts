import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashAddProjectComponent } from './dash-add-project.component';

describe('DashAddProjectComponent', () => {
  let component: DashAddProjectComponent;
  let fixture: ComponentFixture<DashAddProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashAddProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashAddProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
