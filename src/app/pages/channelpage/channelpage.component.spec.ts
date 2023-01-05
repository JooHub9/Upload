import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelpageComponent } from './channelpage.component';

describe('ChannelpageComponent', () => {
  let component: ChannelpageComponent;
  let fixture: ComponentFixture<ChannelpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChannelpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChannelpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
