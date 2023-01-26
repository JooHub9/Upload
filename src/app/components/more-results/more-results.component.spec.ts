import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreResultsComponent } from './more-results.component';

describe('MoreResultsComponent', () => {
  let component: MoreResultsComponent;
  let fixture: ComponentFixture<MoreResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
