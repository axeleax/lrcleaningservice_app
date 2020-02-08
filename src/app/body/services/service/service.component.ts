import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.sass']
})
export class ServiceComponent implements OnInit {

  @Input() label: string;
  @Input() title: string;
  @Input() detail: string;
  @Input() image: string;

  constructor() { }

  ngOnInit() {
  }

}
