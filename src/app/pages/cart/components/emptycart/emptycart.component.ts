import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-emptycart',
  templateUrl: './emptycart.component.html',
  styleUrls: ['./emptycart.component.css'],
})
export class EmptycartComponent {
  @Input() title: string = '';
}
