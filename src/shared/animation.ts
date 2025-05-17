import { trigger, transition, style, animate } from '@angular/animations';

export const slideInOutAnimation = trigger('slideInOut', [
  transition(':enter', [
    style({ transform: 'translateX(100%)', opacity: 0 }),
    animate('0.5s ease-in-out', style({ transform: 'translateX(0%)', opacity: 1 }))
  ]),
  transition(':leave', [
    animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)', opacity: 0 }))
  ])
]);
console.log(slideInOutAnimation);
