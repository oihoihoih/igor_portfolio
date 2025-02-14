import {
  Component,
  Input,
  HostBinding,
  AfterViewInit,
  OnInit,
  Injector,
  Output,
  EventEmitter,
} from '@angular/core';
import { Project } from '../../../../model/project';
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

  constructor(private sanitizer: DomSanitizer, private inj: Injector) {}

  ngOnInit(): void {
    console.log(this.project.trailerUrl);

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
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  extractVideoId(url: string): string {
    const regex = /[?&]v=([^&#]*)/;
    const match = url.match(regex);
    return match ? match[1] : '';
  }

  close() {
    this.animationState = 'hidden';
    this.closeOverlay.emit();
  }

  public trailer = 'Trailer url';
}
