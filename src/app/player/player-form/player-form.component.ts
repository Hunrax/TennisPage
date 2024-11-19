import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from '../player.service';
import { Player } from '../../player.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-player-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './player-form.component.html',
  styleUrl: './player-form.component.css'
})
export class PlayerFormComponent {
  private playerService = inject(PlayerService);
  private activatedRoute = inject(ActivatedRoute);
  player?: Player = this.playerService.getPlayer(this.activatedRoute.snapshot.paramMap.get('id')!);

  playerIdIfIsEdit: string | null = this.activatedRoute.snapshot.paramMap.get('id');

  newPlayer = new FormGroup({
    photo: new FormControl(this.player?.photo),
    name: new FormControl(this.player?.name, {
      validators: [Validators.required]
    }),
    country: new FormControl(this.player?.country, {
      validators: [Validators.required]
    }),
    age: new FormControl(this.player?.age, {
      validators: [Validators.required]
    }),  
    slams: new FormControl(this.player?.slams, {
      validators: [Validators.required]
    }),
    active: new FormControl<'Yes' | 'No'>('Yes', {
      validators: [Validators.required]
    }),
  })

  onCancel() {
    if(this.playerIdIfIsEdit) {
        this.playerService.backToPlayer(this.player!.id);
    }
    else {
      this.playerService.backToList();
    }
  }

  onSubmit() {
    if(this.playerIdIfIsEdit) {
      this.playerService.submitEditPlayer({
        name: this.newPlayer.value.name || 'undefined',
        country: this.newPlayer.value.country || 'undefined',
        age: this.newPlayer.value.age || 'undefined',
        slams: this.newPlayer.value.slams || '0',
        active: this.newPlayer.value.active || 'undefined',
      }, this.playerIdIfIsEdit)
    }
    else {
      this.playerService.submitAddPlayer({
        name: this.newPlayer.value.name || 'undefined',
        country: this.newPlayer.value.country || 'undefined',
        age: this.newPlayer.value.age || 'undefined',
        slams: this.newPlayer.value.slams || '0',
        active: this.newPlayer.value.active || 'undefined',
        photo: this.newPlayer.value.photo || 'assets/undefined.jpg',
      })
    }
  }
}
