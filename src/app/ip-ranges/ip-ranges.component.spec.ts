import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpRangesComponent } from './ip-ranges.component';

describe('IpRangesComponent', () => {
  let component: IpRangesComponent;
  let fixture: ComponentFixture<IpRangesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpRangesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpRangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
