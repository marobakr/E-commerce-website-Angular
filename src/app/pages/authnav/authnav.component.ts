import { Component } from '@angular/core';

@Component({
  selector: 'app-authnav',
  templateUrl: './authnav.component.html',
  styleUrls: ['./authnav.component.css'],
})
export class AuthnavComponent {
  allIcons: string[] = [
    'fa-brands fa-facebook',
    'fa-brands fa-instagram',
    'fa-brands fa-twitter',
    'fa-brands fa-linkedin',
    'fa-brands fa-tiktok',
    'fa-brands fa-youtube',
  ];
}
