import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompactBoxComponent } from './compact-box.component';

describe('CompactBoxComponent', () => {
  let component: CompactBoxComponent;
  let fixture: ComponentFixture<CompactBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompactBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompactBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
