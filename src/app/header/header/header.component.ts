import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  scrWidth: number;

  constructor() {
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
        this.scrWidth = window.innerWidth;
  }

  ngOnInit() {
  }

}
