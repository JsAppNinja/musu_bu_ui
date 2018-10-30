import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpTagsComponent } from './ip-tags.component';

describe('IpTagsComponent', () => {
  let component: IpTagsComponent;
  let fixture: ComponentFixture<IpTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
