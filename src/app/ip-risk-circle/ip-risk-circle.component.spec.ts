import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpRiskCircleComponent } from './ip-risk-circle.component';

describe('IpRiskCircleComponent', () => {
  let component: IpRiskCircleComponent;
  let fixture: ComponentFixture<IpRiskCircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpRiskCircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpRiskCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
