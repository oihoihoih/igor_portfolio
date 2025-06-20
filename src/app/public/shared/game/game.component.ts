import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Tripode } from '../../../models/tripode';

@Component({
  selector: 'app-game',
  standalone: false,

  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent implements OnInit {
  @ViewChild('igor', { static: true }) igorRef!: ElementRef;
  @ViewChild('suelo', { static: true }) sueloRef!: ElementRef;

  score: number = 0;
  tripodes: Tripode[] = [];
  private nextTripodeId: number = 0;
  private tripodeTimeout: any;
  private isAliveInterval: any;
  private scoreInterval: any;
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
    this.score = 0;
    this.gameStarting = false;
    this.gameOver = false;
    this.tripodes = [];
    this.nextTripodeId = 0;

    const igor = this.igorRef.nativeElement;
    const suelo = this.sueloRef.nativeElement;

    // Parar animaciones previas y limpiar clases
    suelo.classList.remove('pause', 'suelo-animation');
    igor.classList.remove('pause', 'ko');
    suelo.classList.add('suelo-animation');
    igor.classList.add('igor-running');

    this.isAliveInterval = setInterval(() => {
      this.updateTripodes();
      this.checkCollision();
    }, 10);

    document.addEventListener('keydown', this.keydownHandler);

    this.scoreInterval = setInterval(() => {
      this.score++;
    }, 1000);

    this.launchTripode();
  }

  stopGame() {
    this.gameOver = true;
    clearInterval(this.scoreInterval);
    clearInterval(this.isAliveInterval);
    clearTimeout(this.tripodeTimeout);
    document.removeEventListener('keydown', this.keydownHandler);

    this.igorRef.nativeElement.classList.add('pause', 'ko');
    this.sueloRef.nativeElement.classList.add('pause');
  }

  private launchTripode(): void {
    const id = this.nextTripodeId++;
    // El 100 representa el procentaje desde la izquierda (fuera de pantalla)
    this.tripodes.push({ id, left: 100, animating: true });

    // Programa el siguiente trípode con reatraso aleatorio
    const randomTime = 800 + Math.random() * 1200;
    this.tripodeTimeout = setTimeout(() => {
      if (!this.gameOver) {
        this.launchTripode();
      }
    }, randomTime);
  }

  private updateTripodes(): void {
    this.tripodes.forEach((tripode) => {
      tripode.left -= 0.5; // Ajusta la velocidad aquí
    });
    this.tripodes = this.tripodes.filter((tripode) => tripode.left > -10);
  }

  private checkCollision(): void {
    const igor = this.igorRef.nativeElement;
    const igorBottom = parseInt(
      window.getComputedStyle(igor).getPropertyValue('bottom')
    );

    this.tripodes.forEach((tripode) => {
      if (tripode.left < 5 && tripode.left > 4 && igorBottom <= 46) {
        this.stopGame();
      }
    });
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
