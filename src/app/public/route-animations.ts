import {
  trigger,
  transition,
  style,
  query,
  group,
  animateChild,
  animate,
  keyframes,
  state,
} from '@angular/animations';

export const fader = trigger('routeAnimations', [
  transition('* <=> *', [
    // Set a default  style for enter and leave
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
          opacity: 0,
          transform: 'scale(0) translateY(100%)',
        }),
      ],
      { optional: true }
    ),
    // Animate the new page in
    query(
      ':enter',
      [
        animate(
          '600ms ease',
          style({ opacity: 1, transform: 'scale(1) translateY(0)' })
        ),
      ],
      { optional: true }
    ),
  ]),
]);

export const slider = trigger('routeAnimations', [
  // Cuando entra la página
  transition('* => isRight', slideTo('right')),
  transition('* => isLeft', slideTo('left')),
  transition('* => isTop', slideTo('top')),
  transition('* => isBottom', slideTo('bottom')),
]);

function slideTo(direction: string) {
  const optional = { optional: true };
  return [
    query(
      ':enter, :leave',
      [
        style({
          position: 'fixed',
          top: 0,
          [direction]: 0,
          width: '100%',
        }),
      ],
      optional
    ),
    query(':enter', [style({ [direction]: '-100%' })]),
    query(':enter', [
      animate('400ms ease-in-out', style({ [direction]: '0%' })),
    ]),
  ];
}
