import {
  trigger,
  state,
  style,
  transition,
  animate,
  group,
  query,
  stagger,
  keyframes,
} from '@angular/animations';

export const SlideInOutAnimation = [
  trigger('slideInOut', [
    state(
      'in',
      style({
        height: '*',
        opacity: '1',
        visibility: 'visible',
        overflow: 'visible',
      })
    ),
    state(
      'out',
      style({
        'max-height': '0px',
        opacity: '0',
        visibility: 'hidden',
        overflow: 'hidden',
      })
    ),
    transition('in => out', [
      group([
        animate(
          '200ms ease-in-out',
          style({
            opacity: '0',
            'max-height': '0px',
            visibility: 'hidden',
          })
        ),
      ]),
    ]),
    transition('out => in', [
      animate(
        '300ms ease-in-out',
        style({
          visibility: 'visible',
          'max-height': '500px',
          opacity: '1',
        })
      ),
    ]),
  ]),
];
