import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThematicArticleComponent } from './thematic-article.component';

describe('ThematicArticleComponent', () => {
  let component: ThematicArticleComponent;
  let fixture: ComponentFixture<ThematicArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThematicArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThematicArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
