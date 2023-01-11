import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadlineVideoComponent } from './headline-video.component';

describe('HeadlineVideoComponent', () => {
  let component: HeadlineVideoComponent;
  let fixture: ComponentFixture<HeadlineVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadlineVideoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadlineVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
