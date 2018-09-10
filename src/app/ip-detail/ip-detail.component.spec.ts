import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpDetailComponent } from './ip-detail.component';

describe('IpDetailComponent', () => {
  let component: IpDetailComponent;
  let fixture: ComponentFixture<IpDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
