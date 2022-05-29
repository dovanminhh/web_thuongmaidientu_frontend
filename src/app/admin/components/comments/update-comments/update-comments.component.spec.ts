import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCommentsComponent } from './update-comments.component';

describe('UpdateCommentsComponent', () => {
  let component: UpdateCommentsComponent;
  let fixture: ComponentFixture<UpdateCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCommentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
