import { ViewportScroller } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Ecommerce';
  constructor(private viewportScroller: ViewportScroller) {}
  scrollToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
  isScroll: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    if (scrollY > 150) {
      // Adjust the scroll threshold as needed
      this.isScroll = true;
    } else {
      this.isScroll = false;
    }
  }
}
