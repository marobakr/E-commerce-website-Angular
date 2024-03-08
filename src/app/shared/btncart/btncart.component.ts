import { Component, Input } from '@angular/core';
import { toggleFade } from '../animations/toggle-fade';

@Component({
  selector: 'app-btncart',
  templateUrl: './btncart.component.html',
  styleUrls: ['./btncart.component.css'],
  animations: [toggleFade],
})
export class BtncartComponent {
  @Input() isLoding: boolean = false;
  @Input() text: string = '';
  @Input() fullWidth: boolean = false;
  @Input() outLine: boolean = false;
  @Input() bgMain: boolean = false;
  @Input() formValid: boolean = false;
  @Input() even: boolean = false;
  @Input() odd: boolean = false;
  @Input() bgdark: boolean = false;
  @Input() disabled: boolean = false;
  @Input() loderBgMain: boolean = false;
}
