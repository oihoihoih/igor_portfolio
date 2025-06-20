import {
  Component,
  Input,
  HostBinding,
  AfterViewInit,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { Project } from '../../../../models/project';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-project-trailer',
  standalone: false,

  templateUrl: './project-trailer.component.html',
  styleUrl: './project-trailer.component.css',
  animations: [
    trigger('animation', [
      state('hidden', style({ opacity: 0, scale: 0.8 })),
      state('visible', style({ opacity: 1, scale: 1 })),
      transition('hidden <=> visible', animate('150ms ease-in-out')),
    ]),
  ],
})
export class ProjectTrailerComponent implements OnInit, AfterViewInit {
  @Input({ required: true }) project!: Project;
  @HostBinding('@animation') animationState = 'hidden';
  @Output() closeOverlay = new EventEmitter<void>();

  // Para incrustar el vídeo de youtube
  sanitizedVideoUrl!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if (this.project.trailerUrl) {
      this.sanitizedVideoUrl = this.sanitizeUrl(this.project.trailerUrl);
    }
  }

  ngAfterViewInit() {
    this.animationState = 'visible';
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    const videoId = this.extractVideoId(url);
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    console.log(embedUrl);
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  extractVideoId(url: string): string {
    console.log(url);
    const regex = /[?&]v=([^&#]*)/;
    const match = url.match(regex);
    console.log(match);
    return match ? match[1] : '';
  }

  close() {
    this.animationState = 'hidden';
    this.closeOverlay.emit();
  }

  public trailer = 'Trailer url';
}
