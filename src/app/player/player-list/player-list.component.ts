import { Component, inject } from '@angular/core';
import { PlayerService } from '../player.service';
import { countryMap } from '../../countryCodes';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-player-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.css'
})
export class PlayerListComponent {
  private playerService = inject(PlayerService);
  players = this.playerService.getPlayers;
  ascending = false;
  selectedSort = 'name';

  constructor() {
    for (let player of this.players) {
      player.photo = player.photo != '' ? player.photo : `assets/${player.name}.jpg`;
    }
  }

  onView(playerId: string) {
    this.playerService.viewPlayer(playerId);
  }

  onAdd() {
    this.playerService.startAddPlayer();   
  }

  onDelete(playerId: string) {
    this.playerService.deletePlayer(playerId);
    this.players = this.playerService.getPlayers;
  }

  onSortPlayers(arg: string) {
    if(arg === 'name' || arg === 'country') {
      if(!this.ascending) {
        this.players = this.players.sort((a, b) => {
          if(a[arg] < b[arg]) { return -1; }
          else { return 1; }
        })
      }
      else {
        this.players = this.players.sort((a, b) => {
          if(a[arg] > b[arg]) { return -1; }
          else { return 1; }
        })
      }  
    }
    else if (arg === 'slams' || arg === 'age') {
      if(!this.ascending) {
        this.players = this.players.sort((a, b) => {
          if(+a[arg] < +b[arg]) { return -1; }
          else { return 1; }
        })
      }
      else {
        this.players = this.players.sort((a, b) => {
          if(+a[arg] > +b[arg]) { return -1; }
          else { return 1; }
        })
      }    
    }
  }

  changeSortDirection() {
    this.ascending = !this.ascending;
    this.onSortPlayers(this.selectedSort);
  }

  countryToFlag(country: string) {
    const countryCode = countryMap[country];
    if(countryCode) {
      return 'https://flagcdn.com/48x36/' + countryCode + '.png';
    }
    else {
      return 'assets/undefined_flag.webp';
    }
  }
}
