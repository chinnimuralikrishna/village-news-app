import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyNews } from './my-news';

describe('MyNews', () => {
  let component: MyNews;
  let fixture: ComponentFixture<MyNews>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyNews],
    }).compileComponents();

    fixture = TestBed.createComponent(MyNews);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
