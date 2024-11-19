import { Component, inject } from '@angular/core';
import { Player } from '../../player.model';
import { PlayerService } from '../player.service';
import { ActivatedRoute } from '@angular/router';
import { countryMap } from '../../countryCodes';

@Component({
  selector: 'app-player-info',
  standalone: true,
  imports: [],
  templateUrl: './player-info.component.html',
  styleUrl: './player-info.component.css'
})
export class PlayerInfoComponent {
  private playerService = inject(PlayerService);
  private activatedRoute = inject(ActivatedRoute);

  player?: Player = this.playerService.getPlayer(this.activatedRoute.snapshot.paramMap.get('id')!);
  
  constructor() {
    this.player!.photo = this.player!.photo != '' ? this.player!.photo : `assets/${this.player!.name}.jpg`;
  }

  onDelete() {
    this.playerService.deletePlayer(this.player!.id);
  }
  
  onBackToList() {
    this.playerService.backToList();
  }

  onEditInfo() {
    this.playerService.startEditPlayer(this.player!.id);
  }

  onEditPhoto() {
    this.playerService.startEditPhoto(this.player!.id);
  }

  countryToFlag() {
    const countryCode = countryMap[this.player?.country!];
    if(countryCode) {
      return 'https://flagcdn.com/48x36/' + countryCode + '.png';
    }
    else {
      return 'assets/undefined_flag.webp';
    }
  }
}