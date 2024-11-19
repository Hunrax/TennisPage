import { Component, inject } from '@angular/core';
import { PlayerService } from '../player/player.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
  private playerService = inject(PlayerService);

  onBackToList() {
    this.playerService.backToList();
  }
}
