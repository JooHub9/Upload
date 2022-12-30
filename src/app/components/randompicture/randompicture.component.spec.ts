import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandompictureComponent } from './randompicture.component';

describe('RandompictureComponent', () => {
  let component: RandompictureComponent;
  let fixture: ComponentFixture<RandompictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandompictureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandompictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
