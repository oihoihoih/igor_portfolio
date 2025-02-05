import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slider } from '../../route-animations';

@Component({
    selector: 'app-public-layout',
    templateUrl: './public-layout.component.html',
    styleUrl: './public-layout.component.css',
    animations: [slider],
    standalone: false
})
export class PublicLayoutComponent {
  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    // Forzar la detección de cambios después de la inicialización de la vista
    this.cdr.detectChanges();
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
