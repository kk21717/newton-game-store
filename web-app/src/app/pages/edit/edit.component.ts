import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VideoGame, UpdateVideoGameRequest } from '../../models/video-game.model';
import { VideoGameService } from '../../services/video-game.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NgbModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  videoGames: VideoGame[] = [];
  selectedGame: VideoGame | null = null;
  loading = true;
  saving = false;
  error: string | null = null;

  constructor(
    private modalService: NgbModal,
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

  openEditModal(content: any, game: VideoGame): void {
    this.selectedGame = { ...game };
    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  saveChanges(modal: any): void {
    if (!this.selectedGame) return;

    this.saving = true;
    const updateRequest: UpdateVideoGameRequest = {
      title: this.selectedGame.title,
      genre: this.selectedGame.genre,
      platform: this.selectedGame.platform,
      releaseYear: this.selectedGame.releaseYear,
      price: this.selectedGame.price,
      description: this.selectedGame.description,
      imageUrl: this.selectedGame.imageUrl
    };

    this.videoGameService.update(this.selectedGame.id, updateRequest).subscribe({
      next: (updatedGame) => {
        const index = this.videoGames.findIndex(g => g.id === updatedGame.id);
        if (index !== -1) {
          this.videoGames[index] = updatedGame;
        }
        this.saving = false;
        modal.close();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error updating video game:', err);
        this.saving = false;
        this.cdr.detectChanges();
        alert('Failed to update video game. Please try again.');
      }
    });
  }

  deleteGame(id: number): void {
    if (!confirm('Are you sure you want to delete this video game?')) {
      return;
    }

    this.videoGameService.delete(id).subscribe({
      next: () => {
        this.videoGames = this.videoGames.filter(g => g.id !== id);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error deleting video game:', err);
        alert('Failed to delete video game. Please try again.');
      }
    });
  }
}
