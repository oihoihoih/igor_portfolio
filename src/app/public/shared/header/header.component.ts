import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    standalone: false
})
export class HeaderComponent {
  @Output() sectionSelected = new EventEmitter<string>();

  onSectionClick(section: string) {
    this.sectionSelected.emit(section);
  }
}
