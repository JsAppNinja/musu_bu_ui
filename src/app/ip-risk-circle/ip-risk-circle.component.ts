import { Component, OnInit, Input, Output } from '@angular/core';

export interface IpRiskCircleProperties {
  subtitle?: string;
  riskLevel?: string;
  title?: Array<string>;
  backgroundColor?: string;
  outerStrokeColor?: string;
  radius?: string;
  count?: number;
}

@Component({
  selector: 'app-ip-risk-circle',
  templateUrl: './ip-risk-circle.component.html',
  styleUrls: ['./ip-risk-circle.component.css']
})
export class IpRiskCircleComponent implements OnInit {
  @Input() subtitle: string;
  @Input() riskLevel: string;
  @Input() title: Array<string>;
  @Input() backgroundColor: string;
  @Input() outerStrokeColor: string;
  @Input() radius: string;

  constructor() { }

  ngOnInit() {

  }

}
