import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Service } from './service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.sass']
})
export class ServiceComponent implements OnInit {

  @Input() serviceList: Service[];

  scrWidth: number;
  selectedImage: string;

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
