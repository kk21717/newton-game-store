import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VideoGame } from '../../models/video-game.model';
import { VideoGameService } from '../../services/video-game.service';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css'
})
export class BrowseComponent implements OnInit {
  videoGames: VideoGame[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private videoGameService: VideoGameService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadVideoGames();
  }

  loadVideoGames(): void {
    this.loading = true;
    this.error = null;

    this.videoGameService.getAll().subscribe({
      next: (games) => {
        this.videoGames = games;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading video games:', err);
        this.error = 'Failed to load video games. Please make sure the API server is running.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
