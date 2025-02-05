import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashEditProjectComponent } from './dash-edit-project.component';

describe('DashEditProjectComponent', () => {
  let component: DashEditProjectComponent;
  let fixture: ComponentFixture<DashEditProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashEditProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashEditProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
