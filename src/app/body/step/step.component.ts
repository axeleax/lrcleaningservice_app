import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.sass']
})
export class StepComponent implements OnInit {

  @Input() label: string;
  @Input() content: string;
  @Input() image: string;

  constructor() { }

  ngOnInit() {
  }

}
