import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-overlay',
  standalone: false,

  templateUrl: './game-overlay.component.html',
  styleUrl: './game-overlay.component.css',
})
export class GameOverlayComponent {
  @Input() gameOver: boolean = false;
  @Input() gameStopped!: boolean;
  @Input() gameStarting!: boolean;
  @Output() startGame = new EventEmitter<void>();

  onStart(): void {
    this.startGame.emit();
  }
}
