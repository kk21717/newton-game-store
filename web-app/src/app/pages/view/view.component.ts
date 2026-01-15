import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { VideoGame } from '../../models/video-game.model';
import { VideoGameService } from '../../services/video-game.service';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent implements OnInit {
  videoGame: VideoGame | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private videoGameService: VideoGameService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadVideoGame(+id);
    } else {
      this.error = 'No video game ID provided.';
      this.loading = false;
    }
  }

  loadVideoGame(id: number): void {
    this.loading = true;
    this.error = null;

    this.videoGameService.getById(id).subscribe({
      next: (game) => {
        this.videoGame = game;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading video game:', err);
        this.error = 'Failed to load video game details. The item may not exist.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
