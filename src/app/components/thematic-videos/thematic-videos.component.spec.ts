import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThematicVideosComponent } from './thematic-videos.component';

describe('ThematicVideosComponent', () => {
  let component: ThematicVideosComponent;
  let fixture: ComponentFixture<ThematicVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThematicVideosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThematicVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
