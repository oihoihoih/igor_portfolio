import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTrailerComponent } from './project-trailer.component';

describe('ProjectTrailerComponent', () => {
  let component: ProjectTrailerComponent;
  let fixture: ComponentFixture<ProjectTrailerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectTrailerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectTrailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
