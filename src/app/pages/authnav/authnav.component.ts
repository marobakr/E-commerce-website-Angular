import { Component } from '@angular/core';

@Component({
  selector: 'app-authnav',
  templateUrl: './authnav.component.html',
  styleUrls: ['./authnav.component.css'],
})
export class AuthnavComponent {
  allIcons: string[] = [
    'fa-brands fa-facebook fa-xl',
    'fa-brands fa-instagram fa-xl',
    'fa-brands fa-twitter fa-xl',
    'fa-brands fa-linkedin fa-xl',
    'fa-brands fa-tiktok fa-xl',
    'fa-brands fa-youtube fa-xl',
  ];
}
