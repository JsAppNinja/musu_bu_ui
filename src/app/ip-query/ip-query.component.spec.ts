import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpQueryComponent } from './ip-query.component';

describe('IpQueryComponent', () => {
  let component: IpQueryComponent;
  let fixture: ComponentFixture<IpQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
