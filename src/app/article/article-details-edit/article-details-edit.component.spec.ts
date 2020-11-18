import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleDetailsEditComponent } from './article-details-edit.component';

describe('ArticleDetailsEditComponent', () => {
  let component: ArticleDetailsEditComponent;
  let fixture: ComponentFixture<ArticleDetailsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleDetailsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
