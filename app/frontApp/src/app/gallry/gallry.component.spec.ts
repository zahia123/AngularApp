import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GallryComponent } from './gallry.component';

describe('GallryComponent', () => {
  let component: GallryComponent;
  let fixture: ComponentFixture<GallryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GallryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GallryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
