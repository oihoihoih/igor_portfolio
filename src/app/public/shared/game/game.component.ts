import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-game',
  standalone: false,

  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent implements OnInit {
  @ViewChild('igor', { static: true }) igorRef!: ElementRef;
  @ViewChild('tripode1', { static: true }) tripode1Ref!: ElementRef;
  @ViewChild('suelo', { static: true }) sueloRef!: ElementRef;

  private isAliveInterval: any;
  gameOver: boolean = false;
  gameStarting: boolean = true;

  constructor() {}

  ngOnInit(): void {
    this.gameStarting = true;
  }

  ngOnDestroy(): void {
    this.stopGame();
  }

  startGame(): void {
    this.gameStarting = false;
    this.gameOver = false;
    const igor = this.igorRef.nativeElement;
    const tripode1 = this.tripode1Ref.nativeElement;

    // Parar animaciones previas y limpiar clases
    tripode1.classList.remove('pause');
    tripode1.classList.remove('tripode1-animation');
    igor.classList.remove('pause');

    // Reiniciar posición del trípode
    tripode1.style.left = 'calc(100% - 12px)';

    // Forzar el reflow
    void tripode1.offsetWidth;

    // Reiniciar animaciones
    tripode1.classList.add('tripode1-animation');
    igor.classList.add('igor-running');

    // Reinicia el intervalo y el listener
    this.isAliveInterval = setInterval(() => this.checkCollision(), 10);
    document.addEventListener('keydown', this.keydownHandler);
  }

  stopGame() {
    this.gameOver = true;
    clearInterval(this.isAliveInterval);
    document.removeEventListener('keydown', this.keydownHandler);

    this.tripode1Ref.nativeElement.classList.add('pause');
    this.igorRef.nativeElement.classList.add('pause');
  }

  private checkCollision(): void {
    const igor = this.igorRef.nativeElement;
    const tripode1 = this.tripode1Ref.nativeElement;

    const igorBottom = window.getComputedStyle(igor).getPropertyValue('bottom');

    const tripode1Left = window
      .getComputedStyle(tripode1)
      .getPropertyValue('left');

    if (
      parseInt(tripode1Left) < 70 &&
      parseInt(tripode1Left) > 30 &&
      parseInt(igorBottom) <= 46 // Ajusta según salto
    ) {
      this.stopGame();
    }
  }

  private keydownHandler = (event: KeyboardEvent) => {
    if (event.code === 'Space') {
      this.jump();
    }
  };

  jump() {
    const igor = this.igorRef.nativeElement;
    igor.classList.remove('jump');
    void igor.offsetWidth;
    igor.classList.add('jump');
    setTimeout(() => {
      igor.classList.remove('jump');
    }, 500);
  }
}
