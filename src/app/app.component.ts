import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Ecommerce';
  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.scrollToTop();
      }
    });
  }
  scrollToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
