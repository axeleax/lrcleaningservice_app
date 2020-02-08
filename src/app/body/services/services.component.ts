import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Service } from './services';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.sass']
})
export class ServicesComponent implements OnInit {

  @Input() serviceList: Service[];

  scrWidth: number;

  constructor() {
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize( event?) {
        this.scrWidth = window.innerWidth;
  }

  getOrientation(service: Service) {
    return  (service.orientation === 'LEFT' && this.scrWidth < 641) ? 'RIGHT' : service.orientation;
  }

  ngOnInit() {
    this.scrWidth = window.innerWidth;
  }

}
