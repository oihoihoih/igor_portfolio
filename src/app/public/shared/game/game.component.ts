import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-game',
  standalone: false,

  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent implements OnInit {
  @ViewChild('igor', { static: true }) igorRef!: ElementRef;
  @ViewChild('tripode1', { static: true }) tripode1Ref!: ElementRef;

  private isAliveInterval: any;

  constructor() {}

  ngOnInit(): void {
    this.isAliveInterval = setInterval(() => this.checkCollision(), 10);
    document.addEventListener('keydown', this.keydownHandler);
  }

  ngOnDestroy(): void {
    clearInterval(this.isAliveInterval);
    document.removeEventListener('keydown', this.keydownHandler);
  }
  private checkCollision(): void {
    const igor = this.igorRef.nativeElement;
    const tripode1 = this.tripode1Ref.nativeElement;

    const igorBottom = window.getComputedStyle(igor).getPropertyValue('bottom');

    const tripode1Left = window
      .getComputedStyle(tripode1)
      .getPropertyValue('left');

    if (
      parseInt(tripode1Left) < 110 &&
      parseInt(tripode1Left) > 60 &&
      parseInt(igorBottom) <= 46 // Ajusta según salto
    ) {
      alert('Game Over');
    }
  }

  private keydownHandler = (event: KeyboardEvent) => {
    if (event.code === 'Space') {
      this.jump();
    }
  };

  jump() {
    console.log('jump');
    const igor = this.igorRef.nativeElement;
    igor.classList.remove('jump');
    void igor.offsetWidth;
    igor.classList.add('jump');
    setTimeout(() => {
      igor.classList.remove('jump');
    }, 500);
  }
}
