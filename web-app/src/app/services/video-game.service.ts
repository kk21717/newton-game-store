import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VideoGame, CreateVideoGameRequest, UpdateVideoGameRequest } from '../models/video-game.model';

@Injectable({
  providedIn: 'root'
})
export class VideoGameService {
  private readonly apiUrl = 'http://localhost:5000/api/videogames';

  constructor(private http: HttpClient) {}

  getAll(): Observable<VideoGame[]> {
    return this.http.get<VideoGame[]>(this.apiUrl);
  }

  getById(id: number): Observable<VideoGame> {
    return this.http.get<VideoGame>(`${this.apiUrl}/${id}`);
  }

  search(term: string): Observable<VideoGame[]> {
    return this.http.get<VideoGame[]>(`${this.apiUrl}/search`, {
      params: { term }
    });
  }

  getByGenre(genre: string): Observable<VideoGame[]> {
    return this.http.get<VideoGame[]>(`${this.apiUrl}/genre/${encodeURIComponent(genre)}`);
  }

  getByPlatform(platform: string): Observable<VideoGame[]> {
    return this.http.get<VideoGame[]>(`${this.apiUrl}/platform/${encodeURIComponent(platform)}`);
  }

  create(request: CreateVideoGameRequest): Observable<VideoGame> {
    return this.http.post<VideoGame>(this.apiUrl, request);
  }

  update(id: number, request: UpdateVideoGameRequest): Observable<VideoGame> {
    return this.http.put<VideoGame>(`${this.apiUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
