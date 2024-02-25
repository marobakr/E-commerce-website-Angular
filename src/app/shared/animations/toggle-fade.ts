import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const streatch = trigger('streatch', [
  state('void', style({ width: '0px' })),
  transition('void => *', animate('1s')),
]);

export const toggleFade = trigger('fade', [
  state('void', style({ opacity: '0' })),
  transition('void => *', animate('1.5s')),
]);

export const slideLeft = trigger('slide', [
  state('void', style({ transform: 'translateX(200px)' })),
  transition('void => *', animate('1000ms')),
]);

export const cartSlideLeft = trigger('slidLeft', [
  transition('* <=> *', [
    style({ opacity: 0, transform: 'translateX(-150px)' }),
    animate('600ms', style({ opacity: 1, transform: 'translateX(0px)' })),
  ]),
]);
export const cartSlideRight = trigger('slidRight', [
  transition('* <=> *', [
    style({ opacity: 0, transform: 'translateX(150px)' }),
    animate('600ms', style({ opacity: 1, transform: 'translateX(0px)' })),
  ]),
]);

export const categoriesSlide = trigger('slidDown', [
  transition('* <=> *', [
    style({ opacity: 0, transform: 'translateY(-200px)' }),
    animate('600ms 1s', style({ opacity: 1, transform: 'translateY(0px)' })),
  ]),
]);
export const feadToggle = trigger('fead', [
  transition('* <=> *', [
    style({ opacity: 0 }),
    animate('400ms 0.3s', style({ opacity: 1 })),
  ]),
]);
export const slidUp = trigger('slide', [
  transition('* <=> *', [
    style({ transform: 'translateY(-100px)' }),
    animate('500ms', style({ opacity: 1, transform: 'translateY(0px)' })),
  ]),
]);
