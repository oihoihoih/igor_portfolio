import {
  trigger,
  state,
  style,
  transition,
  animate,
  group,
} from '@angular/animations';

export const SlideInOutAnimation = [
  trigger('slideInOut', [
    state(
      'in',
      style({
        height: '*', // Cambiamos a 'height' en lugar de 'max-height'
        opacity: '1',
        visibility: 'visible',
        overflow: 'visible',
      })
    ),
    state(
      'out',
      style({
        height: '0px', // Usamos 'height' para mayor fluidez
        opacity: '0',
        visibility: 'hidden',
        overflow: 'hidden',
      })
    ),
    transition('in => out', [
      group([
        animate(
          '300ms ease-in-out',
          style({
            opacity: '0',
            height: '0px', // Anima 'height' en lugar de 'max-height'
            visibility: 'hidden',
          })
        ),
      ]),
    ]),
    transition('out => in', [
      group([
        animate(
          '400ms ease-in-out',
          style({
            visibility: 'visible',
            height: '*', // Cambiamos a '*' para hacer la animación más fluida
            opacity: '1',
          })
        ),
      ]),
    ]),
  ]),
];
